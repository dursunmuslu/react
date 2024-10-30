// src/components/ErrorBar.jsx
import React from 'react';

const ErrorBar = ({ error }) => {
    if (!error) return null;

    return (
        <div style={{ color: 'red', fontWeight: 'bold' }}>
            {error}
        </div>
    );
};

export default ErrorBar;
