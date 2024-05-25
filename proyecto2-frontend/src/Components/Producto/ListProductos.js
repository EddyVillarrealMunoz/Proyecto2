import React, {useEffect, useState} from 'react';
import ProductoService from "../../Services/ProductoService";
import {Link, useNavigate} from 'react-router-dom';

export const ListProductos = () => {

    //------------------------------------------------------------------------------------------------------------------
    // CONSTANTES
    //------------------------------------------------------------------------------------------------------------------
    const [productos, setProductos] = useState([]);
    const navigator = useNavigate();

    //------------------------------------------------------------------------------------------------------------------
    // Obtener los productos
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        ProductoService.getProductos().then((response) => {
            setProductos(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    //------------------------------------------------------------------------------------------------------------------
    // FUNCIONES
    //------------------------------------------------------------------------------------------------------------------
    function addProducto() {
        navigator("/save-productos");
    }
    function viewProducto(id) {
        navigator(`/productos/view/${id}`);
    }
    function removeProducto(id) {
        console.log("Eliminar producto con id: ", id);

        ProductoService.deleteProducto(id).then(() => {
            ProductoService.getProductos().then((response) => {
                setProductos(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    //------------------------------------------------------------------------------------------------------------------
    // RENDERIZADO
    //------------------------------------------------------------------------------------------------------------------
    return (
        <div className='tabla-productos'>
            <br/>
            <h1>Productos</h1>
            <button className="btn btn-primary mb-1 float-end" onClick={addProducto}>Nuevo Produto</button>
            <table>
                <thead>
                    <tr className={"text-center"}>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Medida</th>
                        <th>Precio</th>
                        <th>IVA</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto =>
                        <tr key={producto.id}>
                            <td>{producto.type ? "Producto" : "Servicio"}</td>
                            <td>{producto.description}</td>
                            <td>{producto.measure}</td>
                            <td>₡{producto.price.toLocaleString('es-CR')}</td>
                            <td>{producto.ivaFee}%</td>
                            <td>
                            <div className={"text-center"}>
                                    <Link className='btn btn-warning m-1' to={`/update-producto/${producto.id}`}>Editar</Link>
                                    <button className="btn btn-info m-1" onClick={() => viewProducto(producto.id)}>Ver
                                    </button>
                                    <button className="btn btn-danger m-1"
                                            onClick={() => removeProducto(producto.id)}>Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListProductos;