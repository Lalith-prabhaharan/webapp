import pandas as pd
from pymongo import MongoClient

# MongoDB Atlas connection settings
MONGODB_URI = "mongodb+srv://lalithkishore1612:Lalithdon@final.f4hbt.mongodb.net/"
DB_NAME = "test"  # Replace with your database name
COLLECTION_NAME = "engagements"  # Replace with your collection name

# Connect to MongoDB Atlas
client = MongoClient(MONGODB_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# Fetch all records from the collection
data = collection.find()

# Prepare a list to hold the flattened data
flattened_data = []

# Loop through each record in the fetched data
for record in data:
    user_id = record.get('userId')
    for engagement in record.get('courseEngagements', []):
        flattened_data.append({
            'userId': user_id,
            'courseId': engagement.get('courseId'),
            'timeSpent': engagement.get('timeSpent'),
            'score': engagement.get('score')
        })

# Create a DataFrame from the flattened data
df = pd.DataFrame(flattened_data)

# Save DataFrame to CSV
df.to_csv('course_engagements.csv', index=False)

print("CSV file 'course_engagements.csv' created successfully.")
