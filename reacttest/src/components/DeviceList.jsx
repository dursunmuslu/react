import React, { useEffect, useState } from 'react';
import { fetchDevices, saveDevice } from '../apiService'; // API servisleri

const DeviceList = ({ onSelectDevice }) => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newDevice, setNewDevice] = useState({
        deviceAdi: '',
        username: '',
        password: '',
        host: ''
    });

    useEffect(() => {
        const getDevices = async () => {
            try {
                const data = await fetchDevices();
                console.log('Fetched devices:', data); // Veriyi kontrol edin
                setDevices(data); // `data`'yı dizi olarak ayarlayın
                setLoading(false);
            } catch (error) {
                setError('Cihazlar yüklenirken bir hata oluştu.');
                setLoading(false);
                console.error('Error fetching devices:', error);
            }
        };

        getDevices(); // İç işlevi çağırma
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDevice({
            ...newDevice,
            [name]: value
        });
    };

    const handleAddDevice = async (e) => {
        e.preventDefault();
        try {
            await saveDevice(newDevice);
            setNewDevice({
                deviceAdi: '',
                username: '',
                password: '',
                host: ''
            });
            // Cihaz listesini tekrar yükle
            const updatedDevices = await fetchDevices();
            setDevices(updatedDevices);
        } catch (error) {
            console.error('Error saving device:', error);
            setError('Cihaz eklenirken bir hata oluştu.');
        }
    };

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <h2>Cihaz Listesi</h2>
            {devices.length === 0 ? (
                <p>Herhangi bir cihaz bulunamadı.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Host</th>
                        <th>Cihaz Adı</th>
                        <th>Kullanıcı Adı</th>
                        <th>Şifre</th>
                        <th>Seç</th>
                    </tr>
                    </thead>
                    <tbody>
                    {devices.map((device) => (
                        <tr key={device.id}>
                            <td>{device.host}</td>
                            <td>{device.deviceAdi}</td>
                            <td>{device.username}</td>
                            <td>{device.password}</td>
                            <td>
                                <button onClick={() => onSelectDevice(device)}>Seç</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            <div>
                <h2>Yeni Cihaz Ekle</h2>
                <form onSubmit={handleAddDevice}>
                    <label>
                        Cihaz Adı:
                        <input
                            type="text"
                            name="deviceAdi"
                            value={newDevice.deviceAdi}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Kullanıcı Adı:
                        <input
                            type="text"
                            name="username"
                            value={newDevice.username}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Şifre:
                        <input
                            type="password"
                            name="password"
                            value={newDevice.password}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Host:
                        <input
                            type="data"
                            name="host"
                            value={newDevice.host}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit">Ekle</button>
                </form>
            </div>
        </div>
    );
};

export default DeviceList;
