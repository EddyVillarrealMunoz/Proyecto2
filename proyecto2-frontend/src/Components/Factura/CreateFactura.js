import React, { useState } from 'react';
import FacturaService from "../../Services/FacturaService";
import { Link, useNavigate } from "react-router-dom";

import '../../css/style.css';

export const CreateFactura = () => {



    const[cedulaCliente,setCedulaCliente]=useState('');
    const[tipoPago,setTipoPago]=useState('');
    const[date,setDate]=useState('');
    const [idProducto, setIdProducto] = useState('');
    //const [cantidad,setCantidad]=useState('');
    const[finalPrice,setFinalPrice]=useState('');
    const[listFacturasDetalles,setlistFacturasDetalles]=useState('');
    const[cedulaProveedor,setCedulaProveedor]=useState('');

    const tipo_pago = ['tarjeta','efectivo'];
    const navigate = useNavigate();

    const saveFactura = async (e) => {
        e.preventDefault();

        if ( !idProducto || !cedulaCliente || !tipoPago || !date) { // Validación de los campos del formulario
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



    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h1 className='text-center'>
                            <p className='text-center'>Creando Factura</p>
                        </h1>
                        <div className='card-body'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateFactura;