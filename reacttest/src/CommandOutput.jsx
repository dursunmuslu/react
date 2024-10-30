import React from 'react';
import './App.css'; // CSS dosyasını import edin

const CommandOutput = ({ output }) => {
    return (

        <div className="output-card">
            <h3>Komut Çıktısı</h3>
            <pre className="output-content">{output}</pre>
        </div>
    );
};

export default CommandOutput;
