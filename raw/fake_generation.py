import pandas as pd
from pymongo import MongoClient
from faker import Faker
import random

# MongoDB Atlas connection settings
MONGODB_URI = "mongodb+srv://lalithkishore1612:Lalithdon@final.f4hbt.mongodb.net/"
DB_NAME = "test"  # Replace with your database name

# Connect to MongoDB Atlas
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]

# Extract existing data from collections
courses_collection = db["courses"]  # Replace with your courses collection name
feedback_collection = db["feedbacks"]  # Replace with your feedback collection name
users_collection = db["users"]  # Replace with your users collection name
engagements_collection = db["engagements"]  # Replace with your engagements collection name

# Fetch existing data
courses_data = list(courses_collection.find())
feedback_data = list(feedback_collection.find())
users_data = list(users_collection.find())
engagements_data = list(engagements_collection.find())

# Create Faker instance
fake = Faker()

# Generate fake data for users
users_list = []
for i in range(200):  # Generate 100 fake users
    users_list.append({
        'userId': i + 1,
        'name': fake.name(),
        'email': fake.email(),
        'password': fake.password(),
        'role': random.choice(['user']),
        'department': random.choice(['Data Science', 'Data Engineering', 'Full-Stack', 'Testing', 'Devops', 'Consultancy']),
        'designation': random.choice(['Software Engineer', 'Principal Architect', 'Project Manager', 'Intern', 'Senior Software Engineer', 'Solutions Enabler', 'Solutions Consultant','Solutions Architect'])
    })


# Generate fake data for courses
courses_list = []
for i in range(300):  # Generate 1000 fake courses
    courses_list.append({
        'courseId': i + 1,
        'name': fake.sentence(nb_words=4),  # Random course name
        'est_duration': f"{random.randint(0, 4 * 60)} hours",  # Random estimated duration
        'postedby': fake.date(),
        'stack': random.choice(['data engineering', 'web development', 'data science', 'gen AI']),
        'prerequisites': random.choice(['None', 'Basic SQL', 'Intermediate Python', 'HTML', 'CSS']),
        # 'blogContent': fake.text(max_nb_chars=200)  # Random blog content
    })

# Generate fake data for feedback
feedback_list = []
for i in range(1000):  # Generate 1000 fake feedback entries
    feedback_list.append({
        'userId': random.randint(1, 200),  # Assuming userIds range from 1 to 100
        'courseId': random.randint(1, 300),  # Assuming courseIds range from 1 to 1000
        'rating': random.randint(1, 5),  # Rating between 1 and 5
        'difficulty': random.choice(['Easy', 'Medium', 'Hard']),
        'comments': fake.sentence(),
        'interactive': random.choice(['Yes', 'No'])
    })


# Generate fake data for course engagements
engagements_list = []
for i in range(30000):  # Generate 1000 fake course engagement entries
    engagements_list.append({
        'userId': random.randint(1, 200),  # Random userId from existing users
        'courseId': random.randint(1, 300),  # Random courseId from existing courses
        'timeSpent': random.randint(0, 4 * 60),  # Time spent between 0 and 240 minutes
        'score': random.randint(0, 5),  # Score between 0 and 5
        'discussions': random.randint(0,50)
    })

# Create DataFrames for each collection
courses_df = pd.DataFrame(courses_list)
feedback_df = pd.DataFrame(feedback_list)
users_df = pd.DataFrame(users_list)
engagements_df = pd.DataFrame(engagements_list)

# Save DataFrames to CSV files
courses_df.to_csv('raw_courses.csv', index=False)
feedback_df.to_csv('raw_feedback.csv', index=False)
users_df.to_csv('raw_users.csv', index=False)
engagements_df.to_csv('raw_engagements.csv', index=False)

print("CSV files with thousands of records created successfully.")
