import React, {useEffect, useState} from 'react';
import ProductoService from "../../Services/ProductoService";
import ProveedorService from "../../Services/ProveedorService";
import {Link, useNavigate, useParams} from "react-router-dom";
import {NumericFormat} from 'react-number-format';

import '../../css/style.css';

export const CreateProducto = ({mode}) => {
    //------------------------------------------------------------------------------------------------------------------
    // CONSTANTES
    //------------------------------------------------------------------------------------------------------------------
    const [description, setDescription] = useState('');
    const [actComercial, setActComercial] = useState('');
    const [measure, setMeasure] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState(true); // Cambié a true para evitar problemas con el control del radio
    const [ivaFee, setIvaFee] = useState('');

    const [actividadesComerciales, setActividadesComerciales] = useState([]);
    const measures = ['Kilogramos', 'Litros', 'Centímetros', 'Unidades', 'Paquetes', 'Horas'];

    const proveedorId = localStorage.getItem('proveedorId');

    const navigate = useNavigate();
    const {id} = useParams();
    const isDisabled = mode === 'view';

    const [errors, setErrors] = useState({
        description: '',
        actComercial: '',
        measure: '',
        price: '',
        ivaFee: ''
    });

    const createOrUpdateProducto = async (e) => {
        e.preventDefault();

        if (validarForm())
        {
            const producto = {description, measure, price, type, ivaFee, actComercial: actComercial.id};
            if (id) {
                try {
                    const response = await ProductoService.updateProducto(id, producto, proveedorId, actComercial);
                    console.log(response.data);
                    navigate('/productos');
                    alert('Producto editado correctamente');
                } catch (error) {
                    console.error(error);
                    alert('Hubo un error al editar el producto' + error);
                }
            } else {
                try {
                    const response = await ProductoService.saveProducto(producto, proveedorId, actComercial);
                    navigate('/productos');
                } catch (error) {
                    console.error(error);
                    alert('Hubo un error al guardar el producto' + error);
                }
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    // USE EFFECT / Obtener Data
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (id) {
            ProductoService.getProductoById(id).then((response) => {
                setDescription(response.data.description);
                setActComercial(response.data.actComercial.id);
                setMeasure(response.data.measure);
                setPrice(response.data.price);
                setType(response.data.type);
                setIvaFee(response.data.ivaFee);
            }).catch((error) => {
                console.log(error);
            });
        }

        // Cargar las actividades comerciales siempre que se cargue el componente
        ProveedorService.getActComercialesByProveedorId(proveedorId).then((response) => {
            setActividadesComerciales(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, [id, proveedorId]);

    //------------------------------------------------------------------------------------------------------------------
    // FUNCIONES
    //------------------------------------------------------------------------------------------------------------------
    function title() {
        if (id && mode === 'edit') {
            return <h1 className={"text-center card-header"}>Editar Producto/Servicio</h1>;
        }
        if (id && mode === 'view') {
            return <h1 className={"text-center card-header"}>Ver Producto/Servicio</h1>;
        }
        return <h1 className={"text-center card-header"}>Agregar Producto/Servicio</h1>;
    }

    function mostrarBotonGuardar() {
        if (id && mode === 'view') {
            return null;
        } else {
            return <button className={"btn btn-primary me-2"}
                           onClick={(e) => createOrUpdateProducto(e)}>Guardar</button>;
        }
    }

    function validarForm() {
        let valid = true;

        const errorsCopy = {...errors};

        // Validar descripción
        if (!description || description === "") {
            errorsCopy.description = "La descripción es obligatoria";
            valid = false;
        } else {
            errorsCopy.description = "";
        }

        // Validar actividad comercial
        if (!actComercial || actComercial === "") {
            errorsCopy.actComercial = "La actividad comercial es obligatoria";
            valid = false;
        } else {
            errorsCopy.actComercial = "";
        }

        // Validar medida
        if (!measure || measure === "") {
            errorsCopy.measure = "La medida es obligatoria";
            valid = false;
        } else {
            errorsCopy.measure = "";
        }

        // Validar precio
        if (!price || price === "") {
            errorsCopy.price = "El precio es obligatorio";
            valid = false;
        } else if (price <= 0) {
            errorsCopy.price = "El precio debe ser mayor a 0";
            valid = false;
        } else {
            errorsCopy.price = "";
        }

        // Validar IVA
        if (!ivaFee || ivaFee === "") {
            errorsCopy.ivaFee = "El IVA es obligatorio";
            valid = false;
        } else if (ivaFee <= 0) {
            errorsCopy.ivaFee = "El IVA debe ser mayor a 0";
            valid = false;
        } else {
            errorsCopy.ivaFee = "";
        }

        setErrors(errorsCopy);
        return valid;
    }

    //------------------------------------------------------------------------------------------------------------------
    // RENDERIZADO
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
                            <div className={"mb-3"}>
                                <div className='radio-option'>
                                    <input
                                        disabled={isDisabled}
                                        type="radio"
                                        name="type"
                                        value="true"
                                        checked={type === true}
                                        onChange={(e) => setType(e.target.value === "true")}
                                        className={`${errors.type ? 'is-invalid' : ''}`}
                                    />
                                    <label htmlFor="Producto">Producto</label>
                                </div>
                                <div className='radio-option'>
                                    <input
                                        disabled={isDisabled}
                                        type="radio"
                                        name="type"
                                        value="false"
                                        checked={type === false}
                                        onChange={(e) => setType(e.target.value === "false")}
                                        className={`${errors.type ? 'is-invalid' : ''}`}
                                    />
                                    <label htmlFor="Servicio">Servicio</label>
                                </div>
                                {errors.type && <div className={"invalid-feedback"}>{errors.type}</div>}
                            </div>
                            <div className={"mb-3"}>
                                <select
                                    disabled={isDisabled}
                                    name="actComercial"
                                    className={`form-control ${errors.actComercial ? 'is-invalid' : ''}`}
                                    value={actComercial}
                                    onChange={(e) => setActComercial(e.target.value)}
                                >
                                    <option value="">Seleccione actividad comercial</option>
                                    {actividadesComerciales.map((actividad) => (
                                        <option
                                            key={actividad.id}
                                            value={actividad.id}
                                        >
                                            {actividad.id} - {actividad.description}
                                        </option>
                                    ))}
                                </select>
                                {errors.actComercial && <div className={"invalid-feedback"}>{errors.actComercial}</div>}
                            </div>
                            <div className={"mb-3"}>
                                <input
                                    disabled={isDisabled}
                                    type="text"
                                    placeholder="Digite descripción "
                                    name="description"
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && <div className={"invalid-feedback"}>{errors.description}</div>}
                            </div>
                            <div className={"mb-3"}>
                                <select
                                    disabled={isDisabled}
                                    name="measure"
                                    className={`form-control ${errors.measure ? 'is-invalid' : ''}`}
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
                                {errors.measure && <div className={"invalid-feedback"}>{errors.measure}</div>}
                            </div>
                            <div className={"mb-3"}>
                                <NumericFormat
                                    disabled={isDisabled}
                                    value={price}
                                    onValueChange={(values) => setPrice(values.value)}
                                    thousandSeparator={true}
                                    prefix={'₡'}
                                    decimalScale={2}
                                    placeholder="Digite precio"
                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                />
                                {errors.price && <div className={"invalid-feedback"}>{errors.price}</div>}
                            </div>
                            <div className='form-group mb-3'>
                                <NumericFormat
                                    disabled={isDisabled}
                                    value={ivaFee}
                                    decimalScale={2}
                                    onValueChange={(values) => setIvaFee(values.value)}
                                    suffix={'%'}
                                    placeholder="Digite IVA"
                                    className={`form-control ${errors.ivaFee ? 'is-invalid' : ''}`}
                                />
                                {errors.ivaFee && <div className={"invalid-feedback"}>{errors.ivaFee}</div>}
                            </div>
                            {mostrarBotonGuardar()}
                            &nbsp;&nbsp;
                            <Link to='/productos' className='btn btn-secondary'>Volver</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateProducto;
