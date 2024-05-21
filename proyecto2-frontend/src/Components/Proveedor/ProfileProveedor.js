import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import proveedorService from "../../Services/ProveedorService";

/*
private String id;

    private String name;

    private String email;

    private String password;

    private boolean accepted;

    private ActComercial actComercial;
 */

const ProfileProveedor = ( ) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [accepted, setAccepted] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [actComercial, setActComercial] = useState('');

    const {id} = useParams(); //Obtenemos id del proveedor loggeado

    useEffect(() => {
        proveedorService.getProveedorById(id).then((response) => { //Optener proveedor por id
            setName(response.data.name);
            setEmail(response.data.email);
            setAccepted(response.data.accepted);
            /*setActComercial(response.data.actComercial.id);*/
        }).catch((error) => {
            console.log(error);
        })
    })
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí va la lógica para manejar la actualización del proveedor
    };
    
    return (
        <div>
            <section className="marco">
                <h2>Proveedor</h2>
                <p><strong>ID:</strong> <span>{id}</span></p>
                <p><strong>Nombre:</strong> <span>{name}</span></p>
                <p><strong>Email:</strong> <span>{email}</span></p>
                <p><strong>Estado:</strong> <span>{accepted ? 'Ha sido aceptado como contribuyente' : 'Aún no ha sido aceptado como contribuyente'}</span></p>
                {/*<p><strong>Actividad Comercial:</strong> <span>{actComercial ? proveedor.actComercial.name : 'No registra'}</span></p>*/}
                {/*<p><strong>Clientes:</strong> <span>{actComercial ? proveedor.clientes : 'No registra'}</span></p>*/}
            </section>

            {/*<section className="marco-edit">
                <h2>Editar Perfil</h2>

                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Nombre:</span>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        <span>Email:</span>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        <span>Nueva Contraseña:</span>
                        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        <span>Confirmar Nueva Contraseña:</span>
                        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    </label>
                    <br />
                    <label>
                        <span>Actividad Comercial</span>
                        <select value={actComercial} onChange={e => setActComercial(e.target.value)} className="large-select">
                            {actComerciales.map(act => <option key={act.id} value={act.id}>{act.name}</option>)}
                        </select>
                    </label>
                    <br />
                    <button className="boton-create" type="submit">Actualizar</button>
                    <a className="boton-create" href="/login">Salir</a>
                </form>
            </section>*/}
        </div>
    );
};

export default ProfileProveedor;