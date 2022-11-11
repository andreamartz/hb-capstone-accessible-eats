"""CRUD operations."""

from model import db, User, Business, Feedback, connect_to_db
from helpers import feedbacks_to_businesses

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

    # return User.query.filter_by(username=username).count()
    count_query = User.query.filter(User.username == username)
    count = count_query.count()
    print("THE COUNT IS: ", count)
    return count
    # return User.query.filter(User.username == username).count()


def get_user_by_username(username):
    """Return a user by username.
    
    Args: username, a string

    Return the first user with the given username
    """
    
    user_query = User.query.filter(User.username == username)
    user = user_query.first()
    return user
    # return User.query.filter_by(username==username).first()


# ********* Businesses **********

def get_business_by_id(id):
    """Return a business by primary key."""

    return Business.query.get(id)


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

    result = feedbacks_to_businesses(feedbacks_by_user)

    # print("RESULT: ", result)
    return result


if __name__ == "__main__":
    from server import app

    connect_to_db(app)