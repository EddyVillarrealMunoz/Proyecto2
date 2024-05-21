import React, { useState } from 'react';
import ProductoService from "../../Services/ProductoService";
import { Link, useNavigate } from "react-router-dom";

import '../../css/style.css';

export const CreateProducto = () => {
    
    const [description, setDescription] = useState('');
    const [measure, setMeasure] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [ivaFee, setIvaFee] = useState('');

    const navigate = useNavigate();
    const measures = ['Kilogramos', 'Litros', 'Centímetros', 'Unidades']; // Las medidas disponibles

    const saveProducto = async (e) => {
        e.preventDefault();

        if (!measure || !description || !price || !ivaFee) { // Validación de los campos del formulario
            alert('Por favor, rellena todos los campos');
            return;
        }

        const producto = {description, measure, price, type, ivaFee };

        try {
            const response = await ProductoService.saveProducto(producto);
            console.log(response.data);
            navigate('/productos');
        } catch (error) {
            console.error(error);
            alert('Hubo un error al guardar el producto');
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>
                            <p className='text-center'>Agregar Producto/Servicio</p>
                        </h2>
                        <div className='card-body'>
                            <form>

                                <div className='radio-option'>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="true"
                                        checked={type === true}
                                        onChange={(e) => setType(e.target.value === "true")}
                                    />
                                    <label htmlFor="Producto">Producto</label>
                                </div>
                                <div className='radio-option'>
                                    <input
                                        type="radio"
                                        name="type"
                                        value="false"
                                        checked={type === false}
                                        onChange={(e) => setType(e.target.value === "true")}
                                    />
                                    <label htmlFor="Servicio">Servicio</label>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className="form-label"></label>
                                    <input
                                        type="text"
                                        placeholder="Digite descripción "
                                        name="description"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className="form-label"></label>
                                    <select
                                        name="measure"
                                        className="form-control"
                                        value={measure}
                                        onChange={(e) => setMeasure(e.target.value)}
                                    >
                                        <option value="">Seleccione Medida</option>
                                        {measures.map((m, index) => (
                                            <option key={index} value={m}>
                                                {m}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className="form-label"></label>
                                    <input
                                        type="number"
                                        placeholder="Digite precio "
                                        name="price"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                                <div className='form-group mb-2'>
                                    <label className="form-label"></label>
                                    <input
                                        type="number"
                                        placeholder="Digite IVA "
                                        name="ivaFee"
                                        className="form-control"
                                        value={ivaFee}
                                        onChange={(e) => setIvaFee(e.target.value)}
                                    />
                                </div>

                                <button className='btn btn-success' onClick={(e) => saveProducto(e)}>Save</button>
                                &nbsp;&nbsp;
                                <Link to='/productos' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProducto;