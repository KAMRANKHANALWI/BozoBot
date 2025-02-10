# BozoBot: LLM-Powered Chat Application

🚀 A full-fledged **LLM-powered chatbot** application built with **React (Frontend)** and **FastAPI (Backend)**, leveraging **Groq's Llama 3.3-70B Versatile** for AI-driven conversations.

---

## 📌 Overview
This project is a fully functional chatbot web application where users can engage in AI-powered conversations. The **React frontend** provides a sleek chat interface, while the **FastAPI backend** handles API requests, manages chat sessions, and interacts with the LLM for generating responses.

### 🎯 **Key Features**
✅ **LLM-Powered Chat** – AI-driven conversations using Groq's Llama 3.3-70B Versatile model.
✅ **FastAPI Backend** – High-performance, lightweight API backend.
✅ **React Frontend** – Modern, interactive chat interface.
✅ **Session Management** – Tracks conversation history across sessions.
✅ **CORS Enabled** – Allows smooth frontend-backend communication.
✅ **API Documentation** – Auto-generated Swagger & Redoc UI.
✅ **Scalable Deployment** – Supports Docker, cloud hosting.

---

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/KAMRANKHANALWI/BozoBot.git
cd your-project
```

### 2️⃣ Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate    # Windows
pip install -r requirements.txt
```

#### ➤ Configure Environment Variables
Create a `.env` file in the `backend` folder:
```env
GROQ_API_KEY=your_groq_api_key_here
```

#### ➤ Run the FastAPI Server
```bash
uvicorn main:app --reload
```
- API Base URL: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**
- Swagger Docs: **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**
- Redoc UI: **[http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)**

### 3️⃣ Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev
```
- Frontend URL: **[http://localhost:5173](http://localhost:5173)**

> **Note:** Ensure the FastAPI backend is running before starting the frontend.

---

## 📌 Backend API Documentation

### **Root Endpoint**
- **GET /** – Provides basic info about the API.

### **Chat Endpoints**
- **POST /chat/** – Send a message to the chatbot.
- **GET /chat/{session_id}/** – Retrieve chat history.

Example request to `/chat/`:
```json
{
  "session_id": "12345",
  "message": "Hello!"
}
```

Example response:
```json
{
  "response": "Hello! How can I assist you?",
  "history": [
    { "role": "human", "content": "Hello!" },
    { "role": "assistant", "content": "Hello! How can I assist you?" }
  ]
}
```

---

## 📌 Frontend Functionality
The **React frontend** is responsible for handling user interactions and sending API requests to FastAPI.

### **How `ChatApp.jsx` Works**
- Uses `useState` for managing user messages and chat history.
- `useEffect` initializes a default chat session.
- **Axios** is used to communicate with the FastAPI backend.
- Supports **multiple chat sessions** with a sidebar for easy navigation.

Example function to send a message:
```jsx
const sendMessage = async () => {
  if (!input.trim()) return;
  setLoading(true);

  try {
    const response = await axios.post("http://127.0.0.1:8000/chat/", {
      session_id: activeChat,
      message: input,
    });

    setMessages([...messages, { role: "human", content: input }, response.data.response]);
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    setLoading(false);
    setInput("");
  }
};
```

---

## 🚀 Deployment Guide

### **Deploy Backend with Docker**
1. Create a `Dockerfile` in the backend folder:
```dockerfile
FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```
2. Build and Run:
```bash
docker build -t fastapi-backend .
docker run -p 8000:8000 fastapi-backend
```

### **Deploy Frontend with Vercel**
1. Install Vercel CLI:
```bash
npm install -g vercel
```
2. Deploy:
```bash
vercel
```

---

## 🛠 Tech Stack
- **Frontend**: React, Vite, Axios
- **Backend**: FastAPI, Pydantic, Uvicorn
- **AI Model**: Groq Llama-3.3-70B
- **State Management**: React Hooks
- **Networking**: Axios, CORS Middleware
- **Hosting**: Vercel (Frontend), Docker (Backend)

---

## 💡 Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

## ✨ Acknowledgments
- **FastAPI** for the backend framework.
- **React** for the frontend UI.
- **Groq AI** for powering chatbot responses.

🚀 **Enjoy building AI-powered apps with FastAPI and React!**

