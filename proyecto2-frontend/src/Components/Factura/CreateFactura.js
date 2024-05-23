import React, { useState, useEffect } from 'react';
import FacturaService from "../../Services/FacturaService";
import { Link, useNavigate } from "react-router-dom";

import ProductoService from "../../Services/ProductoService";
import ClienteService from "../../Services/ClienteService";

// ...

import '../../css/style.css';

export const CreateFactura = () => {

    const[cedulaCliente,setCedulaCliente]=useState('');
    const[tipoPago,setTipoPago]=useState('');
    const[date,setDate]=useState('');
    //const [cantidad,setCantidad]=useState('');
    const[finalPrice,setFinalPrice]=useState('');
    const[listFacturasDetalles,setlistFacturasDetalles]=useState('');
    const[cedulaProveedor,setCedulaProveedor]=useState('');

    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [selectedProductos, setSelectedProductos] = useState([]);
    const [productoCantidades, setProductoCantidades] = useState({});
    const [selectedCliente, setSelectedCliente] = useState(null);

    const tipo_pago = ['tarjeta','efectivo'];
    const navigate = useNavigate();

    const saveFactura = async (e) => {
        e.preventDefault();

        if ( !cedulaCliente || !tipoPago || !date) { // Validación de los campos del formulario
            alert('Por favor, rellena todos los campos');
            return;
        }

        //Se supone que cuando uno selecciona el id del producto, este se agrega a lista de FacturasDetalles junto a su cantidad.
        const factura = {cedulaCliente, tipoPago, date, finalPrice, listFacturasDetalles, cedulaProveedor };

        try {
            const response = await FacturaService.saveFactura(factura);
            console.log(response.data);
            navigate('/facturas');
        } catch (error) {
            console.error(error);
            alert('Hubo un error al guardar la factura');
        }
    }

    useEffect(() => {
        ProductoService.getProductos().then((response) => {
            setProductos(response.data);
        }).catch((error) => {
            console.log(error);
        });

        ClienteService.getClientes().then((response) => {
            setClientes(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h1 className='text-center'>
                            <p className='text-center'>Creando Factura</p>
                        </h1>
                        <div className='card-body'>
                            <form>

                                <div className='form-group mb-2'>
                                    <label className="form-label">Producto</label>
                                    <br/>
                                    {productos.length > 0 ? (
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th>Descripción</th>
                                                <th>Iva</th>
                                                <th>Medida</th>
                                                <th>Precio</th>
                                                <th>Tipo</th>
                                                <th>Seleccionar</th>
                                                <th>Cantidad</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {productos.map((producto) => (
                                                <tr key={producto.id}>
                                                    <td>{producto.description}</td>
                                                    <td>{producto.ivaFee}</td>
                                                    <td>{producto.measure}</td>
                                                    <td>{producto.price}</td>
                                                    <td>{producto.type ? "Producto" : "Servicio"}</td>
                                                    <td>
                                                        <input type="checkbox" name="producto" value={producto.id}
                                                               onChange={(e) => {
                                                                   if (e.target.checked) {
                                                                       setSelectedProductos([...selectedProductos, producto]);
                                                                   } else {
                                                                       setSelectedProductos(selectedProductos.filter(prod => prod.id !== producto.id));
                                                                   }
                                                               }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input type="number" min="1" name="cantidad"
                                                               className="input-cantidad"
                                                               onChange={(e) => {
                                                                   setProductoCantidades({
                                                                       ...productoCantidades,
                                                                       [producto.id]: e.target.value
                                                                   });
                                                               }}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Actualmente no existen productos para elegir</p>
                                    )}
                                </div>

                                <div className='form-group mb-2'>
                                    <label className="form-label">Cliente</label>
                                    <br/>
                                    {clientes.length > 0 ? (
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Email</th>
                                                <th>Seleccionar</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {clientes.map((cliente) => (
                                                <tr key={cliente.id}>
                                                    <td>{cliente.name}</td>
                                                    <td>{cliente.email}</td>
                                                    <td>
                                                        <input type="radio" name="cliente" value={cliente.id}
                                                               onChange={(e) => {
                                                                   const selectedCli = clientes.find(cli => cli.id === Number(e.target.value));
                                                                   setSelectedCliente(selectedCli);
                                                               }}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p>Actualmente no existen clientes para elegir</p>
                                    )}
                                </div>

                                <div className='radio-option'>
                                    <input
                                        type="radio"
                                        name="tipopago"
                                        value="tarjeta"
                                        checked={tipo_pago === true}
                                        //onChange={(e) => setTipoPago(e.target.value === "true")}
                                    />
                                    <label htmlFor="Tarjeta">Tarjeta</label>
                                </div>
                                <div className='radio-option'>
                                    <input
                                        type="radio"
                                        name="tipopago"
                                        value="efectivo"
                                        checked={tipo_pago === false}
                                        //onChange={(e) => setTipoPago(e.target.value === "true")}
                                    />
                                    <label htmlFor="Efectivo">Efectivo</label>
                                </div>


                                <div className='form-group mb-2'>
                                    <label className="form-label">Seleccione Fecha</label>
                                    <input
                                        type="date"
                                        name="fecha"
                                        className="form-control"
                                        required
                                        value={date}
                                        //onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>


                                <button className='btn btn-success' onClick={(e) => saveFactura(e)}>Save</button>
                                &nbsp;&nbsp;
                                <Link to='/facturas' className='btn btn-danger'>Cancelar</Link>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFactura;