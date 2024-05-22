# Chatbot Application

This application consists of a chat interface where users can interact with a chatbot to ask questions based on the content of a provided PDF document. The application architecture includes a frontend built with ReactJS, a backend built with FastAPI and PostgreSQL, and a PDF processing service.

## Setup Instructions

### Prerequisites
- Node.js
- Python
- PostgreSQL

### Frontend Setup
1. Navigate to the `planet` folder.
2. Install dependencies using `npm install`.
3. Start the frontend server using `npm start`.

### Backend Setup
1. Navigate to the `backend` folder.
2. Install dependencies using `pip install -r requirements.txt`.
3. Start the backend server using `uvicorn main:app --reload`.

### Database Setup
1. Create a PostgreSQL database.
2. Update the database connection URL in `main.py` with your PostgreSQL connection details.

## API Documentation

### Endpoint: `/api/ask` [POST]
- Description: Endpoint to ask a question to the chatbot based on the provided PDF content.
- Request Body:
  - `question`: The question to ask the chatbot.
  - `text`: The content of the PDF document.
- Response Body:
  - `answer`: The answer provided by the chatbot.

### Endpoint: `/messages/` [POST]
- Description: Endpoint to save chat messages.
- Request Body:
  - `user`: The user who sent the message.
  - `text`: The content of the message.

### Endpoint: `/messages/` [GET]
- Description: Endpoint to retrieve all saved chat messages.
- Response Body:
  - List of chat messages.

## Application Architecture Overview

The application follows a client-server architecture with separate frontend and backend components. The frontend is built with ReactJS and provides a user-friendly interface for interacting with the chatbot. The backend is built with FastAPI, providing endpoints for processing user queries, saving chat messages, and retrieving chat history. PostgreSQL is used as the database to store chat messages. Additionally, a PDF processing service is integrated to extract text from uploaded PDF documents and provide relevant information to the chatbot.
