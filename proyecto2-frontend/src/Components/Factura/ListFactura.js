import React, { useState, useEffect } from 'react';
import FacturaService from "../../Services/FacturaService";
import { Link } from 'react-router-dom'

export const ListFacturas = () => {
    const [facturas, setFacturas] = useState([]);

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
                            </tr>
                    )
                }
                </tbody>
            </table>
            <Link to="/save-productos">Agregar Factura</Link>
        </div>
    );
}

export default ListFacturas;