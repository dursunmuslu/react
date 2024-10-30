import React, { useState, useEffect } from 'react';
import { fetchDevices, fetchCommands, executeCommand } from '../apiService';
import DeviceList from '../components/DeviceList';
import CommandList from '../components/CommandList';

const DeviceCommandPage = () => {
    const [devices, setDevices] = useState([]);
    const [commands, setCommands] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [selectedCommand, setSelectedCommand] = useState(null);
    const [commandResult, setCommandResult] = useState('');
    const [deviceLoading, setDeviceLoading] = useState(true);
    const [commandLoading, setCommandLoading] = useState(true);
    const [deviceError, setDeviceError] = useState('');
    const [commandError, setCommandError] = useState('');

    useEffect(() => {
        const getDevices = async () => {
            try {
                const data = await fetchDevices();
                setDevices(data);
                setDeviceLoading(false);
            } catch (error) {
                setDeviceError('Cihazlar yüklenirken bir hata oluştu.');
                setDeviceLoading(false);
            }
        };

        getDevices();
    }, []);

    useEffect(() => {
        const getCommands = async () => {
            try {
                const data = await fetchCommands();
                setCommands(data);
                setCommandLoading(false);
            } catch (error) {
                setCommandError('Komutlar yüklenirken bir hata oluştu.');
                setCommandLoading(false);
            }
        };

        getCommands();
    }, []);

    const handleSelectDevice = (device) => {
        setSelectedDevice(device);
    };

    const handleSelectCommand = (command) => {
        setSelectedCommand(command);
    };

    const handleExecuteCommand = async () => {
        if (selectedDevice && selectedCommand) {
            const requestBody = {
                deviceAdi: selectedDevice.deviceAdi,
                host: selectedDevice.host,         // Host burada doğru yerde
                username: selectedDevice.username,
                password: selectedDevice.password,
                command: selectedCommand.commondName,
            };

            try {
                const result = await executeCommand(requestBody);
                setCommandResult(result); // Komut sonucunu state'e kaydet
            } catch (error) {
                setCommandResult('Komut çalıştırılırken bir hata oluştu.');
            }
        } else {
            console.log('Lütfen bir cihaz ve komut seçin.');
        }
    };

    return (
        <div>
            <h1>Cihazlar ve Komutlar</h1>

            {deviceLoading ? (
                <p>Cihazlar yükleniyor...</p>
            ) : deviceError ? (
                <p className="error">{deviceError}</p>
            ) : (
                <DeviceList devices={devices} onSelectDevice={handleSelectDevice} />
            )}

            {commandLoading ? (
                <p>Komutlar yükleniyor...</p>
            ) : commandError ? (
                <p className="error">{commandError}</p>
            ) : (
                <CommandList commands={commands} onSelectCommand={handleSelectCommand} />
            )}

            <button onClick={handleExecuteCommand} disabled={!selectedDevice || !selectedCommand}>
                SSH Komutunu Çalıştır
            </button>

            {selectedDevice && (
                <div>
                    <h2>Seçilen Cihaz Bilgileri</h2>
                    <p><strong>Device Adı:</strong> {selectedDevice.deviceAdi}</p>
                    <p><strong>Username:</strong> {selectedDevice.username}</p>
                    <p><strong>Password:</strong> {selectedDevice.password}</p>
                    <p><strong>Host:</strong> {selectedDevice.host}</p>
                </div>
            )}

            {selectedCommand && (
                <div>
                    <h2>Seçilen Komut</h2>
                    <p><strong>Komut Adı:</strong> {selectedCommand.commondName}</p>
                </div>
            )}

            {commandResult && (
                <div>
                    <h2>Komut Sonucu</h2>
                    <pre>{commandResult}</pre>
                </div>
            )}
        </div>
    );
};

export default DeviceCommandPage;
