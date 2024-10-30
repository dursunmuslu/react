import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { executeCommand } from '../apiService';
import CommandOutput from "../CommandOutput.jsx";
import '../App.css';

const CommandForm = () => {
    const [deviceAdi, setDeviceAdi] = useState('');
    const [host, setHost] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [command, setCommand] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(''); // Aktif kullanıcı adını tutmak için state
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('currentUser');
        if (storedUsername) {
            setCurrentUser(storedUsername);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const commandData = { deviceAdi, host, username, password, command, currentUser };
            const response = await executeCommand(commandData);
            console.log('API Response:', response);
            setResult(response);
            setError('');
        } catch (err) {
            setError('Komut çalıştırılamadı.');
            setResult('');
        }
    };

    const handleQuickCommand = () => {
        navigate('/devices-commands');
    };

    return (
        <div className="command-form-container">
            <div className="top-bar">
                <div className="welcome-message">Hoş geldiniz, {currentUser}</div>
            </div>
            <div className="card">
                <h2>SSH Komut Formu</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="deviceAdi">Cihaz Adı:</label>
                    <input
                        id="deviceAdi"
                        type="text"
                        value={deviceAdi}
                        onChange={(e) => setDeviceAdi(e.target.value)}
                        required
                    />
                    <label htmlFor="host">Host:</label>
                    <input
                        id="host"
                        type="text"
                        value={host}
                        onChange={(e) => setHost(e.target.value)}
                        required
                    />
                    <label htmlFor="username">Kullanıcı Adı:</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Şifre:</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="command">Komut:</label>
                    <input
                        id="command"
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        required
                    />
                    <button type="submit">Komutu Gönder</button>
                </form>
                {result && <CommandOutput output={result} />}
                {error && <div className="error">{error}</div>}

                <button className="quick-command-button" onClick={handleQuickCommand}>
                    Hızlı Komut
                </button>
            </div>
        </div>
    );
};

export default CommandForm;
