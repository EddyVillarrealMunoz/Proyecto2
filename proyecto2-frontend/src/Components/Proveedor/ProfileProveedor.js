import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import proveedorService from "../../Services/ProveedorService";

const ProfileProveedor = ( ) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [accepted, setAccepted] = useState(false);
    const [actComerciales, setActComerciales] = useState('');

    const {id} = useParams(); //Obtenemos id del proveedor loggeado

    useEffect(() => {
        proveedorService.getProveedorById(id).then((response) => {
            console.log(response.data); // Agregado para depuración
            setName(response.data.name);
            setEmail(response.data.email);
            setAccepted(response.data.accepted);
            setActComerciales(response.data.actComerciales);


        }).catch((error) => {
            console.log(error);
        })
    }, [id]) // Ejecuta useEffect cada vez que cambia el id

    return (
        <div>
            <section className="marco">
                <h2 className="tituloProveedorPerfil">Perfil Proveedor</h2>
                <hr/>
                <p><strong>ID: </strong> <span>{id}</span></p>
                <p><strong>Nombre: </strong> <span>{name}</span></p>
                <p><strong>Email: </strong> <span>{email}</span></p>
                <p><strong>Estado: </strong> <span>{accepted ? 'Ha sido aceptado como contribuyente' : 'Aún no ha sido aceptado como contribuyente'}</span></p>
                <p><strong>Actividades Comerciales:</strong></p>
                <ul>
                    {actComerciales && actComerciales.length > 0 ? (
                        actComerciales.map((actividad, index) => (
                            <li key={index}>{actividad.description}</li>
                        ))
                    ) : (
                        <li>No registra actividades comerciales</li>
                    )}
                </ul>
                {/*<p><strong>Clientes:</strong> <span>{actComercial ? clientes : 'No registra'}</span></p>*/}
                <Link className="btn btn-info" to={`/update-proveedor/${id}`}>Actualizar Perfil</Link>
                &nbsp;&nbsp;
                <Link to="/" className="btn btn-danger">Cancelar</Link>
            </section>
        </div>
    );
};

export default ProfileProveedor;