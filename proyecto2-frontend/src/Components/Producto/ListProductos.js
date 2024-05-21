import React, { useState, useEffect } from 'react';
import ProductoService from "../../Services/ProductoService";
import { Link } from 'react-router-dom';

export const ListProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        ProductoService.getProductos().then((response) => {
            setProductos(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className='tabla-productos'>
            <h2>Productos</h2>
            <table>
                <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Medida</th>
                    <th>Precio</th>
                    <th>IVA</th>

                </tr>
                </thead>
                <tbody>
                {
                    productos.map(
                        producto =>
                            <tr key={producto.id}>
                                <td>{producto.type ? "Producto" : "Servicio"}</td>
                                <td>{producto.description}</td>
                                <td>{producto.measure}</td>
                                <td>{producto.price}</td>
                                <td>{producto.ivaFee}</td>
                            </tr>
                    )
                }
                </tbody>
            </table>
            <Link to="/save-productos">Agregar Productos</Link>
        </div>
    );
}

export default ListProductos;