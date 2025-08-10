import React from 'react';

export default function Header({ isSidebarOpen, setIsSidebarOpen }) {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <button className="btn btn-light d-none d-lg-block mr-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <i className={`fas ${isSidebarOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                    </button>
                    <button className="btn btn-light d-lg-none mr-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <a className="navbar-brand font-weight-bold h4 mb-0" href="#">
                        <span className="text-primary">AI</span>X<span className="text-dark">OPS</span>
                    </a>
                </div>
                <div className="d-flex align-items-center">
                    <span className="text-muted d-none d-sm-block mr-2">Balaji</span>
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        B
                    </div>
                </div>
            </div>
        </header>
    );
}