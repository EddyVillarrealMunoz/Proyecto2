import React, {useCallback, useEffect, useState} from 'react';
import FacturaService from "../../Services/FacturaService";
import {Link, useNavigate} from "react-router-dom";
import ProductoService from "../../Services/ProductoService";
import ClienteService from "../../Services/ClienteService";
import '../../css/style.css';
import {NumericFormat} from "react-number-format";

export const CreateFactura = () => {
    const [cedulaCliente, setCedulaCliente] = useState('');
    const [tipoPago, setTipoPago] = useState('');
    const [date, setDate] = useState(new Date());
    const [finalPrice, setFinalPrice] = useState(0);
    const [listFacturasDetalles, setListFacturasDetalles] = useState([]);
    const cedulaProveedor = localStorage.getItem('proveedorId');

    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [selectedProductos, setSelectedProductos] = useState([]);
    const [productoCantidades, setProductoCantidades] = useState({});
    const [selectedCliente, setSelectedCliente] = useState([]);

    const tipo_pago = ['Tarjeta', 'Efectivo'];
    const navigate = useNavigate();
    const proveedorId = localStorage.getItem('proveedorId');

    const fetchData = useCallback(async () => {
        try {
            const [productosData, clientesData] = await Promise.all([
                ProductoService.getProductos(proveedorId),
                ClienteService.getClientesByProveedor(proveedorId)
            ]);
            setProductos(productosData.data);
            setClientes(clientesData.data);
            console.log("Productos", productosData.data);
            console.log("Clientes",clientesData.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const saveFactura = useCallback(async (e) => {
        e.preventDefault();

        if (!cedulaCliente || !tipoPago || !date || selectedProductos.length === 0) {
            alert('Por favor, rellena todos los campos');
            return;
        }

        const total = selectedProductos.reduce((sum, producto) => {
            const cantidad = productoCantidades[producto.id] || 1;
            const precioConIva = producto.price * (1 + producto.ivaFee / 100);
            return sum + precioConIva * cantidad;
        }, 0);

        const facturaDetalle = selectedProductos.map((producto, index) => {
            return {
                idProducto: producto.id,
                cantidad: productoCantidades[producto.id] || 1,
            };
        });

        const factura = {
            cedulaProveedor,
            cedulaCliente,
            tipoPago,
            date,
            finalPrice: parseFloat(total.toFixed(2)),
        };

        try {
            await FacturaService.saveFactura(factura, facturaDetalle);
            alert('Factura creada correctamente');
            navigate('/facturas');
        } catch (error) {
            console.error(error);
            alert('Hubo un error al guardar la factura');
        }
    }, [cedulaCliente, tipoPago, date, selectedProductos, productoCantidades, cedulaProveedor, navigate]);

    const handleDateChange = (e) => {
        setDate(new Date(e.target.value));
    };

    return (
        <div className={"container"}>
            <br/>
            <br/>
            <div className='card col-md-10 offset-md-1'>
                <h1 className={"text-center card-header"}>Crear Factura</h1>;
                <div className='card-body'>
                    <form>
                        <div className={"mb-3"}>
                            <h4 className="form-label">Producto</h4>
                            <br/>
                            {productos.length > 0 ? (
                                <div className="table-responsive">
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
                                                <td>{producto.ivaFee}%</td>
                                                <td>{producto.measure}</td>
                                                <td>₡{producto.price.toLocaleString('es-CR')}</td>
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
                                                    <NumericFormat type="number" min="1" name="cantidad"
                                                                   decimalScale={2}
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
                                </div>
                            ) : (
                                <p>Actualmente no existen productos para elegir</p>
                            )}
                        </div>
                        <div className={"mb-3"}>
                            <h4 className="form-label">Cliente</h4>
                            <br/>
                            {clientes.length > 0 ? (
                                <div className="table-responsive">
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
                                                               setCedulaCliente(cliente.id);
                                                           }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p>Actualmente no existen clientes para elegir</p>
                            )}
                        </div>
                        <div className='radio-option'>
                            <input
                                type="radio"
                                name="tipopago"
                                value="tarjeta"
                                checked={tipoPago === 'tarjeta'}
                                onChange={(e) => setTipoPago(e.target.value)}
                            />
                            <label htmlFor="Tarjeta">Tarjeta</label>
                        </div>
                        <div className='radio-option'>
                            <input
                                type="radio"
                                name="tipopago"
                                value="efectivo"
                                checked={tipoPago === 'efectivo'}
                                onChange={(e) => setTipoPago(e.target.value)}
                            />
                            <label htmlFor="Efectivo">Efectivo</label>
                        </div>
                        <div className={"mb-3"}>
                            <label className="form-label">Seleccione Fecha</label>
                            <input
                                type="date"
                                name="fecha"
                                className="form-control"
                                required
                                value={date.toISOString().substr(0, 10)}
                                onChange={handleDateChange}
                            />
                        </div>
                        <button className='btn btn-success' onClick={(e) => saveFactura(e)}>Save</button>
                        &nbsp;&nbsp;
                        <Link to='/facturas' className='btn btn-danger'>Cancelar</Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateFactura;