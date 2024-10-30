import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBar from './ErrorBar';
import '../App.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showSaveForm, setShowSaveForm] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (loginDto) => {
        try {
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginDto),
            });

            if (response.ok) {
                const responseText = await response.text();
                let token;
                try {
                    const data = JSON.parse(responseText);
                    token = data.token;
                } catch (e) {
                    token = responseText;
                }

                localStorage.setItem('authToken', token); // Token'ı saklıyoruz
                localStorage.setItem('currentUser', loginDto.username); // Kullanıcı adını saklıyoruz
                console.log('Token stored:', token);
                navigate('/command'); // "/command" sayfasına yönlendiriyoruz
            } else {
                const errorText = await response.text();
                setError(`HTTP Error: ${response.status} ${response.statusText} - ${errorText}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again.');
        }
    };

    const handleSaveLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/users/saveLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('Login information saved successfully.');
            } else {
                const errorText = await response.text();
                setError(`HTTP Error: ${response.status} ${response.statusText} - ${errorText}`);
            }
            navigate('/command');

        } catch (error) {
            console.error('Error during save login:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="cardLogin">
                <div className="button-container">
                    <button onClick={() => setShowSaveForm(false)}>Login</button>
                    <button onClick={() => setShowSaveForm(true)}>Register</button>
                </div>

                {!showSaveForm ? (
                    <div>
                        <h1>Login</h1>
                        <form onSubmit={(e) => { e.preventDefault(); handleLogin({ username, password }); }}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Login</button>
                            <ErrorBar message={error} />
                        </form>
                    </div>
                ) : (
                    <div>
                        <h1>Register</h1>
                        <form onSubmit={handleSaveLogin}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Register</button>
                            <ErrorBar message={error} />
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginForm;
