import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../styles/custom.css';
import ChatMessage from '../ChatMessage';
import Sidebar from '../Sidebar';
import Header from '../Header';
import ChatInput from '../ChatInput';
import InitialScreen from '../InitialScreen';
import responseData from '../../stub/response.json';
import botLogo from '../../assets/AIXOPS_Logo.png';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [stubResponseIndex, setStubResponseIndex] = useState(0);

  const [chatHistory, setChatHistory] = useState([
    { id: 'chat-1', title: 'Check on trade-in order #56789' },
    { id: 'chat-2', title: 'Suspicious high-value transaction' },
    { id: 'chat-3', title: 'Shipping status for order #12345' },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e, quickChatPrompt = null) => {
    e.preventDefault();

    const messageText = quickChatPrompt || input;
    if (!messageText.trim()) return;

    if (!hasStartedChat) {
      setHasStartedChat(true);
      const newChatId = `chat-${Date.now()}`;
      const newChatTitle = messageText.length > 30 ? `${messageText.substring(0, 30)}...` : messageText;
      setChatHistory(prevHistory => [{ id: newChatId, title: newChatTitle }, ...prevHistory]);
    }

    const newUserMessage = {
      sender: 'user',
      content: { type: 'text', data: messageText },
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);

    if (!quickChatPrompt) {
      setInput('');
    }

    const loadingMessage = { sender: 'bot', content: { type: 'text', data: 'Thinking...' } };
    setMessages(prevMessages => [...prevMessages, loadingMessage]);

    await new Promise(resolve => setTimeout(resolve, 500));

    if (stubResponseIndex >= responseData.output.length) {
      const noMoreMessages = { sender: 'bot', content: { type: 'text', data: 'No more responses in the stub data.' } };
      setMessages(prevMessages => prevMessages.slice(0, -1).concat(noMoreMessages));
      return;
    }

    const stubResponse = responseData.output[stubResponseIndex];

    setMessages(prevMessages => {
      const updatedMessages = prevMessages.slice(0, -1);
      const combinedBotMessage = {
        sender: 'bot',
        content: {
          text: stubResponse.text,
          data: stubResponse.data,
        },
      };
      return [...updatedMessages, combinedBotMessage];
    });

    setStubResponseIndex(prevIndex => prevIndex + 1);
  };

  const handleNewChat = () => {
    setMessages([]);
    setInput('');
    setHasStartedChat(false);
    setStubResponseIndex(0);
  };

  const suggestedPrompts = [
    'Check order status for 12345-A',
    'Explain the recent fraud alert',
    'What is the trade-in value for an iPhone 13?',
    'Show me the available carrier services',
  ];

  return (
    <div className="d-flex flex-column vh-100">
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
      <div className="d-flex flex-grow-1" style={{ paddingTop: '56px' }}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          handleNewChat={handleNewChat}
          chatHistory={chatHistory}
        />
        <div className="d-flex flex-grow-1 bg-light chat-content">
          {hasStartedChat ? (
            <div className="d-flex flex-column flex-grow-1 position-relative" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div className="flex-grow-1 overflow-auto pt-4 pb-5 px-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`aixops-message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
                  >
                    {msg.sender === 'bot' && (
                      <img
                        src={botLogo}
                        alt="Bot Logo"
                        className="rounded-circle me-2"
                        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                      />
                    )}
                    <div className="message-content w-100">
                      <ChatMessage msg={msg} />
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <ChatInput input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
            </div>
          ) : (
            <InitialScreen
              suggestedPrompts={suggestedPrompts}
              handleSendMessage={handleSendMessage}
              input={input}
              setInput={setInput}
            />
          )}
        </div>
      </div>
    </div>
  );
}