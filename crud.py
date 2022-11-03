"""CRUD operations."""

from model import db, User, Business, Feedback, connect_to_db

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


def create_business(yelp_id, business_name):
    """Create and return a new business."""

    business = Business(yelp_id=yelp_id,
                        business_name=business_name,)

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


