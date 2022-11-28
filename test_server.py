"""Tests for Accessible Eats Flask app."""

import os
import unittest
from server import app
import model
from flask import session
import json

class FlaskTestsDatabase(unittest.TestCase):
    """Flask tests that use the database."""

    def setUp(self):
        """Code to run before every test."""

        # Get the Flask test client
        self.client = app.test_client()
        app.config['TESTING'] = True
        app.config['SECRET_KEY'] = 'key'

        # Connect to test database
        model.connect_to_db(app, "postgresql:///dest_a11y_test_db")

        os.system("python3 seed_database_test.py")

        print("INSIDE SETUP!")

        # # Start each test with a user ID stored in the session.
        # with self.client as c:
        #     with c.session_transaction() as sess:
        #         sess['user_id'] = 1


    def tearDown(self):
        """Code to run after every test."""
        with app.app_context():
            model.db.session.remove()
            model.db.drop_all()
            model.db.engine.dispose()
        print("INSIDE TEARDOWN!")

    
    def test_index(self):
        """Can we reach the page returned by the server?"""

        result = self.client.get('/')
        self.assertEqual(result.status_code, 200)


    # with app.app_context():
    def test_signup(self):
        result = self.client.post("/signup", 
                                json={"signupFirstName": "Jane",
                                        "signupLastName": "Doe",
                                        "signupUsername": "Jane1",
                                        "signupPassword": "Doe1"}
                                )
        
        print("DECODED: ", result.data.decode())
        my_dict = json.loads(result.data.decode())
        self.assertIn("success", my_dict)
        assert my_dict["success"] == True


if __name__ == "__main__":
    # if the file is called like a script, run our tests
    unittest.main()