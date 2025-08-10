import React from 'react';
import ChatInput from './ChatInput';

export default function InitialScreen({ suggestedPrompts, handleSendMessage, input, setInput }) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 p-4 text-center">
            <div className="mb-5">
                <h1 className="display-4 font-weight-bold mb-2">Hello, User.</h1>
                <p className="text-muted h4">How can I help you today?</p>
            </div>
            <div className="d-flex flex-wrap justify-content-center w-100" style={{ maxWidth: '800px' }}>
                {suggestedPrompts.map((prompt, index) => (
                    <button
                        key={index}
                        className="btn btn-outline-secondary m-2 p-3 text-left shadow-sm rounded-lg"
                        onClick={() => setInput(prompt)}
                        style={{ minWidth: '45%' }}
                    >
                        {prompt}
                    </button>
                ))}
            </div>
            <div className="aixops-input-container mt-5">
                <ChatInput input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}