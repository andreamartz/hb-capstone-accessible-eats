"""Create server with routes to handle requests."""

from flask import (Flask, jsonify, render_template, request, flash, session)
from flask_login import login_user, logout_user, login_required, current_user
from model import connect_to_db, db
from jinja2 import StrictUndefined
import os
import requests
import json
import werkzeug.security
import copy
import crud
import helpers


app = Flask(__name__)
# the secret key is needed for flash and session to work
app.secret_key = "dev"

# This configuration option makes the Flask interactive debugger
# more useful (you should remove this line in production though)
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True

# configure a Jinja2 setting to make it throw errors for undefined variables
# by default it fails silently
app.jinja_env.undefined = StrictUndefined

YELP_FUSION_API_KEY = os.environ['YELP_FUSION_API_KEY']
MAPS_JS_API_KEY = os.environ['MAPS_JS_API_KEY']
BASE_URL = 'https://api.yelp.com/v3/businesses'


@app.route('/')
def index():
    """Display homepage."""
    
    url=f'https://maps.googleapis.com/maps/api/js?key={MAPS_JS_API_KEY}&v=weekly'

    return render_template('index.html', url=url)


# ********************************
# User Routes
# ********************************

# register a user route
@app.route('/signup', methods=['POST'])
def signup():
    """Create an account for a new user."""

    result = {
        "success": False,
        "message": "",
    }

    old_to_new_keys = {
        'signupFirstName': 'first_name',
        'signupLastName': 'last_name',
        'signupUsername': 'username',
        'signupPassword': 'password'
    }
    signup_data = helpers.rename_dict_keys(request.get_json(), old_to_new_keys)

    first_name, last_name, username, password = list(signup_data.values())
    hashed_password = werkzeug.security.generate_password_hash(password)

    user = crud.get_user_by_username(username)

    # if username taken
    if user:
        result["message"] = "That username is taken. Please try again."
        return jsonify(result)

    # username is unique
    new_user = crud.create_user(first_name,
                                last_name,
                                username,
                                hashed_password,)

    if new_user:
        db.session.add(new_user)
        db.session.commit()
        result["success"] = True
        result["message"] = "Account created! Please log in."

    return jsonify(result)


@app.route('/login', methods=['POST'])
def login():
    """Login a user.
    
    Responds to frontend login form submission.
    Checks for a user with the submitted username.
        - if none is found, returns jsonified dictionary:
            {
                "user": None,
                "success": False,
                "message": "No user exists with that username.",
            }
        - if one is found, the submitted password is checked against the 
            database
            - if the password is correct, returns the jsonified user:
                {
                    "user": <the user object>,
                    "success": True,
                    "message": "",
                }
            - if password is incorrect, 
        - multiple users should not be found, because this is prevented at 
            user sign up

    Args: none

    Data payload should be a dictionary with username and password keys.

    """

    result = {
        "user": None,
        "success": False,
        "message": "",
    }

    old_to_new_keys = {
        'loginUsername': 'username',
        'loginPassword': 'password',
    }

    # var_names = ['username', 'password']
    login_data = helpers.rename_dict_keys(request.get_json(), old_to_new_keys)
    username, password = list(login_data.values())

    count = crud.count_users_by_username(username)

    # if no users found
    if count == 0:
        result["message"] = "No user exists with that username."
        return jsonify(result)

    # if one user found
    user = crud.get_user_by_username(username)


    # if password does NOT match
    if werkzeug.security.check_password_hash(user.password, password) == False:
        result["message"] = 'Username or password is incorrect'
        return jsonify(result)

    # if password does match
    session["current_user_id"] = user.id
    result["user"] = {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
    }
    result["success"] = True

    return jsonify(result)


@app.route('/logout')
# @login_required     #Flask-Login
def logout():
    """Logout a user."""
    
    # TODO: implement Flask-Login
    # logout_user()

    if "current_user_id" in session:
        del session["current_user_id"]
    
    result = {
        "user": None,
        "success": True,
        "message": "User has been logged out"
    }
    return jsonify(result)


# TODO: verify that this 2.0 feature works
@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    result = {
        "user": None,
        "success": False,
        "message": "",
    }

    profile_data = request.get_json()

    user = crud.get_user_by_id(id)
    
    if user: 
        updated_user = crud.update_user(user, profile_data)
        # TODO: got user.verified from flask-sqlalchemy docs; am I using it correctly?
        user.verified = True
        db.session.commit()
        result["success"] = True
        result["message"] = "Account updated!"
        return jsonify(result)
    else:
        result["message"] = "No user exists with that id."

    return jsonify(result)


# TODO: KEEP?? - see alternate below
# TODO: NOTE that Drue approved of how I wrote the logic for this route
# (across all files, including crud.py and helpers.py)
@app.route('/users/<id>/feedbacks')
def getUserFeedbacks(id):
    """Get user's feedbacks.
    
    Return a list of businesses with feedback given by a specific user.
    """

    businesses_with_feedbacks = crud.get_feedbacks_by_user(id)

    return jsonify(businesses_with_feedbacks)


# ********************************
# Business routes
# ********************************

# search for businesses
# TODO: add .json to the route? other?
@app.route('/businesses/search', methods=['GET'])
# @login_required           #Flask-Login
def find_businesses():
    """Return from Yelp businesses in a user-provided zip code.
    
    Gets the zip code from the query string and makes a request to Yelp for 
    restaurants in that area.

    Returns a jsonified list of business dictionaries.
    """

    # TODO: pull some logic out of this route into separate methods here
    # in server.py or in helpers.py
    # ********************************************************************
    # set parameters for Yelp business search and execute search
    # ********************************************************************
    term = 'restaurants'
    location = request.args.get('zipCode', '')
    radius = 24000    # in meters; this is about 15 miles
    # TODO: change the number of results to 25
    limit = 5        # limit the number of results to return
    # TODO: handle the situation where no zipCode is passed in 
    # TODO: handle the situation where invalid zipCode is passed in (use regex?)
    payload = {"term": term, "location": location, "radius": radius, "limit": limit, }
    headers = {"Authorization": f"Bearer {YELP_FUSION_API_KEY}"}
    url = f"{BASE_URL}/search"

    res = requests.get(url, params=payload, headers=headers)
    search_results = res.json()

    # ********************************************************************
    # rename keys in dicts from Yelp search
    # ********************************************************************
    searched_businesses = [] # a list
    old_to_new_keys = {
        'id': 'yelp_id',
        'name': 'place_name',
        'coordinates': 'coordinates',
        'display_phone': 'display_phone',
        'location': 'location',
        'image_url': 'photo',
    }
    for business in search_results['businesses']:
        new_business = helpers.rename_dict_keys(business, old_to_new_keys)
        searched_businesses.append(new_business)

    # ********************************************************************
    # get a list of unique yelp_ids represented in the Yelp search
    # ********************************************************************
    # set of unique yelp_ids
    searched_yelp_ids = { business['yelp_id'] for business in searched_businesses }

    # ********************************************************************
    # attach list of feedback objects to list of searched businesses
    # ********************************************************************
    businesses_with_feedbacks = crud.get_businesses_with_feedbacks(searched_yelp_ids)

    searched_businesses = helpers.match_feedbacks_with_businesses(
                                            searched_businesses, 
                                            businesses_with_feedbacks)

    # ********************************************************************
    # create a dict for each feedback for each business returned from Yelp
    # ********************************************************************
    for business in searched_businesses:
        feedbacks = []
        for feedback_obj in business['feedback_objs']:
            feedback = feedback_obj.as_dict()
            feedbacks.append(feedback)
        business['feedbacks'] = feedbacks
        # delete database objs, bc they are not JSON serializable
        if business.get('feedback_objs'):
            del business['feedback_objs']

    # ********************************************************************
    # Aggregate the feedback for each business returned from Yelp.
    # ********************************************************************
    for business in searched_businesses:
        business = helpers.aggregate_feedback(business)

    return jsonify(searched_businesses)


# get business details from Yelp
# TODO: remove route if not being used
@app.route('/businesses/<yelp_id>')
def get_business_from_yelp(yelp_id):
    """Get details about a business."""

    # ********************************************************************
    # set parameters for Yelp business search and execute search
    # ********************************************************************
    id = request.args.get('id', '')

    payload = {"locale": "en_US" }
    headers = {"Authorization": f"Bearer {YELP_FUSION_API_KEY}"}
    url = f"{BASE_URL}/{yelp_id}"

    res = requests.get(url, params=payload, headers=headers)
    business = res.json()

    # ********************************************************************
    # rename keys in dicts from Yelp search
    # ********************************************************************
    old_to_new_keys = {
        'id': 'yelp_id',
        'name': 'place_name',
        'coordinates': 'coordinates',
        'display_phone': 'display_phone',
        'location': 'location',
        'image_url': 'photo',
    }

    new_business = helpers.rename_dict_keys(business, old_to_new_keys)

    # ********************************************************************
    # get business from yelp by yelp id - result has feedback attached
    # ********************************************************************
    business_with_feedbacks = crud.get_business_by_yelp_id(yelp_id)
    # attach id to new_business
    new_business["id"] = business_with_feedbacks.id

    # ********************************************************************
    # create a dict for each feedback for the business returned from Yelp
    # ********************************************************************

    feedbacks = []
    for feedback_obj in business_with_feedbacks.feedbacks:
        feedback = feedback_obj.as_dict()
        feedbacks.append(feedback)
    new_business['feedbacks'] = feedbacks
    # delete database objs, bc they are not JSON serializable
    if new_business.get('feedback_objs'):
        del business['feedback_objs']
    
    # ********************************************************************
    # Aggregate the feedback for each business returned from Yelp.
    # ********************************************************************

    new_business = helpers.aggregate_feedback(new_business)

    return jsonify(new_business)


# ********************************
# Feedback routes
# ********************************

@app.route('/feedbacks', methods=['POST'])
def create_feedback():
    """Add user feedback for a restaurant to the database."""

    result = {
        "success": False,
        "message": "",
    }

    feedback_data = request.get_json()

    old_to_new_keys = {
        'user_id': 'user_id',
        'business_id': 'business_id',
        'feedbackChairParkingChecked': 'chair_parking',
        'feedbackRampChecked': 'ramp',
        'feedbackAutoDoorChecked': 'auto_door',
        'feedbackComment': 'comment',
    }

    feedback = helpers.rename_dict_keys(feedback_data, old_to_new_keys)

    feedback = crud.create_feedback(feedback['user_id'], feedback['business_id'],
        feedback['chair_parking'], feedback['ramp'], feedback['auto_door'], 
        feedback['comment'])

    db.session.add(feedback)
    db.session.commit()
    result["success"] = True
    result["message"] = "Feedback added"

    return jsonify(result)


# ********************************************
# GENERATE BUSINESSES FOR DATABASE SEEDING
# ********************************************

# return a list of business dictionaries for the purpose of generating seed data
# TODO: add .json to the route? other?
@app.route('/businesses/generate')
def get_businesses_for_zip_code():
    """Return from Yelp businesses in a user-provided zip code.
    
    Gets the zip code from the query string and makes a request to Yelp for 
    restaurants in that area.

    Returns a jsonified list of business dictionaries.
    """

    term = 'restaurants'
    location = request.args.get('zipCode', '')
    radius = 24000    # in meters; this is about 15 miles
    # TODO: change the number of results to 25
    limit = 50        # limit the number of results to return

    # TODO: handle the situation where no zipCode is passed in 
    # TODO: handle the situation where invalid zipCode is passed in (use regex?)

    payload = {"term": term, "location": location, "radius": radius, "limit": limit,}
    headers = {"Authorization": f"Bearer {YELP_FUSION_API_KEY}"}

    url = f"{BASE_URL}/search"

    res = requests.get(url, params=payload, headers=headers)
    search_results = res.json()

    businesses = [] # a list

    for business in search_results['businesses']:
        new_business = {}
        new_business['business_name'] = business.get('name', 'Unknown business name')
        new_business['display_phone'] = business.get('display_phone', 'Unknown phone number')
        yelp_id = business.get('id', None)
        if yelp_id:
            new_business['yelp_id'] = yelp_id

        if business.get('location'):
            bus_location = {"address1": business['location'].get('address1', 'Unknown address'),
                "city": business['location'].get('city', 'Unknown city'),
                "state": business['location'].get('state', 'Unknown state'),
                "zip_code": business['location'].get('zip_code', 'Unknown zip code'),}

        new_business['location'] = bus_location

        if business.get('image_url'):
            new_business['photo'] = business['image_url']

        businesses.append(new_business)

    return jsonify(businesses)


if __name__ == "__main__":
    # connect to the database before app.run gets called
    # if you don't do this, Flask won't be able to access your database
    connect_to_db(app)
    app.debug = True
    app.run(host="0.0.0.0", debug=True)