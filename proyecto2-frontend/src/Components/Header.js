import React from 'react';

import '../css/style.css';
import facturaImage from '../images/factura.png';

export const Header = () => {
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
                    <a href="/logout">Salir</a>
                </nav>
            </header>
        </div>
    )
}
export default Header;