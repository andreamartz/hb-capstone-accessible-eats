from flask import (Flask, render_template, request, flash, session);
from model import connect_to_db, db
from jinja2 import StrictUndefined


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


if __name__ == "__main__":
    # connect to the database before app.run gets called
    # if you don't do this, Flask won't be able to access your database
    connect_to_db(app)
    app.debug = True
    app.run(host="0.0.0.0", debug=True)