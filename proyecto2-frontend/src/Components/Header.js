import React, { useEffect, useState } from 'react';
import '../css/style.css';
import { Link, useNavigate } from 'react-router-dom';
import facturaImage from '../images/factura.png';

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const handleProfileRedirect = () => {
        if (user) {
            if (user.rol === 'ADM') {
                navigate('/admin-profile');
            } else if (user.rol === 'PRO') {
                navigate(`/profile-proveedor/${user.id}`);
            }
        }
    }

    return (
        <div>
            <header>
                <div>
                    {<a href="/"> <img className="logoHome" src={facturaImage} alt=""/> </a>}
                </div>
                <nav className="listaHeader">
                    <a href="/facturas">Facturas</a>
                    <a href="/productos">Productos</a>
                    <a href="/clientes">Clientes</a>
                    <a href="#" onClick={handleProfileRedirect}>Mi Perfil</a>
                    <a href="/logout">Salir</a>
                </nav>
            </header>
        </div>
    )
}

export default Header;