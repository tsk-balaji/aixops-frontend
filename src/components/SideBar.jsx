import React, { useState } from 'react';

export default function Sidebar({ isSidebarOpen, handleNewChat, chatHistory, handleClearHistory }) {
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
    const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);
    const chatCategories = ['Carrier Service', 'Exchange Service', 'Fraud Service', 'General Queries'];

    return (
        <aside className={`bg-white shadow-lg d-flex flex-column h-100 sidebar ${isSidebarOpen ? 'w-25' : 'sidebar-closed'}`}>
            <div className="p-3 d-flex flex-column h-100">
                <button className="btn btn-primary btn-block mb-3" onClick={handleNewChat}>
                    <i className="fas fa-plus mr-2"></i>New Chat
                </button>
                <div className="flex-grow-1 overflow-auto">
                    <div className="mb-4">
                        <button
                            onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                            className="btn btn-light d-flex justify-content-between align-items-center w-100 text-left font-weight-bold h6"
                        >
                            Chat Categories
                            <i className={`fas fa-chevron-down ${isCategoriesExpanded ? '' : 'rotate-90'}`}></i>
                        </button>
                        {isCategoriesExpanded && (
                            <div className="list-group mt-2">
                                {chatCategories.map(cat => (
                                    <button key={cat} className="list-group-item list-group-item-action border-0">{cat}</button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                            className="btn btn-light d-flex justify-content-between align-items-center w-100 text-left font-weight-bold h6"
                        >
                            Chat History
                            <i className={`fas fa-chevron-down ${isHistoryExpanded ? '' : 'rotate-90'}`}></i>
                        </button>
                        {isHistoryExpanded && (
                            <div className="list-group mt-2">
                                {chatHistory.map(chat => (
                                    <button key={chat.id} className="list-group-item list-group-item-action text-truncate border-0">{chat.title}</button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <button className="btn btn-danger btn-block mt-4" onClick={handleClearHistory}>
                    <i className="fas fa-trash-alt mr-2"></i>Clear All History
                </button>
            </div>
        </aside>
    );
}