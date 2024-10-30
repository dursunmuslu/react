import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CommandForm from './components/CommandForm';
import DeviceCommandPage from './pages/DeviceCommandPage';
import LoginForm from './components/LoginForm';
import Header from './Header.jsx';

const App = () => {
    return (
        <Router>
            <Header /> {/* Menü buraya eklendi */}
            <div>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/command" element={<CommandForm />} />
                    <Route path="/devices-commands" element={<DeviceCommandPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
