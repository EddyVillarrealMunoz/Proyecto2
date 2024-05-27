import React, { useState, useEffect } from 'react';
import FacturaService from "../../Services/FacturaService";
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

// Importa las imágenes de los botones
import pdfIcon from '../../images/pdf.png';
import xmlIcon from '../../images/xml.png';

export const ListFacturas = () => {
    //------------------------------------------------------------------------------------------------------------------
    // CONSTANTES
    //------------------------------------------------------------------------------------------------------------------
    const [facturas, setFacturas] = useState([]);
    const navigate = useNavigate();
    const proveedorId = localStorage.getItem('proveedorId');

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const generatePDF = async (facturaData) => {
        const doc = new jsPDF();

        doc.text(20, 20, 'ID: ' + facturaData.id);
        doc.text(20, 30, 'Fecha: ' + facturaData.date);
        doc.text(20, 40, 'Proveedor: ' + facturaData.cedulaProveedor);
        doc.text(20, 50, 'Cliente: ' + facturaData.cedulaCliente);
        doc.text(20, 60, 'Tipo de Pago: ' + facturaData.tipoPago);
        doc.text(20, 70, 'Detalles de Factura:');

        let y = 80; // Posición inicial para los detalles de la factura

        for (const detalle of facturaData.listFacturaDetalle) {
            const descripcion = await FacturaService.getProductDescription(detalle.idProducto);
            const iva = await FacturaService.getProductIVA(detalle.idProducto);
            const precio = await FacturaService.getProductPrice(detalle.idProducto);
            doc.text(20, y, `Descripción: ${descripcion}, Cantidad: ${detalle.cantidad}, IVA: ${iva}, Precio: ${precio}`);
            y += 10; // Incrementa la posición para el siguiente detalle
        }

        y += 10; // Incrementa la posición para evitar superposición con el precio final
        doc.text(20, y, 'Precio Final: ' + facturaData.finalPrice);

        doc.save('factura_numero' + facturaData.id + '.pdf');
    };

    const generateXML = async (facturaData) => {
        let xmlContent = `
        <factura>
            <id>${facturaData.id}</id>
            <fecha>${facturaData.date}</fecha>
            <proveedor>${facturaData.cedulaProveedor}</proveedor>
            <cliente>${facturaData.cedulaCliente}</cliente>
            <tipo_pago>${facturaData.tipoPago}</tipo_pago>
            <precio_final>${facturaData.finalPrice}</precio_final>
            <detalles_factura>`;

        for (const detalle of facturaData.listFacturaDetalle) {
            const descripcion = await FacturaService.getProductDescription(detalle.idProducto);
            const iva = await FacturaService.getProductIVA(detalle.idProducto);
            const precio = await FacturaService.getProductPrice(detalle.idProducto);
            xmlContent += `<detalle><descripcion>${descripcion}</descripcion><cantidad>${detalle.cantidad}</cantidad><iva>${iva}</iva><precio>${precio}</precio></detalle>`;
        }

        xmlContent += `</detalles_factura></factura>`;

        const blob = new Blob([xmlContent], { type: 'application/xml' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);

        link.download = `factura_numero${facturaData.id}.xml`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    //------------------------------------------------------------------------------------------------------------------
    // Validar credenciales / Obtener data
    //------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        // Obtener la información del usuario y id del proveedor que ha ingresado a este componente
        const user = JSON.parse(localStorage.getItem('user'));

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

        // Verificar si se tiene proveedorId
        if (!proveedorId) {
            alert('ID del proveedor no encontrado');
            navigate('/login');
            return;
        }

        // Obtener las facturas del proveedor
        FacturaService.getFacturas(proveedorId).then((response) => {
            setFacturas(response.data);
        }).catch((error) => {
            console.log(error);
        });

    }, [navigate, proveedorId]);




    //------------------------------------------------------------------------------------------------------------------
    // FUNCIONES
    //------------------------------------------------------------------------------------------------------------------
    function addFactura() {
        navigate("/save-facturas");
    }

    function viewFactura(idP) {
        console.log("Ver Factura con id: ", idP);
        navigate(`/facturas/view/${idP}`); // Utiliza navigate en lugar de navigator
    }

    const handleVerClick = (facturaId) => {
        // Guarda el ID de la factura en el localStorage
        localStorage.setItem('facturaId', facturaId);
        // Navega a la página FacturaCompleta
        navigate(`/facturas/view/${facturaId}`);
    };

    const handlePDFGeneration = (facturaId) => {
        generatePDF(facturas.find(factura => factura.id === facturaId));
    };

    const handleXMLGeneration = (facturaId) => {
        const facturaData = facturas.find(factura => factura.id === facturaId);
        generateXML(facturaData);
    };
    //------------------------------------------------------------------------------------------------------------------
    // RENDER
    //------------------------------------------------------------------------------------------------------------------
    return (
        <div className='tabla-productos'>
            <br/>
            <h1>Facturas</h1>
            <button className="btn btn-primary mb-1 float-end" onClick={addFactura}>Nueva Factura</button>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Proveedor</th>
                    <th>Cliente</th>
                    <th>Tipo_Pago</th>
                    <th>Precio_Final</th>
                    <th>Generar PDF/XML</th>
                    <th>Factura Completa</th>
                </tr>
                </thead>
                <tbody>
                {
                    facturas.map(
                        factura =>
                            <tr key={factura.id}>
                                <td>{factura.id}</td>
                                <td>{factura.date}</td>
                                <td>{factura.cedulaProveedor}</td>
                                <td>{factura.cedulaCliente}</td>
                                <td>{factura.tipoPago}</td>
                                <td>{factura.finalPrice}</td>
                                <td>
                                    {/* Agrega las clases de los botones de PDF y XML */}
                                    <button className="pdf-button" onClick={() => handlePDFGeneration(factura.id)}>
                                        <img src={pdfIcon} alt="PDF Icon"/>
                                    </button>
                                    <button className="xml-button" onClick={() => handleXMLGeneration(factura.id)}>
                                        <img src={xmlIcon} alt="XML Icon"/>
                                    </button>
                                </td>
                                <td>
                                    <div className={"text-center"}>
                                        <button className="btn btn-info m-1"
                                                onClick={() => handleVerClick(factura.id)}>Ver
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
