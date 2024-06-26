import React, {useEffect, useState} from 'react';
import ClienteService from "../../Services/ClienteService";
import {Link, useNavigate, useParams} from "react-router-dom";
import InputMask from "react-input-mask";

export const CreateCliente = ({mode}) => {

    //------------------------------------------------------------------------------------------------------------------
    // CONSTANTES
    //------------------------------------------------------------------------------------------------------------------
    let [id, setId] = useState('');
    const [tipoCliente, setTipoCliente] = useState('');
    const [name, setName] = useState('');
    const [direccion, setDireccion] = useState('');
    let [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    const proveedorId = localStorage.getItem('proveedorId');

    const navigate = useNavigate();
    const {idP} = useParams();
    const isDisabled = mode === 'view';

    const [errors, setErrors] = useState({
        id: '',
        tipoCliente: '',
        name: '',
        direccion: '',
        telefono: '',
        email: ''
    })

    //Expresión regular para validar correo electrónico
    const validateEmail = (email) => {
        // Expresión regular para validar correo electrónico
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const saveCliente = async (e) => {
        e.preventDefault();

        telefono = telefono.replace(/-/g, '');
        id = id.replace(/-/g, '');

        if (validateForm())
        {
            const cliente = {id, tipoCliente, name, direccion, telefono, email};
            console.log(cliente);

            if (idP && mode === 'edit') {
                try {
                    const repose = await ClienteService.updateCliente(id, cliente);
                    console.log(repose.data);
                    navigate('/clientes');
                    alert('Cliente actualizado correctamente');
                } catch (error) {
                    console.error(error);
                    alert('Hubo un error al actualizar el cliente');
                }
            } else {

                try {
                    const response = await ClienteService.saveCliente(cliente, proveedorId);
                    console.log(response.data);
                    navigate('/clientes');
                } catch (error) {
                    console.error(error);
                    alert('Hubo un error al guardar el cliente');
                }
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // USE EFFECT / OBTENCION DE DATOS
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        console.log("idP: ", idP)
        if (idP) {
            ClienteService.getClienteById(idP).then((response) => {
                console.log("response: ", response.data)
                setId(response.data.id);
                setTipoCliente(response.data.tipoCliente);
                setName(response.data.name);
                setDireccion(response.data.direccion);
                setTelefono(response.data.telefono);
                setEmail(response.data.email);

            }).catch(error => {
                console.error("Error al obtener el cliente: ", error);
            })
        }
    }, [idP]);

    //------------------------------------------------------------------------------------------------------------------
    // FUNCIONES
    //------------------------------------------------------------------------------------------------------------------
    function titulo() {
        if (idP && mode === 'view') {
            return <h1 className={"text-center card-header"}>Ver Cliente</h1>;
        }
        if (idP && mode === 'edit') {
            return <h1 className={"text-center card-header"}>Editar Cliente</h1>;
        }
        return <h1 className={"text-center card-header"}>Nuevo Cliente</h1>;
    }

    function mostrarBotonGuardar() {
        if (idP && mode === 'view') {
            return null;
        } else {
            return <button className='btn btn-success' onClick={(e) => saveCliente(e)}>Guardar</button>
        }
    }

    function validateForm() {
        let valid = true;

        const errorsCopy = {...errors};

        //Validar tipo de cliente
        if (!tipoCliente) {
            errorsCopy.tipoCliente = "El tipo de cliente es requerido";
            valid = false;
        } else {
            errorsCopy.tipoCliente = "";
        }

        //Validar id
        if (!id) {
            errorsCopy.id = "El id es requerido";
            valid = false;
        } else if (tipoCliente === true && id.length !== 9) {
            errorsCopy.id = "El id debe tener una longitud de 9 caracteres para clientes fisicos";
            valid = false;
        } else if (tipoCliente === false && id.length !== 10) {
            errorsCopy.id = "El id debe tener una longitud de 10 caracteres para clientes juridicos";
            valid = false;
        } else {
            errorsCopy.id = "";
        }

        if (!name) {
            errorsCopy.name = "El nombre es requerido";
            valid = false;
        } else {
            errorsCopy.name = "";
        }

        if (!direccion) {
            errorsCopy.direccion = "La dirección es requerida";
            valid = false;
        } else {
            errorsCopy.direccion = "";
        }

        if (!telefono) {
            errorsCopy.telefono = "El teléfono es requerido";
            valid = false;
        } else {
            errorsCopy.telefono = "";
        }

        if (!email) {
            errorsCopy.email = "El email es requerido";
            valid = false;
        } else if (!validateEmail(email)) {
            errorsCopy.email = "El email no es válido";
            valid = false;
        } else {
            errorsCopy.email = "";
        }

        setErrors(errorsCopy);
        return valid;
    }

    //------------------------------------------------------------------------------------------------------------------
    // HTML
    //------------------------------------------------------------------------------------------------------------------
    return (
        <div>
            <div className='container'>
                <br/>
                <br/>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {titulo()}
                    <div className='card-body'>
                        <form>
                            <div className={"mb-3"}>
                                <select value={tipoCliente} id="tipoCliente" disabled={isDisabled || mode === 'edit'}
                                        className={`form-control ${errors.tipoCliente ? 'is-invalid' : ''}`}
                                        onChange={(e) => setTipoCliente(e.target.value)}>
                                    <option value="">Seleccione un Tipo de Identificacion</option>
                                    <option value="true">Fisica</option>
                                    <option value="false">Juridica</option>
                                </select>
                                {errors.tipoCliente && <div className={"invalid-feedback"}>{errors.tipoCliente}</div>}
                            </div>
                            <div className={"mb-3"}>
                                <InputMask
                                    disabled={isDisabled || mode === 'edit'}
                                    mask={tipoCliente === "true" ? "9-9999-9999" : "9-999-999999"}
                                    type="text"
                                    placeholder="Digite id "
                                    name="id"
                                    className={`form-control ${errors.id ? 'is-invalid' : ''}`}
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                                {errors.id && <div className={"invalid-feedback"}>{errors.id}</div>}
                            </div>
                            <div className={"mb-3"}>
                                <input
                                    disabled={isDisabled}
                                    type="text"
                                    placeholder="Digite nombre "
                                    name="name"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                {errors.name && <div className={"invalid-feedback"}>{errors.name}</div>}
                            </div>
                            <div className={"mb-3"}>
                                <input
                                    disabled={isDisabled}
                                    type="text"
                                    placeholder="Digite dirección "
                                    name="direccion"
                                    className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                />{errors.direccion && <div className={"invalid-feedback"}>{errors.direccion}</div>}
                            </div>
                            <div className={"mb-3"}>
                                <InputMask
                                    mask={"9999-9999"}
                                    disabled={isDisabled}
                                    type="tel"
                                    placeholder="Digite teléfono "
                                    name="telefono"
                                    className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                />{errors.telefono && <div className={"invalid-feedback"}>{errors.telefono}</div>}
                            </div>
                            <div className={"mb-3"}>
                                <input
                                    disabled={isDisabled}
                                    type="email"
                                    placeholder="Digite email "
                                    name="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />{errors.email && <div className={"invalid-feedback"}>{errors.email}</div>}
                            </div>
                            {mostrarBotonGuardar()}
                            &nbsp;&nbsp;
                            <Link to='/clientes' className='btn btn-secondary'>Volver</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCliente;