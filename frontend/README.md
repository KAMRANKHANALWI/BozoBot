# FastAPI Chatbot Frontend

🚀 A React-based frontend for the FastAPI-powered chatbot. This frontend provides an interactive chat interface, allowing users to send messages to the backend and receive AI-generated responses.

---

## 🎯 Features

✅ **React-powered UI** – A clean and responsive chat interface.
✅ **FastAPI Integration** – Connects seamlessly with the FastAPI backend.
✅ **Session Management** – Supports multiple chat sessions.
✅ **State Management** – Uses React Hooks (`useState`, `useEffect`).
✅ **Axios for API Calls** – Handles HTTP requests to the backend.
✅ **Dynamic Sidebar** – Displays previous chat sessions.

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-frontend-repository.git
cd your-frontend-repository
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Development Server

```bash
npm run dev
```

The frontend will be available at: [http://localhost:5173](http://localhost:5173)

> **Note:** Make sure your FastAPI backend is running at `http://127.0.0.1:8000`.

---

## 📌 How `ChatApp.jsx` Works

### **1️⃣ State Management**

```jsx
const [messages, setMessages] = useState([]); // Current chat messages
const [input, setInput] = useState(""); // User input
const [chats, setChats] = useState([]); // All chat sessions
const [activeChat, setActiveChat] = useState(null); // Active chat session ID
const [loading, setLoading] = useState(false); // Loading state
const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar visibility
```

- Stores chat messages, user input, session history, and UI states.

### **2️⃣ Default Chat Session Setup (`useEffect`)**

```jsx
useEffect(() => {
  if (chats.length === 0) {
    const defaultChat = {
      id: "default-session",
      title: "Default Chat",
      messages: [],
    };
    setChats([defaultChat]);
    setActiveChat(defaultChat.id);
  }
}, []);
```

- Creates a **default chat session** on first load.

### **3️⃣ Sending Messages to FastAPI**

```jsx
const sendMessage = async () => {
  if (!input.trim()) return;

  setLoading(true);
  const userMessage = { role: "human", content: input };

  try {
    const response = await axios.post("http://127.0.0.1:8000/chat/", {
      session_id: activeChat,
      message: input,
    });

    setMessages([...messages, userMessage, response.data.response]);
  } catch (error) {
    console.error("Error sending message:", error);
  } finally {
    setLoading(false);
    setInput("");
  }
};
```

- Sends the user message to **FastAPI (`/chat/`)**.
- Receives **AI-generated response** and updates chat history.

### **4️⃣ Storing Messages & Sessions**

- Stores chat history in `messages` state.
- Supports **multiple chat sessions** and displays them in a sidebar.

---

## 🌎 Connecting to FastAPI Backend

- Ensure the FastAPI backend is running (`http://127.0.0.1:8000`).
- The chatbot will communicate with the backend via API calls.

---

## 💡 Contributing

1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your branch.
5. Open a Pull Request.

---

🚀 **Enjoy building with React and FastAPI!**
