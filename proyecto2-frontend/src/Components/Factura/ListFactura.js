import React, {useEffect, useState} from 'react';
import FacturaService from "../../Services/FacturaService";
import {useNavigate} from 'react-router-dom';

export const ListFacturas = () => {
    //------------------------------------------------------------------------------------------------------------------
    // CONSTANTES
    //------------------------------------------------------------------------------------------------------------------
    const [facturas, setFacturas] = useState([]);
    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    //------------------------------------------------------------------------------------------------------------------
    // Validar credenciales / Obtener data
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        // Obtener la información del usuario y id del proveedor que ha ingresado a este componente
        const user = JSON.parse(localStorage.getItem('user'));
        const proveedorId = localStorage.getItem('proveedorId');

        // Verificar si el usuario ha iniciado sesión
        if (!user) {
            alert('Debe iniciar sesión para acceder a esta página');
            navigate('/login');
            return;
        }

        // Verificar si el usuario es un proveedor
        if (user.rol !== 'PRO') {
            alert('Permisos denegados');
            navigate('/login');
            return;
        }

    }, []);

    useEffect(() => {
        FacturaService.getFacturas().then((response) => {
            setFacturas(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    //------------------------------------------------------------------------------------------------------------------
    // FUNCIONES
    //------------------------------------------------------------------------------------------------------------------
    function addFactura() {
        console.log("Agregar Factura");
        navigate("/save-facturas");
    }

    function viewFactura(id) {
        console.log("Ver factura con id: ", id);
        navigate(`/facturas/view/${id}`);
    }


    //------------------------------------------------------------------------------------------------------------------
    // RENDERIZADO
    //------------------------------------------------------------------------------------------------------------------
    return (
        <div className='tabla-productos'>
            <br/>
            <h1>Facturas</h1>
            <button className="btn btn-primary mb-1 float-end" onClick={addFactura}>Nuevo Factura</button>
            <table>
                <thead>
                    <tr className={"text-center"}>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Proveedor</th>
                        <th>Cliente</th>
                        <th>Tipo_Pago</th>
                        <th>Precio_Final</th>
                        <th>Generar PDF/XML</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        facturas.map(factura =>
                            <tr key={factura.id}>
                                <td>{factura.id}</td>
                                <td>{factura.date}</td>
                                <td>{factura.cedulaProveedor}</td>
                                <td>{factura.cedulaCliente}</td>
                                <td>{factura.tipoPago}</td>
                                <td>₡{factura.finalPrice.toLocaleString('es-CR')}</td>
                                <td>
                                    <div className={"text-center"}>
                                        <button className="btn btn-info m-1"
                                                onClick={() => viewFactura(factura.id)}>Ver
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

export default ListFacturas;