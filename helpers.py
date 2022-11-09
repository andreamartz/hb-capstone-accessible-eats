def feedbacks_to_businesses(feedbacks):
    """Return a list of businesses with feedback.
    
    Args: a list of feedback objects from the database
    """

    businesses_dict = {}
    businesses = []
    
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