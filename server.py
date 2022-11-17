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
        print("COMMITTED!!")
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

    print("REQUEST.GET_JSON: ", request.get_json(), "TYPE: ", type(request.get_json()))
    # var_names = ['username', 'password']
    login_data = helpers.rename_dict_keys(request.get_json(), old_to_new_keys)
    username, password = list(login_data.values())
    # print("USERNAME: ", username, "PASSWORD: ", password)

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

    # # if password does NOT match
    # if user.password != password:
    #     result["message"] = 'Username or password is incorrect'
    #     return jsonify(result)

    # if password does match
    session["current_user_id"] = user.id
    result["user"] = {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name,
    }
    result["success"] = True
    print("LOGIN RESULT: ", result)

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
    print("LOGOUT RESULT: ", result)
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
    print("PROFILE_DATA: ", profile_data)

    user = crud.get_user_by_id(id)
    
    if user: 
        updated_user = crud.update_user(user, profile_data)
        # TODO: got user.verified from flask-sqlalchemy docs; am I using it correctly?
        user.verified = True
        db.session.commit()
        result["success"] = True
        result["message"] = "Account updated!"
        print("RESULT: ", result)
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
    print("BUS WITH FDBKS[0]: ", businesses_with_feedbacks[0])

    return jsonify(businesses_with_feedbacks)


# TODO: keep only this one or the original above
# @app.route('/users/<id>/feedbacks_new')
# def getUserFeedbacks(id):
#     """Get user's feedbacks.

#     Args: 
#         id: a user's id

#     Return a list of businesses with feedback given by a specific user.
#     """

#     # businesses_with_feedbacks = crud.get_feedbacks_by_user(id)
#     # print("BUS WITH FDBKS[0]: ", businesses_with_feedbacks[0])

#     # return jsonify(businesses_with_feedbacks)

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
    # print("SEARCH_RESULTS: ", search_results)
    print("# RESULTS FROM YELP: ", len(search_results["businesses"]))

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
        # searched_yelp_ids.append(business['yelp_id'])    # added to solve the problem of dtbs zip code search
        # searched_zip_codes.append(business['location']['zip_code'])    # added to solve the problem of dtbs zip code search

    # searched_yelp_ids = []    # added to solve the problem of dtbs zip code search
    
    # ********************************************************************
    # get a list of unique zip codes represented in the Yelp search
    # ********************************************************************
    # TODO: refactor to use a list / set of unique yelp_ids to get businesses from dtbs

    #searched_zip_codes = set()    # added to solve the problem of dtbs zip code search
    searched_zip_codes = { business['location']['zip_code'] for business in searched_businesses }
    # for business in search_results['businesses']:
    # for business in searched_businesses:
        # new_business = helpers.rename_dict_keys(business, old_to_new_keys)
        # searched_businesses.append(new_business)
        # searched_yelp_ids.append(business['yelp_id'])    # added to solve the problem of dtbs zip code search
        # searched_zip_codes.add(business['location']['zip_code'])    # added to solve the problem of dtbs zip code search

    # ********************************************************************
    # get a list of businesses in the selected zip codes with feedback objects attached
    # ********************************************************************
    businesses_with_feedbacks = crud.get_businesses_with_feedbacks(searched_zip_codes)
    # print("BUS_W_FDBKS[0]: ", businesses_with_feedbacks[0])
    # print("BUS_W_FDBKS[0].feedbacks: ", businesses_with_feedbacks[0].feedbacks)
    # print("BUS_W_FDBKS[0].feedbacks[0]: ", businesses_with_feedbacks[0].feedbacks[0])
    # print("BUS_W_FDBKS[0].feedbacks[0].ramp: ", businesses_with_feedbacks[0].feedbacks[0].ramp)

    # Remember that the zip code search in the database may return more 
        # results than Yelp did bc of the Yelp limit parameter which I'm 
        # setting to 5 (in dev) or 25 (in prod)
    print("# YELP SEARCH RESULTS, # FROM DTBS: ", len(searched_businesses), len(businesses_with_feedbacks))

    # TODO: see Jared's comment in helpers.py @line 92
    # @@@@@ See helpers.py @line 92 for proposed refactoring of this method
    new_searched_businesses = helpers.match_feedbacks_with_businesses(searched_businesses, 
                                            businesses_with_feedbacks)

    # ********************************************************************
    # create a dict for each feedback for each business returned from Yelp
    # ********************************************************************
    newest_searched_businesses = []
    # keys = ['id', 'user_id', 'business_id', 'chair_parking', 'ramp', 'auto_door', 'comment']
    for business in new_searched_businesses:
        feedbacks = []
        for feedback_obj in business['feedback_objs']:
            # print("TYPE: ", type(feedback_obj))
            # print("OBJ.id: ", feedback_obj.getattr(id))
            
            # feedback = {}
            feedback = feedback_obj.as_dict()
            # for key in keys:
            #     feedback[key] = feedback_obj.getattr(key)
            feedbacks.append(feedback)
        business['feedbacks'] = feedbacks
        # might be a good idea to delete business['feedback_objs']
        newest_searched_businesses.append(business)

    # TODO: Jared's note is below:
    # at this point, new_searched_businesses also reflects the changes you've made!

    # print("NEW SEARCHED BUSINESSES2: ", new_searched_businesses)
    # print("NEWEST SEARCHED BUSINESSES2: ", newest_searched_businesses)

    # ********************************************************************
    # Aggregate the feedback for each business returned from Yelp.
    # ********************************************************************

    final_searched_businesses = []
    for business in newest_searched_businesses:
        sum_chair_parking = 0
        sum_ramp = 0
        sum_auto_door = 0
        count_feedbacks = len(business['feedbacks'])
        comments = []
        for feedback in business['feedbacks']:
            sum_chair_parking += feedback['chair_parking']
            sum_ramp += feedback['ramp']
            sum_auto_door += feedback['auto_door']
            comments.append(feedback['comment'])
        # avoid a ZeroDivision error
        if count_feedbacks:
            business['feedback_aggregated'] = {
                'pct_chair_parking': round((sum_chair_parking / count_feedbacks) * 100),
                'pct_ramp': round((sum_ramp / count_feedbacks) * 100),
                'pct_auto_door': round((sum_auto_door / count_feedbacks) * 100),
            }
        else:
            business['feedback_aggregated'] = {
                'pct_chair_parking': 'No feedback given',
                'pct_ramp': 'No feedback given',
                'pct_auto_door': 'No feedback given',
            }

        business['feedback_aggregated']['comments'] = comments
        # delete database objs, bc they are not JSON serializable
        if business.get('feedback_objs'):
            del business['feedback_objs']

        final_searched_businesses.append(business)

    # print("BUSINESS[0]: ", final_searched_businesses[0])

    return jsonify(final_searched_businesses)


# @app.route('/businesses/<id>/feedbacks')
# def getBusinessFeedbacks(id):
#     """Get aggregated feedback data for a business.
    
#     Return a list of businesses with aggregated feedback.
#     """


# get business details from database
# TODO: add .json to the route? other?
# TODO: remove route if not being used
# @app.route('/info/<yelp_id>')
# def get_business_from_database(yelp_id):
#     """Get details about a business."""
#     # print("REACHED THE ROUTE!")
#     payload = {"locale": "en_US" }
#     headers = {"Authorization": f"Bearer {YELP_FUSION_API_KEY}"}

#     # TODO: remove comment
#     # sample business id "-JxgWP3A3n8cIfDpwZQ90w"
#     url = f"{BASE_URL}/{yelp_id}"

#     res = requests.get(url, params=payload, headers=headers)
#     data = res.json()
#     print(data)

#     business_details = {
#         "place_name": data.get('name', None),
#         "coordinates": data.get('coordinates', None),
#         "display_phone": data.get('display_phone', None),
#         "display_address": data.get('display_address', None),
#     }
#     if data.get('photos'):
#         business_details["photo"] = data["photos"][0]

#     # for key in business_details:

#     #     if not data.get(key):
#     #         business_details[key] = "Unknown"

#     if not data.get('display_address'):
#         business_details["display_address"] = "Unknown"
    
    
#     return jsonify(business_details)


# get business details from Yelp
# TODO: remove route if not being used
@app.route('/businesses/<yelp_id>')
def get_business_from_yelp(yelp_id):
    """Get details about a business."""

    # ********************************************************************
    # set parameters for Yelp business search and execute search
    # ********************************************************************
    # print("REACHED THE ROUTE!")
    id = request.args.get('id', '')

    print("ID: ", id)

    payload = {"locale": "en_US" }
    headers = {"Authorization": f"Bearer {YELP_FUSION_API_KEY}"}
    # TODO: remove comment
    # sample business id "-JxgWP3A3n8cIfDpwZQ90w"
    url = f"{BASE_URL}/{yelp_id}"

    res = requests.get(url, params=payload, headers=headers)
    business = res.json()
    print("BUSINESS FROM GET BUS DETAILS: ", business)

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

    print("BUSINESS WITH FEEDBACKS: ", business_with_feedbacks)
    print("FEEDBACKS: ", business_with_feedbacks.feedbacks)
    print("NEW BUSINESS: ", new_business)


    # ********************************************************************
    # create a dict for each feedback for the business returned from Yelp
    # ********************************************************************

    feedbacks = []
    for feedback_obj in business_with_feedbacks.feedbacks:
        feedback = feedback_obj.as_dict()
        feedbacks.append(feedback)
    new_business['feedbacks'] = feedbacks
    
    print("NEW BUSINESS WITH FEEDBACKS: ", new_business)

    # ********************************************************************
    # Aggregate the feedback for each business returned from Yelp.
    # ********************************************************************

    sum_chair_parking = 0
    sum_ramp = 0
    sum_auto_door = 0
    count_feedbacks = len(new_business['feedbacks'])
    comments = []
    for feedback in new_business['feedbacks']:
        sum_chair_parking += feedback['chair_parking']
        sum_ramp += feedback['ramp']
        sum_auto_door += feedback['auto_door']
        comments.append(feedback['comment'])
    # avoid a ZeroDivision error
    if count_feedbacks:
        new_business['feedback_aggregated'] = {
            'pct_chair_parking': round((sum_chair_parking / count_feedbacks) * 100),
            'pct_ramp': round((sum_ramp / count_feedbacks) * 100),
            'pct_auto_door': round((sum_auto_door / count_feedbacks) * 100),
        }
    else:
        new_business['feedback_aggregated'] = {
            'pct_chair_parking': 'No feedback given',
            'pct_ramp': 'No feedback given',
            'pct_auto_door': 'No feedback given',
        }

    new_business['feedback_aggregated']['comments'] = comments
    # # delete database objs, bc they are not JSON serializable
    # if new_business.get('feedback_objs'):
    #     del new_business['feedback_objs']

    print("NEW BUSINESS WITH AGGREGATED FEEDBACKS: ", new_business)

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
    print("FEEDBACK DATA: ", feedback_data)
    user_id = feedback_data.get('user_id')
    business_id = feedback_data.get('business_id')
    chair_parking = feedback_data.get('feedbackChairParkingChecked')
    ramp = feedback_data.get('feedbackRampChecked')
    auto_door = feedback_data.get('feedbackAutoDoorChecked')
    comment = feedback_data.get('feedbackComment')
    feedback = crud.create_feedback(user_id, business_id, chair_parking,
        ramp, auto_door, comment)

    print("FEEDBACK OBJ: ", feedback)

    db.session.add(feedback)
    db.session.commit()
    result["success"] = True
    result["message"] = "Feedback added"
    # if feedback:
    #     db.session.add(feedback)
    #     db.session.commit()
    #     result["success"] = True
    #     result["message"] = "Feedback added"

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
        print("RESULTS: ", search_results)

    return jsonify(businesses)


if __name__ == "__main__":
    # connect to the database before app.run gets called
    # if you don't do this, Flask won't be able to access your database
    connect_to_db(app)
    app.debug = True
    app.run(host="0.0.0.0", debug=True)