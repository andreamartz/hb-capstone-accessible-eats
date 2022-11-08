def feedbacks_to_businesses(feedbacks):
    """Return a dict of businesses with feedback.
    
    Args: a list of feedback objects from the database
    """

    businesses = {}
    
    # TODO: write this code in a more DRY way
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

        id = str(feedback_obj.business.id)
        # if the business is already in the businesses dict
        if businesses.get(id):
            # add the feedback dict to the corresponding business dict
            businesses[id]["feedbacks"].append(feedback)
        else:
            # create the business dict, including feedbacks list with the feedback;
            business['yelp_id'] = feedback_obj.business.yelp_id
            business['business_name'] = feedback_obj.business.business_name
            business['feedbacks'] = [feedback]
            # add the business to the businesses dict
            businesses[id] = business
            
    print("BUSINESSES: ", businesses)
    return businesses