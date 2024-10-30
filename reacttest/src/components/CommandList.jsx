import React, { useState } from 'react';
import '../App.css'; // Stil dosyanızı burada import edin

const CommandList = ({ commands, onSelectCommand }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCommand, setSelectedCommand] = useState(null); // State değişkeni burada tanımlanıyor

    // Dropdown menüsünü açıp kapama işlevi
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Komutu seçme işlevi
    const handleSelect = (command) => {
        setSelectedCommand(command); // State güncelleme
        onSelectCommand(command);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={toggleDropdown}>
                {selectedCommand ? selectedCommand.commondName : 'Komut Seç'}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {commands.map((command) => (
                        <div
                            key={command.id}
                            className="dropdown-item"
                            onClick={() => handleSelect(command)}
                        >
                            {command.commondName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommandList;
