import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const ChatApp = () => {
  const [messages, setMessages] = useState([]); // Current chat messages
  const [input, setInput] = useState(""); // User input
  const [chats, setChats] = useState([]); // All chat sessions
  const [activeChat, setActiveChat] = useState(null); // Active chat session ID
  const [loading, setLoading] = useState(false); // Loading state
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar visibility state
  const chatContainerRef = useRef(null);

  // Initialize default chat session on first render
  useEffect(() => {
    if (chats.length === 0) {
      const defaultChat = {
        id: "default-session",
        title: "Default Chat",
        messages: [],
      };
      setChats([defaultChat]);
      setActiveChat(defaultChat.id); // Set default chat as active
    }
  }, []);

  // Load chats from localStorage on mount
  // useEffect(() => {
  //   const savedChats = localStorage.getItem("chatSessions");
  //   if (savedChats) {
  //     setChats(JSON.parse(savedChats));
  //   }
  // }, []);

  // Save all chats to localStorage whenever chats update
  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(chats));
  }, [chats]);

  // Automatically scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Start a new chat session
  const startNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      messages: [],
    };
    setChats((prev) => [...prev, newChat]);
    setActiveChat(newChat.id);
    setMessages([]);
  };

  // Switch to an existing chat session
  const switchChat = (chatId) => {
    const selectedChat = chats.find((chat) => chat.id === chatId);
    setActiveChat(chatId);
    setMessages(selectedChat?.messages || []);
  };

  // Send a message to the backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    const payload = {
      session_id: activeChat || "default-session",
      message: input.trim(),
    };

    const userMessage = { role: "human", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Update messages in active chat
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );

    setInput(""); // Clear input box
    setLoading(true); // Show loading indicator

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat/", payload);

      const botResponse = {
        role: "assistant",
        content: response.data.response,
      };
      setMessages((prev) => [...prev, botResponse]);

      // Update bot response in active chat
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === activeChat
            ? { ...chat, messages: [...chat.messages, botResponse] }
            : chat
        )
      );
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error: Could not process your request.",
        },
      ]);
    }
    setLoading(false); // Hide loading indicator
  };

  return (
    <div className="flex h-screen bg-[#FAF3E0] relative">
      {/* Sidebar */}
      <aside
        className={`absolute md:relative top-0 left-0 h-full bg-[#FFF6E5] shadow-md border-r transition-transform duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex flex-col h-full p-2">
          {/* Toggle Button */}
          <button
            className="flex items-center justify-center w-full h-10 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg mb-4 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? "➖" : "➕"}
          </button>

          {/* Chats */}
          <button
            onClick={startNewChat}
            className={`flex items-center ${
              sidebarOpen ? "justify-start" : "justify-center"
            } w-full bg-gray-700 text-white py-2 px-4 rounded-lg mb-4 hover:bg-gray-800 transition`}
          >
            {sidebarOpen && <span className="ml-2">+ New Chat</span>}
          </button>

          <div className="space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => switchChat(chat.id)}
                className={`flex items-center ${
                  sidebarOpen ? "justify-start" : "justify-center"
                } p-3 rounded-lg cursor-pointer ${
                  chat.id === activeChat
                    ? "bg-gray-700 text-white"
                    : "bg-white border text-gray-800 hover:bg-gray-200"
                } transition`}
              >
                {sidebarOpen ? (
                  <span className="ml-2">{chat.title}</span>
                ) : (
                  <span className="text-lg">💬</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-[#FFF6E5] text-center p-6 shadow-md">
          <h1 className="text-2xl font-bold text-[#3C3C3C]">
            Hello
          </h1>
          <p className="text-sm text-gray-500">How can I help you today?</p>
        </header>

        {/* Chat Messages */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-4"
          ref={chatContainerRef}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "human" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-xl text-base shadow ${
                  msg.role === "human"
                    ? "bg-[#FFE4C4] text-[#3C3C3C]"
                    : "bg-[#FFF6E5] text-[#3C3C3C] border border-gray-300"
                }`}
              >
                {msg.content}
                {console.log(msg.content)}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#FFF6E5] text-gray-500 px-4 py-3 rounded-xl shadow-md text-sm">
                Thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="bg-white p-6 flex items-center justify-center shadow-md">
          <div className="flex items-center bg-[#F5F5F5] border rounded-xl px-4 py-3 w-full max-w-3xl">
            <textarea
              className="flex-1 bg-transparent border-none outline-none resize-none text-gray-700 text-base placeholder-gray-500"
              rows={1}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage()
              }
            />
            <div className="flex items-center space-x-3 ml-4">
              <button className="text-gray-500 hover:text-gray-700">📎</button>
              <button className="text-gray-500 hover:text-gray-700">📷</button>
              <button
                className="bg-[#C45D32] text-white px-4 py-2 rounded-full hover:bg-[#A04528] transition"
                onClick={sendMessage}
              >
                ⬆
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
