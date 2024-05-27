import React, {useEffect, useState} from 'react';
import ProveedorService from "../../Services/ProveedorService";
import ActComercialService from "../../Services/ActComercialService";
import {Link, useNavigate, useParams} from "react-router-dom";

export const CreateOrUpdateProveedor = () => {
    //------------------------------------------------------------------------------------------------------------------
    // CONSTANTES
    //------------------------------------------------------------------------------------------------------------------
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [actComerciales, setActComerciales] = useState([]); //Array que recupera todos los objetos tipo actComercial
    const [selectedActComerciales, setSelectedActComerciales] = useState([]);

    const navigate = useNavigate();
    const {idUpdate} = useParams();

    const saveOrUpdateProveedor = async (e) => {
        e.preventDefault();

        if (!id || !name || !email || !password) { // Validación de los campos del formulario
            alert('Por favor, rellena todos los campos');
            return;
        }

        const proveedor = {id, name, email, password, actComerciales: selectedActComerciales.map(id => ({id}))};
        console.log("Selected act comerciales: ", selectedActComerciales);
        console.log("Act comerciales: ", actComerciales);


        if (idUpdate) {
            try {
                const response = await ProveedorService.updateProveedor(idUpdate, proveedor);
                console.log("Update",response.data);
                alert('Proveedor actualizado correctamente');
                navigate(`/profile-proveedor/${idUpdate}`);
            } catch (error) {
                console.error(error);
                alert('Hubo un error al editar el proveedor');
            }
        } else {
            try {
                const response = await ProveedorService.saveProveedor(proveedor);
                console.log("Crear Proveedor" + response.data);
                alert('Proveedor creado correctamente');
                navigate('/login');
            } catch (error) {
                console.error(error);
                alert('Hubo un error al guardar el proveedor');
            }
        }
    }

    const title = () => {
        if (idUpdate) {
            return <h1 className={"text-center card-header"}>Actualizar Proveedor</h1>;
        }
        return <h1 className={"text-center card-header"}>Registro Proveedor</h1>;
    }

    //------------------------------------------------------------------------------------------------------------------
    // USE EFFECT
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() =>
    {
        if (idUpdate) {
            ProveedorService.getProveedorById(idUpdate).then((response) => {
                setId(response.data.id);
                setName(response.data.name);
                setEmail(response.data.email);
                setPassword(response.data.password);
            }).catch((error) => {
                console.log(error);
            });

            // Cargar las actividades comerciales del proveedor
            ProveedorService.getActComercialesByProveedorId(idUpdate).then((response) => {
                setSelectedActComerciales(response.data.map(act => act.id));
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [idUpdate])

    useEffect(() => {
        ActComercialService.getActComerciales().then((response) => {
            setActComerciales(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

    //------------------------------------------------------------------------------------------------------------------
    // FUNCIONES
    //------------------------------------------------------------------------------------------------------------------
    function botonVolver() {
        if (idUpdate) {
            navigate(`/profile-proveedor/${idUpdate}`);
        } else {
            navigate('/login');
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // RENDER
    //------------------------------------------------------------------------------------------------------------------
    return (
        <div>
            <div className='container'>
                <br/>
                <br/>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {title()}
                    <div className='card-body'>
                        <form>
                            {
                                !idUpdate &&
                                <div className={"mb-3"}>
                                    <label className="form-label">Id</label>
                                    <input
                                        type="text"
                                        placeholder="Digite id "
                                        name="id"
                                        className="form-control"
                                        value={id}
                                        onChange={(e) => setId(e.target.value)}
                                    />
                                </div>
                            }
                            <div className={"mb-3"}>
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
                            <div className={"mb-3"}>
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
                            <div className={"mb-3"}>
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
                            <div className={"mb-3"}>
                                <label>Actividades Comerciales:</label>
                                <div>
                                    {actComerciales.map((act, index) => (
                                        <div key={index} className="form-check">
                                            <input
                                                type="checkbox"
                                                id={`actComercial_${act.id}`}
                                                name={`actComercial_${act.id}`}
                                                value={act.id}
                                                checked={selectedActComerciales.includes(act.id)}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setSelectedActComerciales(prevState => {
                                                        if (checked) {
                                                            return [...prevState, act.id];
                                                        } else {
                                                            return prevState.filter(id => id !== act.id);
                                                        }
                                                    });
                                                }}
                                                className="form-check-input"
                                            />
                                            <label htmlFor={`actComercial_${act.id}`}
                                                   className="form-check-label">{act.description}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className='btn btn-success' onClick={(e) => saveOrUpdateProveedor(e)}>Guardar
                            </button>
                            &nbsp;&nbsp;
                            <button className='btn btn-secondary' onClick={botonVolver}>Volver</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateOrUpdateProveedor;