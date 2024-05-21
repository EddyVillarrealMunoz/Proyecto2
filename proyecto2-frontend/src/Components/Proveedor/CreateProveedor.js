import React, { useState } from 'react';
import ProveedorService from "../../Services/ProveedorService";
import { Link, useNavigate } from "react-router-dom";

export const CreateProveedor = () => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const saveProveedor = async (e) => {
        e.preventDefault();

        if (!id || !name || !email || !password) { // Validación de los campos del formulario
            alert('Por favor, rellena todos los campos');
            return;
        }

        const proveedor = { id, name, email, password };

        try {
            const response = await ProveedorService.saveProveedor(proveedor);
            console.log(response.data);
            navigate('/proveedores');
        } catch (error) {
            console.error(error);
            alert('Hubo un error al guardar el proveedor');
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>
                            <p className='text-center'>Registro Proveedores</p>
                        </h2>
                        <div className='card-body'>
                            <form>

                                <div className='form-group mb-2'>
                                    <label className="form-label">id</label>
                                    <input
                                        type="text"
                                        placeholder="Digite id "
                                        name="id"
                                        className="form-control"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        placeholder="Digite nombre "
                                        name="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Digite email "
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className="form-label">Password</label>
                                    <input
                                        type="text"
                                        placeholder="Digite password "
                                        name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button className='btn btn-success' onClick={(e) => saveProveedor(e)}>Save</button>
                                &nbsp;&nbsp;
                                <Link to = '/proveedores' className = 'btn btn-danger' >Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProveedor;