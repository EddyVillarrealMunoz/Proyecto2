import React, { useState, useEffect } from 'react';
import FacturaService from "../../Services/FacturaService";
import { useNavigate } from 'react-router-dom';
import facturaImage from "../../images/factura.png";

const FacturaCompleta = ({ idP }) => {
    const [factura, setFactura] = useState([]);
    const [listFacturaDetalle, setlistFacturaDetalle] = useState([]);
    const facturaId = localStorage.getItem('facturaId');
    const navigate = useNavigate();

    useEffect(() => {
        FacturaService.getFacturaById(facturaId).then((response) => {
            setFactura(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, [facturaId]);

    return (
        <div id="factura">
            {factura ? (
                <div>
                    <div id="encabezado">
                        <img className="logoHome" src={facturaImage} alt=""/>
                        <div id="informacion-cliente">
                            <h3>Cliente</h3>
                            <p>{factura.cedulaCliente}</p>
                            {factura.cedulaCliente && (
                                <>
                                    <p>Teléfono: {factura.cedulaCliente.telefono}</p>
                                    <p>Email: {factura.cedulaCliente.email}</p>
                                </>
                            )}
                        </div>
                        <div id="informacion-factura">
                            <h3>Factura</h3>
                            <p>Número: {factura.id}</p>
                            <p>Fecha: {factura.date}</p>
                            <p>Pago: {factura.tipoPago}</p>
                        </div>
                    </div>
                    <table id="tabla-productos">
                        <thead>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>CANT.</th>
                            <th>DESCRIPCIÓN</th>
                            <th>PRECIO UNIT.</th>
                            <th>IVA</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listFacturaDetalle.map(detalle => (
                            <tr key={detalle.id}>
                                <td>{detalle.idProducto}</td>
                                <td>{detalle.cantidad}</td>
                                <td>{detalle.idProducto.description}</td>
                                <td>{detalle.idProducto.price}</td>
                                <td>{detalle.idProducto.ivaFee}</td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr>
                            <th colSpan="4">TOTAL S</th>
                            <td>{factura.finalPrice}</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default FacturaCompleta;

