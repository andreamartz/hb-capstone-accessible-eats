"""Create server with routes to handle requests."""

from flask import (Flask, jsonify, render_template, request, flash, session)
from flask_login import login_user, logout_user, login_required, current_user
from model import connect_to_db, db
from jinja2 import StrictUndefined
import os
import requests
import json
import werkzeug.security
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
# Users
# ********************************

# register a user route
@app.route('/signup', methods=['POST'])
def signup():
    """Create an account for a new user."""

    result = {
        "success": False,
        "message": "",
    }

    signup_data = request.get_json()
    first_name = signup_data.get('signupFirstName')
    last_name = signup_data.get('signupLastName')
    username = signup_data.get('signupUsername')
    password = signup_data.get('signupPassword')

    print("SIGNUP_DATA: ", signup_data)

    user = crud.get_user_by_username(username)
    
    if user:
        result["message"] = "That username is taken. Please try again."
        return jsonify(result)

    new_user = crud.create_user(first_name,
                            last_name,
                            username,
                            password)

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

    """

    result = {
        "user": None,
        "success": False,
        "message": "",
    }

    login_data = request.get_json()
    username = login_data.get('loginUsername')
    password = login_data.get('loginPassword')

    print("LOGIN_DATA: ", login_data)

    count = crud.count_users_by_username(username)

    print("COUNT: ", count)

    # if no users found
    if count == 0:
        result["message"] = "No user exists with that username."
        return jsonify(result)

    # if one user found
    user = crud.get_user_by_username(username)

    # if password does not match
    if user.password != password:
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


@app.route('/users/<id>/feedbacks')
def getUserFeedbacks(id):
    """Get user's feedbacks.
    
    Return a list of businesses with feedback given by a specific user.
    """

    businesses_with_feedbacks = crud.get_feedbacks_by_user(id)
    print("BUS WITH FDBKS[0]: ", businesses_with_feedbacks[0])

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

    searched_businesses = [] # a list

    old_to_new_keys = {
        'id': 'yelp_id',
        'name': 'place_name',
        'coordinates': 'coordinates',
        'display_phone': 'display_phone',
        'location': 'location',
        'image_url': 'photo',
    }

# *******************************************
# CHALLENGE documentation
    # PROBLEM 1: businesses query below is returning just one business
    # REASON: I'm searching by zip code ONLY, so it's not grabbing nearby 
        # restaurants in other zip codes like the yelp search is doing
    # businesses_with_feedbacks = crud.get_businesses_with_feedbacks(location)
        # print("BUS_W_FDBKS[0]: ", businesses_with_feedbacks[0])
    # print("BUS_W_FDBKS[0].feedbacks: ", businesses_with_feedbacks[0].feedbacks)
    # print("BUS_W_FDBKS[0].feedbacks[0]: ", businesses_with_feedbacks[0].feedbacks[0])
    # print("BUS_W_FDBKS[0].feedbacks[0].ramp: ", businesses_with_feedbacks[0].feedbacks[0].ramp)
# *******************************************
    
    
     # searched_yelp_ids = []    # added to solve the problem of dtbs zip code search
    searched_zip_codes = []    # added to solve the problem of dtbs zip code search

    for business in search_results['businesses']:
        new_business = helpers.rename_dict_keys(business, old_to_new_keys)
        searched_businesses.append(new_business)
        # searched_yelp_ids.append(business['yelp_id'])    # added to solve the problem of dtbs zip code search
        searched_zip_codes.append(business['location']['zip_code'])    # added to solve the problem of dtbs zip code search

    # eliminate duplicate zip_codes
    searched_zip_codes = list(set(searched_zip_codes))

    # eliminate duplicate zip_codes
    print("ZIP CODES: ", searched_zip_codes)


    businesses_with_feedbacks = crud.get_businesses_with_feedbacks(searched_zip_codes)
    # print("BUS_W_FDBKS[0]: ", businesses_with_feedbacks[0])
    # print("BUS_W_FDBKS[0].feedbacks: ", businesses_with_feedbacks[0].feedbacks)
    print("BUS_W_FDBKS[0].feedbacks[0]: ", businesses_with_feedbacks[0].feedbacks[0])
    print("BUS_W_FDBKS[0].feedbacks[0].ramp: ", businesses_with_feedbacks[0].feedbacks[0].ramp)

    # Remember that the zip code search in the database may return more 
        # results than Yelp did bc of the Yelp limit parameter which I'm 
        # setting to 5 (in dev) or 25 (in prod)
    print("# YELP SEARCH RESULTS, # FROM DTBS: ", len(searched_businesses), len(businesses_with_feedbacks))

    new_searched_businesses = []
    for business in searched_businesses:
        # business['feedback_objs'] = []
        print("BUSINESS KEYS: ", business.keys())


        # feedback_lists = []
        for bf in businesses_with_feedbacks:
            if business['yelp_id'] == bf.yelp_id:
                print("YELP IDS MATCH")
                business['id'] = bf.id
                business['feedback_objs'] = bf.feedbacks
                print("THE BUSINESS: ", business)
                new_searched_businesses.append(business)
                print("NEW SEARCHED BUSINESSES: ", new_searched_businesses)
                # print("BF_FEEDBACKS: ", bf.feedbacks)    # a list of feedback objs from dtbs

                # *****************************************
                # not throwing error, but also not changing business['feedback_objs']; it's like this is being ignored
                # business['feedback_objs'] = bf.feedbacks # a list of feedback objs from dtbs
                # REASON: the updated business info was not being saved to the business dict in searched_businesses
                # SOLUTION: create a new_searched_businesses list and append the updated business to it;
                #   the new_searched_businesses list should then be used to replace the old searched_businesses_list
                # *****************************************
            # new_feedbacks = list(bf.feedbacks)
            # print("NEW_FEEDBACKS: ", new_feedbacks)
                # feedback_lists.append(bf.feedbacks)
                # print("LIST OF BF FEEDBACK LISTS: ", feedback_lists)
                # business['feedback_lists'] = feedback_lists    # list of lists

    newest_searched_businesses = []
    for business in new_searched_businesses:
        feedbacks = []
        for feedback_obj in business['feedback_objs']:
            feedback = {}
            feedback['id'] = feedback_obj.id
            feedback['user_id'] = feedback_obj.user_id
            feedback['business_id'] = feedback_obj.business_id
            feedback['chair_parking'] = feedback_obj.chair_parking
            feedback['ramp'] = feedback_obj.ramp
            feedback['auto_door'] = feedback_obj.auto_door
            feedback['comment'] = feedback_obj.comment
            feedbacks.append(feedback)
            # ERROR HERE:
            # new_searched_businesses['business']['feedbacks'] = feedbacks
        business['feedbacks'] = feedbacks
        newest_searched_businesses.append(business)

            print("NEW SEARCHED BUSINESSES2: ", new_searched_businesses)

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
        print("KEYS:", business.keys())
        if business.get('feedback_objs'):
            del business['feedback_objs']
        final_searched_businesses.append(business)

    print("BUSINESS[0]: ", final_searched_businesses[0])

    

    return jsonify(final_searched_businesses)


        businesses.append(new_business)
        print("RESULTS: ", search_results)

    return jsonify(businesses)


# get business detals from database
# TODO: add .json to the route? other?
@app.route('/info/<yelp_id>')
def get_business_from_database(yelp_id):
    """Get details about a business."""
    # print("REACHED THE ROUTE!")
    payload = {"locale": "en_US" }
    headers = {"Authorization": f"Bearer {YELP_FUSION_API_KEY}"}

    # TODO: remove comment
    # sample business id "-JxgWP3A3n8cIfDpwZQ90w"
    url = f"{BASE_URL}/{yelp_id}"

    res = requests.get(url, params=payload, headers=headers)
    data = res.json()
    print(data)

    business_details = {
        "place_name": data.get('name', None),
        "coordinates": data.get('coordinates', None),
        "display_phone": data.get('display_phone', None),
        "display_address": data.get('display_address', None),
    }
    if data.get('photos'):
        business_details["photo"] = data["photos"][0]

    # for key in business_details:

    #     if not data.get(key):
    #         business_details[key] = "Unknown"

    if not data.get('display_address'):
        business_details["display_address"] = "Unknown"
    
    
    return jsonify(business_details)



# get business details from Yelp
# TODO: remove route if not being used
# @app.route('/businesses/<yelp_id>')
# def get_business_from_yelp(yelp_id):
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


@app.route('/feedbacks', methods=['POST'])
def create_feedback():
    """Add user feedback for a restaurant to the database."""

    result = {
        "success": False,
        "message": "",
    }

    feedback_data = request.get_json()
    chair_parking = feedback_data.get('feedbackChairParking')
    ramp = feedback_data.get('feedbackRamp')
    auto_door = feedback_data.get('feedbackAutoDoor')
    comment = feedback_data.get('feedbackComment')
    feedback = crud.create_feedback(user_id, business_id, chair_parking,
        ramp, auto_door, comment)

    if feedback:
        db.session.add(feedback)
        db.session.commit()
        result["success"] = True
        result["message"] = "Feedback added"

    return jsonify(result)


if __name__ == "__main__":
    # connect to the database before app.run gets called
    # if you don't do this, Flask won't be able to access your database
    connect_to_db(app)
    app.debug = True
    app.run(host="0.0.0.0", debug=True)