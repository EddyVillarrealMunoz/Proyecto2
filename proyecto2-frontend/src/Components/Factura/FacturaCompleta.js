import React, { useState, useEffect } from 'react';
import FacturaService from "../../Services/FacturaService";
import { useNavigate } from 'react-router-dom';
import facturaImage from "../../images/factura.png";
import 'bootstrap/dist/css/bootstrap.min.css';

const FacturaCompleta = ({ idP }) => {
    const [factura, setFactura] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [listFacturaDetalles, setListFacturaDetalles] = useState([]);
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
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <img src={facturaImage} alt="Factura" className="logoFactura" />
                    <div className="invoice-title">
                        <h2 className="text-primary">Factura</h2><h3 className="pull-right">ID #{factura ? factura.id : 'Cargando...'}</h3>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                            <address>
                                <strong>Facturado a:</strong> {cliente ? cliente.name : 'Cargando...'}<br />
                                <strong>Correo:</strong> {cliente ? cliente.email : 'Cargando...'}
                            </address>
                        </div>
                        <div className="col-6 text-right">
                            <address>
                                <strong>Fecha de la factura:</strong><br />
                                {factura ? factura.date : 'Cargando...'}<br /><br />
                            </address>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <address>
                                <strong>Método de pago:</strong><br />
                                {factura ? factura.tipoPago : 'Cargando...'}
                            </address>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title"><strong>Resumen de la orden</strong></h3>
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-condensed">
                                    <thead>
                                    <tr>
                                        <td><strong>Producto</strong></td>
                                        <td className="text-center"><strong>Precio</strong></td>
                                        <td className="text-center"><strong>Cantidad</strong></td>
                                        <td className="text-right"><strong>Total</strong></td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {listFacturaDetalles.map((detalle, index) => (
                                        <tr key={index}>
                                            <td>{detalle.description}</td>
                                            <td className="text-center">{detalle.price}</td>
                                            <td className="text-center">{factura.listFacturaDetalle[index].cantidad}</td>
                                            <td className="text-right">{detalle.price * factura.listFacturaDetalle[index].cantidad}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="thick-line"></td>
                                        <td className="thick-line"></td>
                                        <td className="thick-line text-center"><strong>Total</strong></td>
                                        <td className="thick-line text-right">{factura ? factura.finalPrice : 'Cargando...'}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FacturaCompleta;