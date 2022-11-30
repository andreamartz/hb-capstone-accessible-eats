"""Tests for helper functions"""

import unittest
import helpers

class HelpersTestCase(unittest.TestCase):
    """Unit tests for helper functions."""
    
    def test_rename_dict_keys(self):
        my_dict = {"key1": 1,
                   "key2": 2,
                  }
        old_to_new = {"key1": "new_key1",
                      "key2": "new_key2"
                     }
        self.assertEqual(helpers.rename_dict_keys(my_dict, old_to_new),
                    {"new_key1": 1,
                    "new_key2": 2
                    })


    def test_aggregate_feedback(self):
        business = {'yelp_id': 'lfW0T-j4VtQA1yNV4YZfoA', 
                    # 'place_name': 'Ciao Bella', 
                    # 'coordinates': {'latitude': 44.8620952, 'longitude': -93.3244895},
                    # 'display_phone': '(952) 841-1000', 
                    # 'location': {'address1': '3501 Minnesota Dr', 
                    #              'address2': '', 
                    #              'address3': '', 
                    #              'city': 'Bloomington', 
                    #              'zip_code': '55435', 
                    #              'country': 'US', 
                    #              'state': 'MN', 
                    #              'display_address': ['3501 Minnesota Dr', 'Bloomington, MN 55435']}, 
                    # 'photo': 'https://s3-media2.fl.yelpcdn.com/bphoto/jTKwjPRljOqfKXdnrRaCqA/o.jpg', 
                    # 'id': 5, 
                    'feedbacks': [{'id': 3, 'user_id': 1, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': False, 'comment': 'There was a ramp to the front door, but it was closed for repair the day I was there.'},
                                  {'id': 21, 'user_id': 3, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': False, 'comment': "The men's bathroom did not have large enough stalls to accommodate my chair."}, 
                                  {'id': 35, 'user_id': 4, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': True, 'comment': 'They have handicapped parking spots, but not enough of them.'}, 
                                  {'id': 80, 'user_id': 8, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': False, 'comment': 'I have low vision, and the font on the menu was way too small.'}, 
                                  {'id': 83, 'user_id': 9, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'They have handicapped parking spots, but not enough of them.'}, 
                                  {'id': 94, 'user_id': 10, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': True, 'comment': 'The front door normally opens automatically, but the automatic feature was broken the day I visited.'}, 
                                  {'id': 121, 'user_id': 13, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'I was able to sit at a table, but the waitress scowled about the amount of room my chair occupied.'}, 
                                  {'id': 137, 'user_id': 14, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': True, 'comment': 'There were no braille signs in or on the building.'}, 
                                  {'id': 155, 'user_id': 16, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': "The men's bathroom did not have large enough stalls to accommodate my chair."}, 
                                  {'id': 211, 'user_id': 22, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'I have low vision, and the font on the menu was way too small.'}, 
                                  {'id': 239, 'user_id': 24, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'There was a ramp to the front door, but it was closed for repair the day I was there.'}, 
                                  {'id': 248, 'user_id': 25, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': False, 'comment': 'There was a ramp to the front door, but it was closed for repair the day I was there.'}, 
                                  {'id': 274, 'user_id': 28, 'business_id': 5, 'chair_parking': True, 'ramp': False, 'auto_door': True, 'comment': 'I have low vision, and the font on the menu was way too small.'}, 
                                  {'id': 323, 'user_id': 33, 'business_id': 5, 'chair_parking': True, 'ramp': False, 'auto_door': False, 'comment': 'There was a ramp to the front door, but it was closed for repair the day I was there.'}, 
                                  {'id': 341, 'user_id': 35, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': False, 'comment': 'The front door normally opens automatically, but the automatic feature was broken the day I visited.'}, 
                                  {'id': 360, 'user_id': 36, 'business_id': 5, 'chair_parking': False, 'ramp': False, 'auto_door': True, 'comment': 'There were no braille signs in or on the building.'}, 
                                  {'id': 396, 'user_id': 40, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'The front door normally opens automatically, but the automatic feature was broken the day I visited.'}, 
                                  {'id': 420, 'user_id': 42, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': True, 'comment': 'They have handicapped parking spots, but not enough of them.'}, 
                                  {'id': 433, 'user_id': 44, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'There were no braille signs in or on the building.'}, 
                                  {'id': 467, 'user_id': 47, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'There were no braille signs in or on the building.'}, 
                                  {'id': 477, 'user_id': 48, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': False, 'comment': 'The front door normally opens automatically, but the automatic feature was broken the day I visited.'}
                    ]
        }

        bus_with_agg_fdbk = {'yelp_id': 'lfW0T-j4VtQA1yNV4YZfoA', 
                            #  'place_name': 'Ciao Bella', 
                            #  'coordinates': {'latitude': 44.8620952, 'longitude': -93.3244895}, 
                            #  'display_phone': '(952) 841-1000', 
                            #  'location': {'address1': '3501 Minnesota Dr', 'address2': '', 'address3': '', 'city': 'Bloomington', 'zip_code': '55435', 'country': 'US', 'state': 'MN', 'display_address': ['3501 Minnesota Dr', 'Bloomington, MN 55435']}, 
                            #  'photo': 'https://s3-media2.fl.yelpcdn.com/bphoto/jTKwjPRljOqfKXdnrRaCqA/o.jpg', 
                            #  'id': 5, 
                             'feedbacks': [{'id': 3, 'user_id': 1, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': False, 'comment': 'There was a ramp to the front door, but it was closed for repair the day I was there.'},
                                           {'id': 21, 'user_id': 3, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': False, 'comment': "The men's bathroom did not have large enough stalls to accommodate my chair."}, 
                                           {'id': 35, 'user_id': 4, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': True, 'comment': 'They have handicapped parking spots, but not enough of them.'}, 
                                           {'id': 80, 'user_id': 8, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': False, 'comment': 'I have low vision, and the font on the menu was way too small.'}, 
                                           {'id': 83, 'user_id': 9, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'They have handicapped parking spots, but not enough of them.'}, 
                                           {'id': 94, 'user_id': 10, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': True, 'comment': 'The front door normally opens automatically, but the automatic feature was broken the day I visited.'}, 
                                           {'id': 121, 'user_id': 13, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'I was able to sit at a table, but the waitress scowled about the amount of room my chair occupied.'}, 
                                           {'id': 137, 'user_id': 14, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': True, 'comment': 'There were no braille signs in or on the building.'}, 
                                           {'id': 155, 'user_id': 16, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': "The men's bathroom did not have large enough stalls to accommodate my chair."},
                                           {'id': 211, 'user_id': 22, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'I have low vision, and the font on the menu was way too small.'}, 
                                           {'id': 239, 'user_id': 24, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'There was a ramp to the front door, but it was closed for repair the day I was there.'}, 
                                           {'id': 248, 'user_id': 25, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': False, 'comment': 'There was a ramp to the front door, but it was closed for repair the day I was there.'}, 
                                           {'id': 274, 'user_id': 28, 'business_id': 5, 'chair_parking': True, 'ramp': False, 'auto_door': True, 'comment': 'I have low vision, and the font on the menu was way too small.'}, 
                                           {'id': 323, 'user_id': 33, 'business_id': 5, 'chair_parking': True, 'ramp': False, 'auto_door': False, 'comment': 'There was a ramp to the front door, but it was closed for repair the day I was there.'}, 
                                           {'id': 341, 'user_id': 35, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': False, 'comment': 'The front door normally opens automatically, but the automatic feature was broken the day I visited.'}, 
                                           {'id': 360, 'user_id': 36, 'business_id': 5, 'chair_parking': False, 'ramp': False, 'auto_door': True, 'comment': 'There were no braille signs in or on the building.'}, 
                                           {'id': 396, 'user_id': 40, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'The front door normally opens automatically, but the automatic feature was broken the day I visited.'}, 
                                           {'id': 420, 'user_id': 42, 'business_id': 5, 'chair_parking': False, 'ramp': True, 'auto_door': True, 'comment': 'They have handicapped parking spots, but not enough of them.'}, 
                                           {'id': 433, 'user_id': 44, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'There were no braille signs in or on the building.'}, 
                                           {'id': 467, 'user_id': 47, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': True, 'comment': 'There were no braille signs in or on the building.'}, 
                                           {'id': 477, 'user_id': 48, 'business_id': 5, 'chair_parking': True, 'ramp': True, 'auto_door': False, 'comment': 'The front door normally opens automatically, but the automatic feature was broken the day I visited.'}], 
                             'feedback_aggregated': {'pct_chair_parking': 62, 
                                                     'pct_ramp': 86, 
                                                     'pct_auto_door': 67, 
                                                     'comments': ['There was a ramp to the front door, but it was closed for repair the day I was there.', "The men's bathroom did not have large enough stalls to accommodate my chair.", 'They have handicapped parking spots, but not enough of them.', 'I have low vision, and the font on the menu was way too small.', 'They have handicapped parking spots, but not enough of them.', 'The front door normally opens automatically, but the automatic feature was broken the day I visited.', 'I was able to sit at a table, but the waitress scowled about the amount of room my chair occupied.', 'There were no braille signs in or on the building.', "The men's bathroom did not have large enough stalls to accommodate my chair.", 'I have low vision, and the font on the menu was way too small.', 'There was a ramp to the front door, but it was closed for repair the day I was there.', 'There was a ramp to the front door, but it was closed for repair the day I was there.', 'I have low vision, and the font on the menu was way too small.', 'There was a ramp to the front door, but it was closed for repair the day I was there.', 'The front door normally opens automatically, but the automatic feature was broken the day I visited.', 'There were no braille signs in or on the building.', 'The front door normally opens automatically, but the automatic feature was broken the day I visited.', 'They have handicapped parking spots, but not enough of them.', 'There were no braille signs in or on the building.', 'There were no braille signs in or on the building.', 'The front door normally opens automatically, but the automatic feature was broken the day I visited.']
                                                    }
                            }
        self.assertEqual(helpers.aggregate_feedback(business), bus_with_agg_fdbk)


if __name__ == "__main__":
    # if the file is called like a script, run our tests
    unittest.main(verbosity=2)