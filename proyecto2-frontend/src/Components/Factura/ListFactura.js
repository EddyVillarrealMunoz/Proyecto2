import React, { useState, useEffect } from 'react';
import FacturaService from "../../Services/FacturaService";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';

export const ListFacturas = () => {
    const [facturas, setFacturas] = useState([]);
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() =>
    {
        // Obtener la información del usuario y id del proveedor que ha ingresado a este componente
        const user = JSON.parse(localStorage.getItem('user'));
        const proveedorId = localStorage.getItem('proveedorId');

        // Verificar si el usuario ha iniciado sesión
        if (!user) {
            alert('Debe iniciar sesión para acceder a esta página');
            navigate('/login');
            return;
        }

        // Verificar si el usuario es un proveedor
        if (user.rol !== 'PRO') {
            alert('Permisos denegados');
            navigate('/login');
            return;
        }

    }, []);

    useEffect(() => {
        FacturaService.getFacturas().then((response) => {
            setFacturas(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className='tabla-productos'>
            <h2>Facturas</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Proveedor</th>
                    <th>Cliente</th>
                    <th>Tipo_Pago</th>
                    <th>Precio_Final</th>
                    <th>Generar PDF/XML</th>
                </tr>
                </thead>
                <tbody>
                {
                    facturas.map(
                        factura =>
                            <tr key={factura.id}>
                                <td>{factura.id}</td>
                                <td>{factura.date}</td>
                                <td>{factura.cedulaProveedor}</td>
                                <td>{factura.cedulaCliente}</td>
                                <td>{factura.tipoPago}</td>
                                <td>{factura.finalPrice}</td>
                                <td></td>
                            </tr>
                    )
                }
                </tbody>
            </table>
            <Link to="/save-facturas">Agregar Factura</Link>
        </div>
    );
}

export default ListFacturas;