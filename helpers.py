def feedbacks_to_businesses(feedbacks):
    """Return a list of businesses with feedback.
    
    Args: a list of feedback objects from the database
    """

    businesses_dict = {}
    businesses = []
    
    # TODO: write this code in a more DRY way
    # for feedback_dict in feedbacks:
    #   ...
    # iterate over a list of feedback objects from database

    for feedback_obj in feedbacks:
        feedback = {}
        business = {}

        feedback['id'] = feedback_obj.id
        feedback['user_id'] = feedback_obj.user_id
        feedback['business_id'] = feedback_obj.business_id
        feedback['chair_parking'] = feedback_obj.chair_parking
        feedback['ramp'] = feedback_obj.ramp
        feedback['auto_door'] = feedback_obj.auto_door
        feedback['comment'] = feedback_obj.comment

        id = str(feedback_obj.business.id)
        # if the business is already in the businesses dict
        if businesses_dict.get(id):
            # add the feedback dict to the corresponding business dict
            businesses_dict[id]["feedbacks"].append(feedback)
        else:
            # create the business dict, including feedbacks list with the feedback;
            address1 = feedback_obj.business.address1
            city = feedback_obj.business.city
            state = feedback_obj.business.state
            zip_code = feedback_obj.business.zip_code

            location = {"address1": address1,
                        "city": city,
                        "state": state,
                        "zip_code": zip_code}

            business['location'] = location
            business['yelp_id'] = feedback_obj.business.yelp_id
            business['place_name'] = feedback_obj.business.business_name
            business['display_phone'] = feedback_obj.business.display_phone
            business['photo'] = feedback_obj.business.photo
            business['feedbacks'] = [feedback]

            # add the business to the businesses dict
            businesses_dict[id] = business

    for id in businesses_dict:
        businesses.append(businesses_dict[id])

    return businesses


def rename_dict_keys(dict, old_to_new_keys):
    """Return a dictionary with same values, but new keys.
    
    Args: 
        dict: a dictiionary
        new_keys: a list of key names
        old_keys: a list of key names of interest from dict

    The length of new_keys and old_keys must match.
    """

    result = {}
    for old_key, new_key in old_to_new_keys.items():
        result[new_key] = dict.get(old_key)

    return result


def match_feedbacks_with_businesses(businesses, businesses_plus_feedbacks):
    """Returns a list of businesses with feedbacks attached.
    
    Args:
        businesses: a list of businesses from Yelp
        businesses_plus_feedbacks: a list of businesses with feedbacks
    """

    for business in businesses:
        yelp_id = business['yelp_id']
        business["feedback_objs"] = []
        if businesses_plus_feedbacks.get(yelp_id):
            business['id'] = businesses_plus_feedbacks[yelp_id].id
            business['feedback_objs'] = businesses_plus_feedbacks[yelp_id].feedbacks
    
    return businesses


def aggregate_feedback(business):
    """Returns a business with aggregated feedback.
    
    Args: a dictionary containing information for a business
    """
    
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

    return business
