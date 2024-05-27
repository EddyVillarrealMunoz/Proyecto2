import React, {useEffect, useState} from 'react';
import { Alert, Modal, Button } from 'react-bootstrap';

import '../../css/style.css';
import ProveedorService from "../../Services/ProveedorService";
import approveImage from '../../images/approve.png';
import waitingImage from '../../images/waiting.png';
import rejectImage from '../../images/delete.png';

export const ProfileAdmin = () => {

    const [proveedores, setProveedores] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalProveedor, setModalProveedor] = useState(null);

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
        if (!updatedProveedor.actComerciales || updatedProveedor.actComerciales.length === 0) {
            setAlertMessage('No se puede aprobar un proveedor sin una actividad comercial asociada');
            setShowAlert(true);
            return;
        }
        updatedProveedor.accepted = true;

        ProveedorService.updateProveedor(id, updatedProveedor)
            .then(response => {
                ProveedorService.getActComercialesByProveedorId(id)
                    .then(actComercialesResponse => {
                        setProveedores(proveedores.map(proveedor =>
                            proveedor.id === id ? {...updatedProveedor, actComerciales: actComercialesResponse.data} : proveedor
                        ));
                    })
                    .catch(error => {
                        console.log(error);
                    });
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

    const handleOpenModal = (proveedor) => {
        setModalProveedor(proveedor);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <div className='tabla-administrador'>
            <h2>Proveedores</h2>
            <div className="create">
                <a className="boton-create" href="/login">Sign Out</a>
            </div>
            <table className="table-scroll">
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
                    proveedores.map (
                        proveedor =>
                            <tr key={proveedor.id}>
                                <td>{proveedor.id}</td>
                                <td>{proveedor.name}</td>
                                <td>{proveedor.email}</td>
                                <td>
                                    {
                                        proveedor.actComerciales && proveedor.actComerciales.length > 0 ? (
                                            <button onClick={() => handleOpenModal(proveedor)}>
                                                Mostrar
                                            </button>
                                        ) : 'No registra'
                                    }
                                </td>
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
            {showAlert &&
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>{alertMessage}</Alert>}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Actividades Comerciales</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalProveedor && modalProveedor.actComerciales.map(act => <p key={act.id}>{act.description}</p>)}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProfileAdmin;