import React, { useState, useEffect } from 'react';
import FacturaService from "../../Services/FacturaService";
import { useNavigate } from 'react-router-dom';
import facturaImage from "../../images/factura.png";

const FacturaCompleta = ({ idP }) => {
    const [factura, setFactura] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [listFacturaDetalles, setListFacturaDetalles] = useState([]); // Cambiado el nombre de la variable
    const facturaId = localStorage.getItem('facturaId');
    const navigate = useNavigate();

    useEffect(() => {
        if (facturaId) {
            FacturaService.getFacturaById(facturaId)
                .then((response) => {
                    setFactura(response.data);

                    FacturaService.getClienteById(response.data.cedulaCliente)
                        .then(cliente => {
                            setCliente(cliente);
                        })
                        .catch(error => {
                            console.error("Error al obtener los datos del cliente:", error);
                        });

                    const detallesPromises = response.data.listFacturaDetalle.map(detalle => {
                        return FacturaService.getProductoById(detalle.idProducto);
                    });

                    Promise.all(detallesPromises)
                        .then(productos => {
                            setListFacturaDetalles(productos);
                        })
                        .catch(error => {
                            console.error("Error al obtener los datos de los productos:", error);
                        });
                })
                .catch((error) => {
                    console.error("Error al obtener la factura:", error);
                });
        }
    }, [facturaId]);

    return (
        <div id="factura">
            {factura ? (
                <div>
                    <div id="encabezado">
                        <img className="logoHome" src={facturaImage} alt=""/>
                        <div id="informacion-cliente">
                            <h3>Cliente</h3>
                            <p>{cliente ? cliente.cedulaCliente : 'Cargando...'}</p>
                            {cliente && (
                                <>
                                    <p>Nombre Completo: {cliente.name}</p>
                                    <p>Teléfono: {cliente.telefono}</p>
                                    <p>Email: {cliente.email}</p>
                                </>
                            )}
                        </div>
                        <div id="informacion-factura">
                            <h3>Factura</h3>
                            <p>Número: {factura.id}</p>
                            <p>Fecha: {factura.date}</p>
                            <p>Método de Pago: {factura.tipoPago}</p>
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
                        {listFacturaDetalles.map((detalle, index) => (
                            <tr key={index}>
                                <td>{detalle.id}</td>
                                <td>{factura.listFacturaDetalle[index].cantidad}</td>
                                <td>{detalle.description}</td>
                                <td>{detalle.price}</td>
                                <td>{detalle.ivaFee}</td>
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
