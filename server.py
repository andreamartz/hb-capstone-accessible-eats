from flask import (Flask, jsonify, render_template, request, flash, session)
from model import connect_to_db, db
# from jinja2 import StrictUndefined
import os
import requests
import json


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
# login (see w3 d3 lecture)


# search for businesses
@app.route('/businesses/search')
def find_businesses():
    """Search for businesses on Yelp."""

    term = 'restaurants'
    location = request.args.get('zipCode', '')

    # TODO: handle the situation where no zipCode is passed in 
    # TODO: handle the situation where invalid zipCode is passed in

    radius = 24000    # in meters; this is about 15 miles
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
@app.route('/businesses/generate_yelp_ids')
def get_yelp_ids_for_zip_code():
    """Search for businesses on Yelp.
    
    Gets the zip code from the query string and makes a request to Yelp for 
    restaurants in that area.

    Return a jsonified list of yelp ids for the given zip code.
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
        yelp_id = business.get('id', None)
        if yelp_id:
            new_business['yelp_id'] = yelp_id
            businesses.append(new_business)

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