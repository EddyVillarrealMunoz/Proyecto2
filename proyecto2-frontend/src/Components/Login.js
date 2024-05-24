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

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('proveedorId', id);

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
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <form onSubmit={handleSubmit}>
                            <h1 className="card-title text-center">Iniciar sesión</h1>
                            <div className="mb-3">
                                <label className="form-label">ID:</label>
                                <input type="text" className="form-control" value={id} onChange={e => setId(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña:</label>
                                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="d-grid gap-2">
                                <input type="submit" className="btn btn-primary" value="Iniciar sesión" />
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <Link to="/save-proveedor" className="btn btn-register">Registrarse</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;