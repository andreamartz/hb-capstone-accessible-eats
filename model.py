"""Model for Destination: Accessible app."""

# import the SQLAlchemy constructor fcn
from flask_sqlalchemy import SQLAlchemy  

# create a SQLAlchemy instance called db
db = SQLAlchemy()


class User(db.Model):
    """A user."""

    __tablename__ = 'users'

    id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    is_authenticated = db.Column(db.Boolean, default=False)
    is_active = db.Column(db.Boolean, default=False)
    is_anonymous = db.Column(db.Boolean, default=False)

    feedbacks = db.relationship("Feedback", back_populates="user")


    def __repr__(self):
        return f'<User id={self.id} username={self.username}>'


class Business(db.Model):
    """A business."""

    __tablename__ = 'businesses'

    id = db.Column(db.Integer,
                   autoincrement=True,
                   primary_key=True)
    yelp_id = db.Column(db.String, unique=True)
    business_name = db.Column(db.String)

    feedbacks = db.relationship("Feedback", back_populates="business")


    def __repr__(self):
        return f'<Business id={self.id} yelp_id={self.yelp_id}>'


class Feedback(db.Model):
    """User feedback."""

    __tablename__ = 'feedbacks'

    id = db.Column(db.Integer,
                   autoincrement=True,
                   primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"))
    chair_parking = db.Column(db.Boolean, default=False)
    ramp = db.Column(db.Boolean, default=False)
    auto_door = db.Column(db.Boolean, default=False)
    comment = db.Column(db.String, nullable=True)

    user = db.relationship("User", back_populates="feedbacks")
    business = db.relationship("Business", back_populates="feedbacks")


    def __repr__(self):
        return f'<Feedback id={self.id} \
        business_id={self.business_id} user_id={self.user_id}>'


def connect_to_db(flask_app, db_uri="postgresql:///dest_a11y_db", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    print("Connected to the db!")


if __name__ == "__main__":
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)