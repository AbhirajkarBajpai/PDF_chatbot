# main.py

from fastapi import FastAPI
from pydantic import BaseModel
import databases
import sqlalchemy

# Database connection URL
DATABASE_URL = "_____"

# Create FastAPI app
app = FastAPI()

# Create database engine
database = databases.Database(DATABASE_URL)

# SQLAlchemy models
metadata = sqlalchemy.MetaData()

messages = sqlalchemy.Table(
    "messages",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user", sqlalchemy.String),
    sqlalchemy.Column("text", sqlalchemy.String),
)

# Create tables
engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)


# Pydantic model for incoming chat message
class MessageIn(BaseModel):
    user: str
    text: str


# Endpoint to save chat message
@app.post("/messages/", response_model=MessageIn)
async def create_message(message: MessageIn):
    query = messages.insert().values(user=message.user, text=message.text)
    message_id = await database.execute(query)
    return {"user": message.user, "text": message.text}


# Endpoint to get all chat messages
@app.get("/messages/", response_model=list[MessageIn])
async def get_messages():
    query = messages.select()
    return await database.fetch_all(query)
