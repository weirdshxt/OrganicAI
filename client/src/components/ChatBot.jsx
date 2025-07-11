import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import logo from "../assets/logo.gif";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const BOT_NAME = "AgriBot";

const initialMessages = [
  { sender: BOT_NAME, text: "Hello!" },
  { sender: BOT_NAME, text: "Ask me anything about organic farming :)" },
];

export default function ChatBot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [useGemini, setUseGemini] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const hasInitialized = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // GSAP animations
  useGSAP(() => {
    // Input area animation
    gsap.from(inputRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  // Animate initial messages
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const animateInitialMessages = async () => {
      for (let i = 0; i < initialMessages.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setMessages((prev) => [...prev, initialMessages[i]]);
      }
    };

    animateInitialMessages();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "You", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
        message: input,
        useGemini,
      });
      setMessages((msgs) => [
        ...msgs,
        { sender: BOT_NAME, text: res.data.reply },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: BOT_NAME, text: "Sorry, something went wrong." },
      ]);
    }
    setLoading(false);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-screen bg-[#0c0c0c] overflow-hidden">
      <Navbar useGemini={useGemini} setUseGemini={setUseGemini} />
      <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
        <div className="flex-1"></div>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "You" ? "justify-end" : "justify-start"
            } animate-fade-in-up`}
            style={{
              animationDelay: `${i * 0.1}s`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs sm:max-w-[50%] text-xl
                ${msg.sender === "You" ? "text-right" : ""}`}
            >
              {/* <span className="block font-semibold mb-1">{msg.sender}</span> */}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 max-w-xs text-sm animate-pulse">
              <div className="block font-semibold overflow-hidden mb-1">
                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
              </div>
              Typing...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div ref={inputRef} className="flex items-center bg-black p-4 gap-2">
        <input
          type="text"
          className="flex-1 px-4 sm:px-8 py-4 text-sm focus:outline-none bg-black text-white"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 disabled:opacity-50 hover:text-purple-700 transition-colors"
          disabled={loading || !input.trim()}
        >
          Send |
        </button>
      </div>
    </div>
  );
}
