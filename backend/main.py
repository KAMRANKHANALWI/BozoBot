from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
import logging

load_dotenv()
app = FastAPI()

# Logging configuration
logging.basicConfig(level=logging.INFO)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Initialize the LLM
groq_api_key = os.getenv("GROQ_API_KEY")
llm = ChatGroq(
    temperature=0.2,
    model_name="llama-3.3-70b-versatile",
    groq_api_key=groq_api_key,
)

# In-memory storage for simplicity
sessions = {}


class Message(BaseModel):
    session_id: str
    message: str


# Root endpoints
@app.get("/")
async def root():
    return {
        "message": "Welcome to the FastAPI Chatbot Backend!",
        "description": "This API allows users to interact with a chatbot powered by Groq LLM.",
        "endpoints": {
            "POST /chat/": "Send a message and receive a chatbot response.",
            "GET /chat/{session_id}/": "Retrieve chat history for a given session.",
        },
        "status": "Running",
    }


@app.post("/chat/")
async def chat(message: Message):
    # Log the incoming payload
    logging.info(f"Received payload: {message}")

    # Validate the input payload
    if not message.message.strip():
        raise HTTPException(status_code=422, detail="Message content cannot be empty")

    session_id = message.session_id
    user_message = message.message

    # Retrieve or create session history
    if session_id not in sessions:
        sessions[session_id] = []

    # Append user message
    sessions[session_id].append({"role": "human", "content": user_message})

    # Generate response
    context = sessions[session_id][-10:]  # Limit to the last 10 messages
    try:
        response = llm.invoke(context)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LLM error: {str(e)}")

    bot_response = {"role": "assistant", "content": response.content}
    sessions[session_id].append(bot_response)

    return {"response": response.content, "history": sessions[session_id]}


@app.get("/chat/{session_id}/")
async def get_history(session_id: str):
    # Log session history requests
    logging.info(f"Fetching history for session_id: {session_id}")
    return sessions.get(session_id, [])
