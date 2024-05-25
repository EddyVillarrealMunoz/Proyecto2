import React, {useEffect, useState} from 'react';
import ClienteService from "../../Services/ClienteService";
import {useNavigate} from 'react-router-dom';
import '../../css/style.css';

export const ListClientes = () => {
    //------------------------------------------------------------------------------------------------------------------
    // CONSTANTES
    //------------------------------------------------------------------------------------------------------------------
    const [clientes, setClientes] = useState([]);
    const navigator = useNavigate();

    //------------------------------------------------------------------------------------------------------------------
    // Validar credenciales / Obtener data
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        // Obtener la información del usuario y id del proveedor que ha ingresado a este componente
        const user = JSON.parse(localStorage.getItem('user'));
        const proveedorId = localStorage.getItem('proveedorId');

        // Verificar si el usuario ha iniciado sesión
        if (!user) {
            alert('Debe iniciar sesión para acceder a esta página');
            navigator('/login');
            return;
        }

        // Verificar si el usuario es un proveedor
        if (user.rol !== 'PRO') {
            alert('Permisos denegados');
            navigator('/login');
            return;
        }

        console.log(`El proveedor con id ${proveedorId} ha ingresado`);

        ClienteService.getClientesByProveedor(proveedorId).then((response) => {
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

    function editCliente(id) {
        console.log("Editar cliente con id: ", id);
        navigator(`/clientes/edit/${id}`);
    }

    function viewCliente(idP) {
        console.log("Ver cliente con id: ", idP);
        navigator(`/clientes/view/${idP}`);
    }

    function removeCliente(id) {
        console.log("Eliminar cliente con id: ", id);

        ClienteService.deleteCliente(id).then(() => {
            ClienteService.getClientes().then((response) => {
                setClientes(response.data);
            }).catch((error) => {
                console.log("Error al obtener la lista de clientes: ", error);
            });
        }).catch(error => {
            console.error("Error al eliminar el cliente: ", error);
        })
    }

    function formatoCedula(tipoCliente, cedula) {
        console.log(tipoCliente, cedula)
        if (tipoCliente === true && cedula.length === 9) {
            return `${cedula.slice(0, 1)}-${cedula.slice(1, 5)}-${cedula.slice(5)}`;
        }
        if (tipoCliente === false && cedula.length === 10) {
            return `${cedula.slice(0, 1)}-${cedula.slice(1, 4)}-${cedula.slice(5)}`;
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
            <br/>
            <h1>Clientes</h1>
            <button className="btn btn-primary mb-1 float-end" onClick={addCliente}>Nuevo Cliente</button>
            <table>
                <thead>
                    <tr className={"text-center"}>
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
                        clientes.map(cliente =>
                            <tr key={cliente.id}>
                                <td>{formatoCedula(cliente.tipoCliente, cliente.id)}</td>
                                <td>{cliente.tipoCliente ? "Físico" : "Jurídico"}</td>
                                <td>{cliente.name}</td>
                                <td>{cliente.direccion}</td>
                                <td>{formatoTelefono(cliente.telefono)}</td>
                                <td>{cliente.email}</td>
                                <td>
                                    <div className={"text-center"}>
                                        <button className="btn btn-warning m-1"
                                                onClick={() => editCliente(cliente.id)}>Editar
                                        </button>
                                        <button className="btn btn-info m-1"
                                                onClick={() => viewCliente(cliente.id)}>Ver
                                        </button>
                                        <button className="btn btn-danger m-1"
                                                onClick={() => removeCliente(cliente.id)}>Eliminar
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