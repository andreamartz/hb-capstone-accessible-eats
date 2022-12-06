"""Model for Accessible Eats app."""

from flask_login import UserMixin, LoginManager
import werkzeug.security
# import the SQLAlchemy constructor fcn
from flask_sqlalchemy import SQLAlchemy  

# create a SQLAlchemy instance called db
db = SQLAlchemy()


# class User(db.Model, UserMixin):        # Flask-Login
class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    # is_authenticated = db.Column(db.Boolean, default=False)
    # is_active = db.Column(db.Boolean, default=False)
    # is_anonymous = db.Column(db.Boolean, default=False)

    feedbacks = db.relationship("Feedback", back_populates="user")

    # # TODO: add get id fcn - see Flask-Login docs
    # def get_id():
    #     """Return user's id."""

    #     return str(id)


    def __repr__(self):
        return f'<User id={self.id} \
                       username={self.username} >'


class Business(db.Model):
    """A business.
    
    A business is added to the database when a user provides feedback."""

    __tablename__ = 'businesses'

    id = db.Column(db.Integer,
                   autoincrement=True,
                   primary_key=True)
    yelp_id = db.Column(db.String, unique=True)
    business_name = db.Column(db.String(100), nullable=False)
    address1 = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(40), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    display_phone = db.Column(db.String, nullable=False)
    photo = db.Column(db.String, nullable=False)

    feedbacks = db.relationship("Feedback", back_populates="business")


    def __repr__(self):
        return f'<Business id={self.id} yelp_id={self.yelp_id}>'


class Feedback(db.Model):
    """User feedback."""

    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer,
                   autoincrement=True,
                   primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"), nullable=False)
    chair_parking = db.Column(db.Boolean, default=False, nullable=False)
    ramp = db.Column(db.Boolean, default=False, nullable=False)
    auto_door = db.Column(db.Boolean, default=False, nullable=False)
    comment = db.Column(db.String, nullable=True)

    user = db.relationship("User", back_populates="feedbacks")
    business = db.relationship("Business", back_populates="feedbacks")


    def __repr__(self):
        return f'<Feedback id={self.id} \
        business_id={self.business_id} user_id={self.user_id}>'

    def as_dict(self):
        return {'id': self.id,
            'user_id': self.user_id,
            'business_id': self.business_id,
            'chair_parking': self.chair_parking,
            'ramp': self.ramp,
            'auto_door': self.auto_door,
            'comment': self.comment,
        }


# def example_data():
#     """Create some sample data."""

#     # In case this is run more than once, empty out existing data
#     User.query.delete()
#     Business.query.delete()
#     Feedback.query.delete()

    # # Add sample users
    # u1 = User(username='u1', 
    #           password=werkzeug.security.generate_password_hash('pw1'),
    #           first_name='f1',
    #           last_name='l1',
    # )
    # u2 = User(username='u2', 
    #         password=werkzeug.security.generate_password_hash('pw2'),
    #         first_name='f2',
    #         last_name='l2',
    # )
    # u3 = User(username='u3', 
    #         password=werkzeug.security.generate_password_hash('pw3'),
    #         first_name='f3',
    #         last_name='l3',
    # )

    # # Add sample businesses
    # b1 = Business(yelp_id="K4q-u8_x1WDa0lP3698rAQ",
    #               business_name="Brick and Bourbon",
    #               address="12900 Technology Dr",
    #               city="Eden Prairie",
    #               state="MN",
    #               zip_code=55344,
    #               display_phone="(952) 426-1125",
    #               photo="https://s3-media2.fl.yelpcdn.com/bphoto/-iu3LM_gGvKP1gBbcym5UA/o.jpg"
    # )
    # b2 = Business(yelp_id="-JxgWP3A3n8cIfDpwZQ90w",
    #             business_name="Mugshots Coffee Company",
    #             address="10518 France Ave S",
    #             city="Bloomington",
    #             state="MN",
    #             zip_code=55431,
    #             display_phone="(952) 977-9660",
    #             photo="https://s3-media1.fl.yelpcdn.com/bphoto/9ejXGr29i_Qon28S9uQcHg/o.jpg"
    # )
    # b3 = Business(yelp_id="2N1CpDNZnPJFy2ooPk7f1Q",
    #             business_name="NorthStar Tavern",
    #             address="5101 W 98th St W",
    #             city="Bloomington",
    #             state="MN",
    #             zip_code=55437,
    #             display_phone="(952) 405-6040",
    #             photo="https://s3-media1.fl.yelpcdn.com/bphoto/GG3FjB_wsSbbw1oVaJ-_Vg/o.jpg"
    # )

    # # Add sample feedbacks
    # # feedback = Feedback(user_id=user_id,
    # #                 business_id=business_id,
    # #                 chair_parking=chair_parking,
    # #                 ramp=ramp,
    # #                 auto_door=auto_door,
    # #                 comment=comment)
    # f1 = Feedback(user_id=3,
    #               business_id=2,
    #               chair_parking=
    # )


def connect_to_db(flask_app, db_uri="postgresql:///dest_a11y_db", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    # login_manager = LoginManager()          #Flask-Login
    # login_manager.init_app(app)          #Flask-Login


if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)