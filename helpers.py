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
        print("FEEDBACK_OBJ.BUSINESS: ", feedback_obj.business.business_name)
        feedback = {}
        business = {}

        feedback['id'] = feedback_obj.id
        feedback['user_id'] = feedback_obj.user_id
        feedback['business_id'] = feedback_obj.business_id
        feedback['chair_parking'] = feedback_obj.chair_parking
        feedback['ramp'] = feedback_obj.ramp
        feedback['auto_door'] = feedback_obj.auto_door
        feedback['comment'] = feedback_obj.comment

        # keys = ['id', 'user_id', 'business_id', 'chair_parking', 'ramp', 'auto_door', 'comment']
        # feedback = create_dict_from_obj(feedback_obj, keys)
        # print("FEEDBACK DICT: ", feedback)

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

    print("BUSINESSES: ", businesses)
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
        b_with_feedbacks: a list of businesses with feedbacks

    """
    # TODO:
    # Current strategy:
    # get list of businesses from yelp
    # find all unique zip codes in the result
    # find all database entries with those zip codes
    # match up the businesses based on yelp_id

    # Proposed new strategy:
    # get list of businesses from yelp
    # create list/set of all yelp_ids from those results
    # crud.py: query database for all businesses whose yelp ids are in that list
    #          return a dictionary { yelp_id: business_obj }
    # for each yelp result, look up the corresponding entry in that dictionary

    new_businesses = []
    for business in businesses:
        for bus_plus in businesses_plus_feedbacks:
            if business['yelp_id'] == bus_plus.yelp_id:
                business['id'] = bus_plus.id
                business['feedback_objs'] = bus_plus.feedbacks
                new_businesses.append(business)

    return new_businesses



