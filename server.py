from flask import (Flask, jsonify, render_template, request, flash, session)
from model import connect_to_db, db
from jinja2 import StrictUndefined
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
app.jinja_env.undefined = StrictUndefined

YELP_FUSION_API_KEY = os.environ['YELP_FUSION_API_KEY']
BASE_URL = 'https://api.yelp.com/v3/businesses'


@app.route('/')
def index():
    """Display homepage."""

    return render_template('index.html')


# get business details
@app.route('/businesses/<id>')
def fcn(id):
    """Get details about a business."""

    payload = {"locale": "en_US" }
    headers = {"Authorization": f"Bearer {YELP_FUSION_API_KEY}"}

    # TODO: remove comment
    # sample business id "-JxgWP3A3n8cIfDpwZQ90w"
    url = f"{BASE_URL}/{id}"

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


if __name__ == "__main__":
    # connect to the database before app.run gets called
    # if you don't do this, Flask won't be able to access your database
    connect_to_db(app)
    app.debug = True
    app.run(host="0.0.0.0", debug=True)