import React, {useEffect, useState} from 'react';
import ClienteService from "../../Services/ClienteService";
import {Link, useNavigate} from 'react-router-dom';
import '../../css/style.css';

export const ListClientes = () => {
    //------------------------------------------------------------------------------------------------------------------
    // CONSTANTES
    //------------------------------------------------------------------------------------------------------------------
    const [clientes, setClientes] = useState([]);
    const navigator = useNavigate();

    //------------------------------------------------------------------------------------------------------------------
    // Obtener Data
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        ClienteService.getClientes().then((response) => {
            setClientes(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    //------------------------------------------------------------------------------------------------------------------
    // FUNCIONES
    //------------------------------------------------------------------------------------------------------------------
    function addCliente() {
        console.log("Agregar Cliente");
        navigator("/save-clientes");
    }

    function removeCliente(id) {
        console.log("Eliminar cliente con id: ", id);

        ClienteService.deleteCliente(id).then(() => {
            ClienteService.getClientes();
        }).catch(error => {
            console.error("Error al eliminar el cliente: ", error);
        })
    }

    function formatoCedula(tipoCliente, cedula) {
        console.log(tipoCliente, cedula)
        if (tipoCliente === true && cedula.length === 9) {
            return `${cedula.slice(0, 1)}-${cedula.slice(1,5)}-${cedula.slice(5)}`;
        }
        if(tipoCliente === false && cedula.length === 10)
        {
            return `${cedula.slice(0, 1)}-${cedula.slice(1,4)}-${cedula.slice(5)}`;
        }

        return cedula;
    }

    function formatoTelefono(telefono) {
        if (telefono.length === 8) {
            return `${telefono.slice(0, 4)}-${telefono.slice(4)}`;
        }

        return telefono;
    }

    //------------------------------------------------------------------------------------------------------------------
    // RENDERIZADO
    //------------------------------------------------------------------------------------------------------------------
    return (
        <div className='tabla-Cliente'>
            <h2>Clientes</h2>
            <button className="btn btn-primary mb-1 float-end" onClick={addCliente}>Nuevo Cliente</button>
            <table>
                <thead>
                    <tr>
                        <th>Cedula</th>
                        <th>Tipo Cliente</th>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clientes.map(
                            cliente =>
                                <tr key={cliente.id}>
                                    <td>{formatoCedula(cliente.tipoCliente, cliente.id)}</td>
                                    <td>{cliente.tipoCliente ? "Físico" : "Jurídico"}</td>
                                    <td>{cliente.name}</td>
                                    <td>{cliente.direccion}</td>
                                    <td>{formatoTelefono(cliente.telefono)}</td>
                                    <td>{cliente.email}</td>
                                    <td>
                                        <div className={"text-center"}>
                                            <button className="btn btn-info m-1">Ver</button>
                                            <button className="btn btn-danger m-1"
                                                    onClick={() => removeCliente(cliente.id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListClientes;