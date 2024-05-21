import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/login', { id, password });
            const user = response.data;

            if (user.rol === 'ADM') {
                navigate('/admin-profile');
            } else if (user.rol === 'PRO') {
                navigate(`/profile-proveedor/${id}`);
            }
        } catch (error) {
            console.error('Error al iniciar sesión', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    ID:
                    <input type="text" value={id} onChange={e => setId(e.target.value)} />
                </label>
                <label>
                    Contraseña:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <input type="submit" value="Iniciar sesión" />
            </form>
            <Link to="/save-proveedor">Registrarse</Link>
        </div>
    );
};

export default Login;