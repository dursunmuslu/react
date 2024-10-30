import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Menü stil dosyası (isteğe bağlı)

const Header = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="/">Giriş</Link></li>
                    <li><Link to="/command">Komut Gönder</Link></li>
                    <li><Link to="/devices-commands">Cihazlar ve Komutlar</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
