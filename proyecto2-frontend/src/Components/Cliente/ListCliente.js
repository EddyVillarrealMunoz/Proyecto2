import React, { useState, useEffect } from 'react';
import ClienteService from "../../Services/ClienteService";
import { Link } from 'react-router-dom';

import '../../css/style.css';

export const ListClientes = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        ClienteService.getClientes().then((response) => {
            setClientes(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className='tabla-Cliente'>
            <h2>Clientes</h2>
            <table>
                <thead>
                <tr>
                    <th>Tipo Cliente</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {
                    clientes.map(
                        cliente =>
                            <tr key={cliente.id}>
                                <td>{cliente.tipoCliente ? "Físico" : "Jurídico"}</td>
                                <td>{cliente.name}</td>
                                <td>{cliente.direccion}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.email}</td>
                            </tr>
                    )
                }
                </tbody>
            </table>
            <Link to="/save-clientes">Agregar Clientes</Link>
        </div>
    );
}

export default ListClientes;