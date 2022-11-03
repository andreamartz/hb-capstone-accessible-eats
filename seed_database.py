"""Script to seed the database."""

import os
import crud
import model
import server

os.system("dropdb dest_a11y_db")
os.system('createdb dest_a11y_db')

model.connect_to_db(server.app)
model.db.create_all()

# # Load data from JSON file
with open('data/users.json') as f:
    user_data = json.loads(f.read())

# Create users, store them in list so we can use them
# to create fake feedback later
users_in_db = []
for user in user_data:
    # get the title, overview, and poster_path from the movie
    # dictionary. Then, get the release_date and convert it to a 
    # datetime object with datetime.strptime
    first_name, last_name, username, password = (
        user["first_name"],
        user["last_name"],
        user["username"],
        user["password"]
    )

#     release_date = datetime.strptime(movie["release_date"], "%Y-%m-%d")

    # create a movie and append it to movies_in_db
    db_user = crud.create_user(first_name=firstname,
                               last_name=last_name,
                               username=username,
                               password=password)
    users_in_db.append(db_user)

model.db.session.add_all(users_in_db)
model.db.session.commit()

# for n in range(10):
#     email = f'user{n}@test.com'  # Voila! A unique email!
#     password = 'test'

#     # Create a user
#     new_user = crud.create_user(email, password)
#     model.db.session.add(new_user)

#     # Create 10 ratings for the user
#     for n in range(10):
#         random_movie = choice(movies_in_db)
#         score = randint(1, 5)
        
#         rating = crud.create_rating(new_user, random_movie, score)
#         model.db.session.add(rating)

# model.db.session.commit()