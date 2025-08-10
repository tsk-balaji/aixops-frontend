import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatJson({ data }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2))
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => console.error('Failed to copy:', err));
    };

    return (
        <div className="aixops-chat-json mt-4">
            <div className="code-container">
                <div className="copy-button-container">
                    <button
                        className="btn btn-outline-secondary copy-button"
                        onClick={handleCopy}
                        title={copied ? 'Copied!' : 'Copy to clipboard'}
                    >
                        <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
                    </button>
                </div>
                <SyntaxHighlighter language="json" style={vscDarkPlus}>
                    {JSON.stringify(data, null, 2)}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}