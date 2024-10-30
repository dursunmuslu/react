import axios from "axios";

const getToken = () => {
    // Token'ı localStorage'dan ya da başka bir yerden alabilirsiniz
    return localStorage.getItem('authToken');
};

export const executeCommand = async (commandData) => {
    const token = getToken();

    if (!token) {
        throw new Error('Authentication token not found');
    }

    try {
        const response = await fetch('http://localhost:8080/api/ssh/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(commandData), // Send commandData as JSON
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json(); // Process JSON response
        } else {
            return await response.text(); // Process plain text response
        }
    } catch (error) {
        console.error('Error executing command:', error.message);
        throw new Error('Error executing command: ' + error.message);
    }
};


export const fetchCommands = async () => {

    const token = getToken();

    if (!token) {
        throw new Error('Authentication token not found');
    }

    try {
        const response = await fetch('http://localhost:8080/commands/getCommands', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        });

        // Yanıtın JSON olup olmadığını kontrol edin
        const contentType = response.headers.get('Content-Type');
        let data;

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (response.ok) {
            return data;
        } else {
            const errorText = typeof data === 'string' ? data : (data.message || 'An unknown error occurred');
            console.error(`Error response: ${errorText}`);
            throw new Error(`Error fetching commands: ${errorText}`);
        }
    } catch (error) {
        console.error('API call error:', error.message);
        throw new Error('API call error: ' + error.message);
    }
};


export const fetchDevices = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        throw new Error('Authentication token not found');
    }

    try {
        const response = await fetch('http://localhost:8080/credentials/getCredential', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // Yanıtın JSON olup olmadığını kontrol edin
        const contentType = response.headers.get('Content-Type');
        let data;

        if (contentType && contentType.includes('application/json')) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (response.ok) {
            // Verinin dizi olup olmadığını kontrol edin
            if (Array.isArray(data)) {
                return data;
            } else {
                throw new Error('Fetched data is not an array');
            }
        } else {
            const errorText = typeof data === 'string' ? data : (data.message || 'An unknown error occurred');
            console.error(`Error response: ${errorText}`);
            throw new Error(`Error fetching devices: ${errorText}`);
        }
    } catch (error) {
        console.error('API call error:', error.message);
        throw new Error('API call error: ' + error.message);
    }
};


// apiService.js

export const saveDevice = async (deviceData) => {
    const token = getToken();

    if (!token) {
        throw new Error('Authentication token not found');
    }

    try {
        const response = await fetch('http://localhost:8080/credentials/saveDevice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(deviceData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Network response was not ok: ${errorText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        console.error('Error saving device:', error.message);
        throw new Error('Error saving device: ' + error.message);
    }
};

