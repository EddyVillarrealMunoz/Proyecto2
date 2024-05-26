import React, {useEffect, useState} from 'react';

import '../../css/style.css';
import ProveedorService from "../../Services/ProveedorService";
import approveImage from '../../images/approve.png';
import rejectImage from '../../images/delete.png';
import waitingImage from '../../images/waiting.png';

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

    const handleReject = (id) => {
        const updatedProveedor = proveedores.find(proveedor => proveedor.id === id);
        updatedProveedor.accepted = false;

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
            <h2>Proveedores</h2>
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
                        <th>Estado</th>
                        <th>Aprobar</th>
                        <th>Rechazar</th>
                        <th>Eliminar</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        proveedores.map(
                            proveedor =>
                                <tr key={proveedor.id}>

                                    <td>{proveedor.id}</td>
                                    <td>{proveedor.name}</td>
                                    <td>{proveedor.email}</td>
                                    <td>{proveedor.actComercial ? proveedor.actComercial.name : 'No especificado'}</td>
                                    <td style={{backgroundColor: proveedor.accepted ? 'lightgreen' : 'lightcoral'}}>
                                        {proveedor.accepted ? 'Aprobado' : 'En espera'}
                                    </td>

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
                                            className="imagen-reject"
                                            src={waitingImage}
                                            height={20}
                                            width={20}
                                            alt="Rechazar"
                                            onClick={() => handleReject(proveedor.id)}
                                        />
                                    </td>

                                    <td>
                                        <img
                                            className="imagen-delete"
                                            src={rejectImage}
                                            height={20}
                                            width={20}
                                            alt="Eliminar"
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