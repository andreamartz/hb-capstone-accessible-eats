"""Create server with routes to handle requests."""

from flask import (Flask, jsonify, render_template, request, flash, session)
from model import connect_to_db, db
# from jinja2 import StrictUndefined
import os
import requests
import json
import crud


app = Flask(__name__)
# the secret key is needed for flash and session to work
app.secret_key = "dev"

# This configuration option makes the Flask interactive debugger
# more useful (you should remove this line in production though)
app.config['PRESERVE_CONTEXT_ON_EXCEPTION'] = True

# configure a Jinja2 setting to make it throw errors for undefined variables
# by default it fails silently
# app.jinja_env.undefined = StrictUndefined

YELP_FUSION_API_KEY = os.environ['YELP_FUSION_API_KEY']
BASE_URL = 'https://api.yelp.com/v3/businesses'


@app.route('/')
def index():
    """Display homepage."""

    return render_template('index.html')


# register


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
        "message": ""
    }

    login_data = request.get_json()
    username = login_data.get('username')
    password = login_data.get('password')

    print("LOGIN_DATA: ", login_data)
    # print("USER & PW: ", login_data.username, login_data.password)

    count = crud.count_users_by_username(login_data.get('username'))
    print("COUNT: ", count)

    # if no users found
    if count == 0:
        result["message"] = "No user exists with that username."
        return jsonify(result)

    # if one user found
    user = crud.get_user_by_username(username)
    print("USER: ", user)

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

    return jsonify(businesses_with_feedbacks)


# search for businesses
@app.route('/businesses/search')
def find_businesses():
    """Search for businesses on Yelp.
    
    Gets the zip code from the query string and makes a request to Yelp for 
    restaurants in that area.

    Returns a jsonified list of business dictionaries.
    """

    term = 'restaurants'
    location = request.args.get('zipCode', '')

    # TODO: handle the situation where no zipCode is passed in 
    # TODO: handle the situation where invalid zipCode is passed in (use regex?)

    radius = 24000    # in meters; this is about 15 miles
    # TODO: change the number of results to 25
    limit = 5        # limit the number of results to return

    payload = {"term": term, "location": location, "radius": radius, "limit": limit, }
    headers = {"Authorization": f"Bearer {YELP_FUSION_API_KEY}"}

    url = f"{BASE_URL}/search"

    res = requests.get(url, params=payload, headers=headers)
    search_results = res.json()

    businesses = [] # a list
    for business in search_results['businesses']:
        new_business = {}
        new_business["yelpId"] = business.get('id')
        new_business['place_name'] = business.get('name', 'Unknown business name')
        new_business['coordinates'] = business.get('coordinates')
        new_business['display_phone'] = business.get('display_phone', 'Unknown phone')
        new_business['location'] = business.get('location', 'Unknown address')
        new_business['photo'] = business.get('image_url')
        print("BUSINESS FROM SERVER:", business)

        businesses.append(new_business)

    return jsonify(businesses)


# return a list of business dictionaries for the purpose of generating seed data
# TODO: add .json to the route? other?
@app.route('/businesses/generate_businesses')
def get_businesses_for_zip_code():
    """Search for businesses on Yelp.
    
    Gets the zip code from the query string and makes a request to Yelp for 
    restaurants in that area.

    Return a jsonified list of businesses for the given zip code.
    """

    term = 'restaurants'
    location = request.args.get('zipCode', '')

    # TODO: handle the situation where no zipCode is passed in 
    # TODO: handle the situation where invalid zipCode is passed in (use regex?)

    radius = 24000    # in meters; this is about 15 miles
    # TODO: change the number of results to 25
    limit = 25        # limit the number of results to return

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




# get business details
# TODO: remove route if not being used
# @app.route('/businesses/<yelpId>')
# def fcn(yelpId):
#     """Get details about a business."""
#     # print("REACHED THE ROUTE!")
#     payload = {"locale": "en_US" }
#     headers = {"Authorization": f"Bearer {YELP_FUSION_API_KEY}"}

#     # TODO: remove comment
#     # sample business id "-JxgWP3A3n8cIfDpwZQ90w"
#     url = f"{BASE_URL}/{yelpId}"

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


if __name__ == "__main__":
    # connect to the database before app.run gets called
    # if you don't do this, Flask won't be able to access your database
    connect_to_db(app)
    app.debug = True
    app.run(host="0.0.0.0", debug=True)