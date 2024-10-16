import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import React, { useState, useEffect, useRef } from "react";
import { IoClose, IoReload } from "react-icons/io5";
import { BsFillSendFill } from "react-icons/bs";
import useAuth from "../../../../../../hooks/useAuth";
import { FaMicrophone } from "react-icons/fa";

const ChatBot = ({ onClose }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [file, setFile] = useState(null); // State for media files
  const [isListening, setIsListening] = useState(false); // Voice search state
  const chatEndRef = useRef(null);
  const { user } = useAuth();
  const recognitionRef = useRef(null); // Ref for speech recognition

  // Initialize Google Generative AI and File Manager
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMENI_API_KEY);
  const fileManager = new GoogleAIFileManager(import.meta.env.VITE_GEMENI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Add an initial greeting when component mounts
  useEffect(() => {
    const initialGreeting = {
      sender: "bot",
      text: `Hello, ${user?.userName || "there"}! How can I assist you today?`,
      time: new Date().toLocaleTimeString(),
    };
    setChatHistory([initialGreeting]);
  }, [user]);

  // Handle file upload for media summarization
  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Upload the file using GoogleAIFileManager
    const uploadResponse = await fileManager.uploadFile(uploadedFile, {
      mimeType: uploadedFile.type,
      displayName: uploadedFile.name,
    });

    // Generate content using the uploaded file
    if (uploadedFile.type.startsWith("image/")) {
      await summarizeImage(uploadResponse.file); // Call summarizeImage for images
    } else if (uploadedFile.type === "application/pdf") {
      await summarizeFile(uploadResponse.file); // Call summarizeFile for PDFs
    } else {
      // Handle unsupported file types
      console.error("Unsupported file type:", uploadedFile.type);
    }
  };

  // Function to summarize uploaded PDFs using Gemini model
  const summarizeFile = async (fileData) => {
    try {
      // Generate content using the file URI
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: fileData.mimeType,
            fileUri: fileData.uri,
          },
        },
        { text: "Can you summarize this document as a bulleted list?" },
      ]);

      const botMessage = {
        sender: "bot",
        text: result.response.text(),
        time: new Date().toLocaleTimeString(),
      };

      setChatHistory((prevChatHistory) => [...prevChatHistory, botMessage]);
    } catch (err) {
      console.error("Error during file summarization:", err);
    }
  };

  // Function to summarize uploaded images using Gemini model
  const summarizeImage = async (fileData) => {
    try {
      // Generate content using the image URI
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: fileData.mimeType,
            fileUri: fileData.uri,
          },
        },
        { text: "Describe this image in detail." }, // Provide a descriptive prompt
      ]);

      const botMessage = {
        sender: "bot",
        text: result.response.text(),
        time: new Date().toLocaleTimeString(),
      };

      setChatHistory((prevChatHistory) => [...prevChatHistory, botMessage]);
    } catch (err) {
      console.error("Error during image summarization:", err);
    }
  };

  // Voice search using Web Speech API
  const startVoiceRecognition = () => {
    if (!recognitionRef.current) {
      recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = async (event) => {
        const speechToText = event.results[0][0].transcript;
        setUserInput(speechToText);
        await sendMessage(speechToText); // Send the transcribed speech as the user's message
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if (!isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      setIsListening(false);
      recognitionRef.current.stop();
    }
  };

  // Function to send messages (text or voice)
  const sendMessage = async (message = userInput) => {
    if (!message.trim()) return;

    const newUserMessage = {
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString(),
    };
    setChatHistory((prevChatHistory) => [...prevChatHistory, newUserMessage]);
    setUserInput("");

    try {
      // Use Gemini to generate the response
      const response = await model.generateContent(message);
      const botResponse = await response.response.text();

      const newBotMessage = {
        sender: "bot",
        text: botResponse,
        time: new Date().toLocaleTimeString(),
      };
      setChatHistory((prevChatHistory) => [...prevChatHistory, newBotMessage]);
    } catch (err) {
      console.error("Error during Gemini request:", err);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Auto-scroll to the bottom of the chat when a new message is added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  // Function to clear chat history
  const clearChatHistory = () => {
    setChatHistory([]); // Reset chat history to empty array
  };

  return (
    <div className="chat-bot-container flex flex-col min-h-[500px] max-h-[600px] left-8 md:left-0 border border-primary p-3 rounded-lg relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <img src="/src/assets/images/chatBot.png" alt="ChatBot" className="w-14 h-14" />
        <div className="flex justify-center items-center space-x-1">
          <button onClick={clearChatHistory} className="btn btn-sm btn-ghost">
            <IoReload className="text-white hover:bg-gray-300 text-xl bg-blue-500 rounded-full p-1" />
          </button>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            <IoClose className="text-white hover:bg-gray-300 text-xl bg-red-500 rounded-full p-1" />
          </button>
        </div>
      </div>

      {/* Chat History */}
      <div className="chat-history flex-1 overflow-y-auto mb-3">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={chat.sender === "user" ? "user-message text-right mb-2" : "bot-message text-left mb-2"}
          >
            <div className={chat.sender === "user" ? "bg-blue-500 text-white p-2 rounded-lg inline-block" : "bg-gray-200 text-black p-2 rounded-lg inline-block"}>
              <span>{chat.text}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">{chat.time}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-container border-2 p-2 rounded-lg border-primary">
        <div className="flex gap-1 items-center">
          <input
            type="text"
            value={userInput}
            onChange={handleChange}
            onKeyDownCapture={handleKeyPress}
            placeholder="Type your message here..."
            className="input input-solid-primary p-2 flex-1"
          />
          <button onClick={sendMessage} className="btn btn-outline-primary">
            <BsFillSendFill className="text-xl" />
          </button>
          <button onClick={startVoiceRecognition} className={`btn ${isListening ? "btn-solid-error" : "btn-outline-error"}`}>
            <FaMicrophone className="text-xl" />
          </button>
        </div>
      </div>

      {/* File input for media summarization */}
      {/* <div className="file-upload mt-3">
        <label htmlFor="file-upload" className="btn btn-outline-primary">Upload Media for Summarization</label>
        <input
          id="file-upload"
          type="file"
          accept=".pdf,.jpg,.png,.mp4,.mp3"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div> */}
    </div>
  );
};

export default ChatBot;