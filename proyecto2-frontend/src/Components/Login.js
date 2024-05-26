import React, {useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import Alert from 'react-bootstrap/Alert'; // Importa el componente Alert de Bootstrap

export const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false); // Nuevo estado para manejar la visibilidad de la alerta
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/v1/login', {id, password});
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
            setErrorMessage('Error al iniciar sesión. Por favor, verifica tus credenciales.');
            setShowAlert(true); // Muestra la alerta
        }
    };

    return (
        <div className="container">
            <br/>
            <br/>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h1 className={"text-center card-header"}>Iniciar sesión</h1>
                <div className={"card-body"}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">ID:</label>
                            <input type="text" className="form-control" value={id}
                                   onChange={e => setId(e.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña:</label>
                            <input type="password" className="form-control" value={password}
                                   onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="d-grid gap-2">
                            <input type="submit" className="btn btn-primary" value="Iniciar sesión"/>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <Link to="/save-proveedor" className="btn btn-register">Registrarse</Link>
                    </div>
                </div>
                {showAlert && <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>{errorMessage}</Alert>} {/* Muestra la alerta de Bootstrap si showAlert es true */}
            </div>
        </div>
    );
};

export default Login;