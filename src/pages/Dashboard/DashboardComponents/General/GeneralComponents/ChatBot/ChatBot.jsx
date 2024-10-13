import { GoogleGenerativeAI } from '@google/generative-ai';
import React, { useState, useEffect, useRef } from 'react';
import { IoClose, IoReload } from 'react-icons/io5';
import useAuth from '../../../../../../hooks/useAuth';
import { BsFillSendFill } from "react-icons/bs";

const ChatBot = ({ onClose }) => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const chatEndRef = useRef(null);  // To auto-scroll to the latest message

    const { user } = useAuth();

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMENI_API_KEY);  // Update your .env with GEMINI_API_KEY
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Handle input change
    const handleChange = (e) => {
        setUserInput(e.target.value);
    };

    useEffect(() => {
        const initChat = async () => {
            try {
                const response = await model.generateContent(`Hello I am ${user?.displayName}`);  // Pass the user's name as the prompt
                const botResponse = response.response.text();
                const welcomeMessage = {
                    sender: 'bot',
                    text: botResponse,
                    time: new Date().toLocaleTimeString(),
                };
                setChatHistory((prevChatHistory) => [...prevChatHistory, welcomeMessage]);
            } catch (err) {
                console.error("Error during Gemini AI request:", err);
                const errorMessage = {
                    sender: 'bot',
                    text: "An error occurred. Please try again.",
                    time: new Date().toLocaleTimeString(),

                };
                setChatHistory((prevChatHistory) => [...prevChatHistory, errorMessage]);
            }
        };
        initChat();
    }, []);

    const sendMessage = async () => {
        if (!userInput.trim()) return;  // Check if the user input is not empty

        // Add user's message to chat history
        const newUserMessage = {
            sender: 'user',
            text: userInput,
            time: new Date().toLocaleTimeString(),
        };
        setChatHistory((prevChatHistory) => [...prevChatHistory, newUserMessage]);
        setUserInput('');  // Clear the input field

        try {
            // Generate content using Gemini AI
            const response = await model.generateContent(userInput);  // Pass the user input as the prompt

            // Get the AI's response
            const botResponse = response.response.text();  // Retrieve the text content from the API response

            const newBotMessage = {
                sender: 'bot',
                text: botResponse,
                time: new Date().toLocaleTimeString(),
            };
            setChatHistory((prevChatHistory) => [...prevChatHistory, newBotMessage]);
        } catch (err) {
            console.error("Error during Gemini AI request:", err);
            const errorMessage = {
                sender: 'bot',
                text: "An error occurred. Please try again.",
                time: new Date().toLocaleTimeString(),
            };
            setChatHistory((prevChatHistory) => [...prevChatHistory, errorMessage]);
        }
    };



    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
        if (e.key === 'Escape') {
            onClose();
        }
    };

    // Auto-scroll to the bottom of the chat when a new message is added
    useEffect((e) => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    // Reload Chat History
    const reloadChat = () => {
        setChatHistory([]);
    };

    return (
        <div className="chat-bot-container flex flex-col min-h-[500px] max-h-[600px] left-8 md:left-0 border border-primary p-3 rounded-lg relative">
            {/* Header with close and reload buttons */}
            <div className="flex justify-between items-center mb-3">
                <img src="/src/assets/images/chatBot.png" alt="ChatBot" className="w-14 h-14" />
                <div className="flex justify-center items-center space-x-1">
                    {/* Reload button */}
                    <button onClick={reloadChat} className="font-bold text-xl text-secondary hover:bg-gray-300 p-2 rounded-full">
                        <IoReload />
                    </button>
                    {/* Close button */}
                    <button onClick={onClose} className="btn btn-sm btn-ghost">
                        <IoClose className='text-white hover:bg-gray-300 text-xl bg-red-500 rounded-full p-1' />
                    </button>
                </div>
            </div>

            {/* Chat History */}
            <div className="chat-history flex-1 overflow-y-auto mb-3">
                {chatHistory.map((chat, index) => (
                    <div
                        key={index}
                        className={chat.sender === 'user' ? 'user-message text-right mb-2' : 'bot-message text-left mb-2'}
                    >
                        <div className={chat.sender === 'user' ? 'bg-blue-500 text-white p-2 rounded-lg inline-block' : 'bg-gray-200 text-black p-2 rounded-lg inline-block'}>
                            <span>{chat.text}</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{chat.time}</div>
                    </div>
                ))}
                {/* Scroll to this div when new messages are added */}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="input-container border-2 p-2 rounded-lg border-primary">
                <div className="flex gap-1">
                    <input
                        type="text"
                        value={userInput}
                        onChange={handleChange}
                        onKeyDownCapture={handleKeyPress} // Call sendMessage when 'Enter' is pressed
                        placeholder="Type your message here..."
                        className="input input-solid-primary p-2 flex-1"
                    />
                    <button onClick={sendMessage} className="btn btn-outline-primary">
                        <BsFillSendFill className='text-xl' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
