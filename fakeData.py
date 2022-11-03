import json
from faker import Faker
fake = Faker()
Faker.seed(0)

def generateUsers():
    first_names = []
    last_names = []
    usernames = []
    passwords = []
    users = []
    for i in range(20):
        first_name = fake.first_name()
        last_name = fake.last_name()

        user = {"first_name": first_name,
                "last_name": last_name,
                "username": f'{first_name}1',
                "password": f'{last_name}1'}
        users.append(user)

    return json.dumps(users)

print(generateUsers())