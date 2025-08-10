import React from 'react';

export default function ChatInput({ input, setInput, handleSendMessage }) {
    return (
        <div className="aixops-input-container" style={{ padding: '10px 0 10px 0', borderRadius: '8px' }}>
            <form onSubmit={handleSendMessage} className="d-flex w-100 align-items-center aixops-input-box">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="form-control border-0 bg-transparent"
                    style={{ color: '#002366', border: '1px solid #002366', borderRadius: '20px', padding: '10px 15px' }}
                />
                <button
                    type="submit"
                    className="btn btn-lg ml-2"
                    style={{ backgroundColor: '#002366', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <i className="fas fa-paper-plane" style={{ fontSize: '18px' }}></i>
                </button>
            </form>
        </div>
    );
}