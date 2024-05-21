import React, { useState } from 'react';
import ClienteService from "../../Services/ClienteService";
import { Link, useNavigate } from "react-router-dom";

export const CreateCliente = () => {

    const [id, setId] = useState('');
    const [tipoCliente, setTipoCliente] = useState('');
    const [name, setName] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const saveCliente = async (e) => {
        e.preventDefault();

        if (!id || !tipoCliente || !name || !direccion || !telefono || !email) { // Validación de los campos del formulario
            alert('Por favor, rellena todos los campos');
            return;
        }

        const cliente = { id, tipoCliente, name, direccion, telefono, email};

        try {
            const response = await ClienteService.saveCliente(cliente);
            console.log(response.data);
            navigate('/clientes');
        } catch (error) {
            console.error(error);
            alert('Hubo un error al guardar el cliente');
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>
                            <p className='text-center'>Agregar Cliente</p>
                        </h2>
                        <div className='card-body'>
                            <form>

                                <div className='radio-option'>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="true"
                                        checked={tipoCliente === true}
                                        onChange={(e) => setTipoCliente(e.target.value === "true")}
                                    />
                                    <label htmlFor="Producto">Físico</label>
                                </div>
                                <div className='radio-option'>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="false"
                                        checked={tipoCliente === false}
                                        onChange={(e) => setTipoCliente(e.target.value !== "true")}
                                    />
                                    <label htmlFor="Servicio">Jurídico</label>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className="form-label"></label>
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
                                    <label className="form-label"></label>
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
                                    <label className="form-label"></label>
                                    <input
                                        type="text"
                                        placeholder="Digite dirección "
                                        name="direccion"
                                        className="form-control"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className="form-label"></label>
                                    <input
                                        type="tel"
                                        placeholder="Digite teléfono "
                                        name="telefono"
                                        className="form-control"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className="form-label"></label>
                                    <input
                                        type="email"
                                        placeholder="Digite email "
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <button className='btn btn-success' onClick={(e) => saveCliente(e)}>Save</button>
                                &nbsp;&nbsp;
                                <Link to='/clientes' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCliente;