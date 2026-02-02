import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URL)
database = client.blog_db
user_collection = database.get_collection("users")
blog_collection = database.get_collection("blogs")
contact_collection = database.get_collection("contacts")
