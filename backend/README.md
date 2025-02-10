# FastAPI Chatbot Backend

🚀 A FastAPI-powered chatbot backend that integrates with the **Groq LLM (Llama 3.3-70B Versatile)** to provide conversational AI capabilities. This backend supports **session-based chat history**, CORS for frontend integration, and structured API endpoints for seamless communication.

## Features

🚀 **FastAPI-Powered**: Blazing fast, modern web framework for seamless API performance.
🧠 **Groq LLM Brilliance**: Harnesses the intelligence of Llama-3.3-70B for dynamic chatbot interactions.
💬 **Persistent Conversations**: Keeps session-based chat history intact for meaningful interactions.
🌍 **CORS-Ready**: Fully optimized for frontend integrations, supporting React, Vue, and Next.js.
📊 **Smart Logging**: Tracks request payloads for improved debugging and performance monitoring.
🔑 **Secure & Configurable**: Environment variables (`.env`) ensure secure API key management.

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

### 2️⃣ Create a Virtual Environment (Optional but Recommended)

```bash
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate    # Windows
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### 5️⃣ Run the FastAPI Server

```bash
uvicorn main:app --reload
```

The API will be accessible at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 📌 API Documentation

FastAPI automatically generates interactive API docs at:

- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Redoc UI**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

### **Available API Endpoints**

#### **1️⃣ Root Endpoint**

- **URL**: `GET /`
- **Description**: Provides information about the API.
- **Response Example**:

```json
{
  "message": "Welcome to the FastAPI Chatbot Backend!",
  "description": "This API allows users to interact with a chatbot powered by Groq LLM.",
  "endpoints": {
    "POST /chat/": "Send a message and receive a chatbot response.",
    "GET /chat/{session_id}/": "Retrieve chat history for a given session."
  },
  "status": "Running"
}
```

#### **2️⃣ Chat Endpoint**

- **URL**: `POST /chat/`
- **Description**: Sends a user message to the chatbot and gets a response.
- **Request Body**:

```json
{
  "session_id": "12345",
  "message": "Hello, how are you?"
}
```

- **Response Example**:

```json
{
  "response": "Hello! How can I assist you today?",
  "history": [
    { "role": "human", "content": "Hello, how are you?" },
    { "role": "assistant", "content": "Hello! How can I assist you today?" }
  ]
}
```

#### **3️⃣ Get Chat History**

- **URL**: `GET /chat/{session_id}/`
- **Description**: Retrieves the chat history for a given session ID.
- **Example**:

```json
[
  { "role": "human", "content": "Hello, how are you?" },
  { "role": "assistant", "content": "Hello! How can I assist you today?" }
]
```

---

## 🔥 Deployment

### **Deploy with Docker** (Optional)

1. Create a `Dockerfile`:

```dockerfile
FROM python:3.9
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

2. Build and Run the Docker Container:

```bash
docker build -t fastapi-chatbot .
docker run -p 8000:8000 fastapi-chatbot
```

### **Deploy on Render / Vercel / AWS**

- You can deploy this API on **Render**, **Vercel**, or **AWS Lambda** by modifying the configurations accordingly.

---

## 🛠 Tech Stack

- **Backend**: FastAPI
- **AI Model**: Groq Llama-3.3-70B
- **Data Handling**: Pydantic, dotenv
- **Server**: Uvicorn
- **Logging**: Python logging module
- **CORS Handling**: FastAPI CORSMiddleware

---

## 💡 Contributing

1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

## ✨ Acknowledgments

Special thanks to:

- **FastAPI** for the awesome framework.
- **Groq** for the AI-powered chatbot capabilities.

---

🚀 **Enjoy building with FastAPI and AI!**
