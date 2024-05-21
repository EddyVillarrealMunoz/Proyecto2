import React, {useEffect, useState} from 'react';

import '../../css/style.css';
import ProveedorService from "../../Services/ProveedorService";
import approveImage from '../../images/approve.png';
import rejectImage from '../../images/delete.png';

export const ProfileAdmin = () => {

    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        ProveedorService.getProveedores().then((response) => {
            setProveedores(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    const handleAccept = (id) => {
        const updatedProveedor = proveedores.find(proveedor => proveedor.id === id);
        updatedProveedor.accepted = true;

        ProveedorService.updateProveedor(id, updatedProveedor)
            .then(response => {
                setProveedores(proveedores.map(proveedor =>
                    proveedor.id === id ? updatedProveedor : proveedor
                ));
            })
            .catch(error => {
                console.log(error);
            });
    }

    const deleteProveedor = (id) => {
        ProveedorService.deleteProveedor(id)
            .then(response => {
                setProveedores(proveedores.filter(proveedor => proveedor.id !== id));
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className='tabla-administrador'>
            <h2>Solicitudes</h2>
            <div className="create">
                <a className="boton-create" href="/login">Sign Out</a>
            </div>
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>E-mail</th>
                        <th>Actividad Comercial</th>
                        <th>Aprobar</th>
                        <th>Rechazar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        proveedores.filter(proveedor => !proveedor.accepted).map(
                            proveedor =>
                                <tr key={proveedor.id}>

                                    <td>{proveedor.id}</td>
                                    <td>{proveedor.name}</td>
                                    <td>{proveedor.email}</td>
                                    <td>{proveedor.actComercial ? proveedor.actComercial.name : 'No especificado'}</td>

                                    <td>
                                        <img
                                            className="imagen-approve"
                                            src={approveImage}
                                            height={20}
                                            width={20}
                                            alt="Aprobar"
                                            onClick={() => handleAccept(proveedor.id)}
                                        />
                                    </td>

                                    <td>
                                        <img
                                            className="imagen-delete"
                                            src={rejectImage}
                                            height={20}
                                            width={20}
                                            alt="Rechazar"
                                            onClick={() => handleAccept(proveedor.id)}
                                        />
                                    </td>
                                </tr>
                        )

                    }
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Aprobados</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>E-mail</th>
                        <th>Actividad Comercial</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        proveedores.filter(proveedor => proveedor.accepted).map(
                            proveedor =>
                                <tr key={proveedor.id}>

                                    <td>{proveedor.id}</td>
                                    <td>{proveedor.name}</td>
                                    <td>{proveedor.email}</td>
                                    <td>{proveedor.actComercial ? proveedor.actComercial.name : 'No especificado'}</td>

                                    <td>
                                        <img
                                            className="imagen-delete"
                                            src={rejectImage}
                                            height={20}
                                            width={20}
                                            alt="Rechazar"
                                            onClick={() => deleteProveedor(proveedor.id)}
                                        />
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProfileAdmin;


