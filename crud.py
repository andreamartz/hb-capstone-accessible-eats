"""CRUD operations."""

from model import db, User, Business, Feedback, connect_to_db
import helpers

# **************************
# CREATE FUNCTIONS
# **************************


def create_user(first_name, last_name, username, password):
    """Create and return a new user."""

    user = User(first_name=first_name,
                last_name=last_name,
                username=username,
                password=password)

    return user


def create_business(yelp_id, 
                    business_name,
                    address1,
                    city,
                    state,
                    zip_code,
                    display_phone,
                    photo):
    """Create and return a new business."""

    business = Business(yelp_id=yelp_id,
                        business_name=business_name,
                        address1=address1,
                        city=city,
                        state=state,
                        zip_code=zip_code,
                        display_phone=display_phone,
                        photo=photo)

    return business


def create_feedback(user_id, business_id, chair_parking, ramp, auto_door, comment):
    """Create and return a new business."""

    feedback = Feedback(user_id=user_id,
                        business_id=business_id,
                        chair_parking=chair_parking,
                        ramp=ramp,
                        auto_door=auto_door,
                        comment=comment)

    return feedback


# **************************
# READ (GET) FUNCTIONS
# **************************

# ********* Users **********

def get_user_by_id(id):
    """Return a user by primary key."""

    return User.query.get(id)


def count_users_by_username(username):
    """Return the count of users with a given username."""

    count_query = User.query.filter(User.username == username)
    count = count_query.count()
    return count


def get_user_by_username(username):
    """Return a user by username.
    
    Args: username, a string

    Return the first user with the given username
    """
    
    user_query = User.query.filter(User.username == username)
    user = user_query.first()
    return user
    # return User.query.filter_by(username==username).first()

# **************************
# UPDATE FUNCTIONS
# **************************

# ********* Users **********

# TODO: implement this in update user profile fcn
def update_user(user, profile_data):
    """Update user account info."""

    first_name = profile_data.get('signupFirstName')
    last_name = profile_data.get('signupLastName')
    username = profile_data.get('signupUsername')
    # password = profile_data.get('signupPassword')

    user.first_name = first_name
    user.last_name = last_name
    user.username = username
    # user.password = password

    return user


# ********* Businesses **********

def get_business_by_yelp_id(yelp_id):
    """Return a business by Yelp id."""

    return Business.query.filter_by(yelp_id=yelp_id).options(db.joinedload("feedbacks")).first()


def get_businesses_with_feedbacks(yelp_ids):
    """Return dictionary of businesses with feedbacks attached.
    Yelp ids are the keys.
    """

    # get businesses with feedbacks
    businesses = Business.query.filter(Business.yelp_id.in_(yelp_ids)).options(db.joinedload('feedbacks')).all()
    # create a dictionary of business dtbs objects, each with yelp_id as the key
    businesses_dict = { f'{business.yelp_id}': business for business in businesses }

    return businesses_dict


# ********* Feedbacks **********

def get_feedback_by_id(id):
    """Return a feedback by primary key."""

    return Feedback.query.get(id)


def get_feedbacks_by_user(user_id):
    """Return all feedbacks for the user with the given id.
    
    The returned data will include business information for all businesses 
        represented in the feedbacks.
    """

    feedbacks_by_user = Feedback.query.filter(Feedback.user_id == user_id).options(db.joinedload('business')).all()

    result = helpers.feedbacks_to_businesses(feedbacks_by_user)

    return result


if __name__ == "__main__":
    from server import app

    connect_to_db(app)