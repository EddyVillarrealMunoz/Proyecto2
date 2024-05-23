import React, {useEffect, useState} from 'react';
import ProveedorService from "../../Services/ProveedorService";
import ActComercialService from "../../Services/ActComercialService";
import {Link, useNavigate, useParams} from "react-router-dom";

export const CreateOrUpdateProveedor = () => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [actComerciales, setActComerciales] = useState([]); //Array que recupera todos los objetos tipo actComercial
    const [actComercial, setActComercial] = useState(null); //Variable que guardará la actComercial seleccionada

    const navigate = useNavigate();
    const {idUpdate} = useParams();

    const saveOrUpdateProveedor = async (e) => {
        e.preventDefault();

        if (!id || !name || !email || !password) { // Validación de los campos del formulario
            alert('Por favor, rellena todos los campos');
            return;
        }

        const proveedor = { id, name, email, password, actComercial};

        if(idUpdate){
            try {
                const response = await ProveedorService.updateProveedor(idUpdate, proveedor);
                console.log(response.data);
                navigate('/proveedores');
            } catch (error) {
                console.error(error);
                alert('Hubo un error al editar el proveedor');
            }
        }
        else{
            try {
                const response = await ProveedorService.saveProveedor(proveedor);
                console.log(response.data);
                navigate('/proveedores');
            } catch (error) {
                console.error(error);
                alert('Hubo un error al guardar el proveedor');
            }
        }
    }

    useEffect(() => {
        ProveedorService.getProveedorById(idUpdate).then((response) => {
            setId(response.data.id);
            setName(response.data.name);
            setEmail(response.data.email);
            setPassword(response.data.password);
        }).catch((error) => {
            console.log(error);
        })
    },[])

    useEffect(() => {
        ActComercialService.getActComerciales().then((response) => {
            setActComerciales(response.data);
        }).catch((error) => {
            console.log(error);
        })
    },[])

    /*useEffect(() => {
        ActComercialService.getActComercialById(1).then((response) => {
            setActComercial(response.data);
        }).catch((error) => {
            console.log(error);
        })
    },[])*/

    const title = () =>{
        if(idUpdate) {
            return <p className='text-center'>Actualizar Proveedor {id}</p>;
        }
        return <p className='text-center'>Registro Proveedor</p>;
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>
                            {title()}
                        </h2>
                        <div className='card-body'>
                            <form>
                                {
                                    !idUpdate &&
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
                                }

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

                                <div>
                                    <p>Actividades Comerciales</p>
                                    {actComerciales.length > 0 ? (
                                        <select value={actComercial ? actComercial.id : ''}
                                                onChange={(e) => {
                                                    const selectedActComercial = actComerciales.find(act => act.id === Number(e.target.value));
                                                    setActComercial(selectedActComercial);
                                                }}>
                                            {actComerciales.map((actComercial) => (
                                                <option
                                                    key={actComercial.id}
                                                    value={actComercial.id}>{actComercial.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p>Actualmente no existen actividades para elegir</p>
                                    )}
                                </div>

                                <button className='btn btn-success' onClick={(e) => saveOrUpdateProveedor(e)}>Save
                                </button>
                                &nbsp;&nbsp;
                                <Link to='/proveedores' className='btn btn-danger'>Cancelar</Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateOrUpdateProveedor;