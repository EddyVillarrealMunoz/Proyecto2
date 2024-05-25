import React, { useState, useEffect } from 'react';
import FacturaService from "../../Services/FacturaService";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf';

// Importa las imágenes de los botones
import pdfIcon from '../../images/pdf.png';
import xmlIcon from '../../images/xml.png';

export const ListFacturas = () => {
    const [facturas, setFacturas] = useState([]);
    const navigate = useNavigate();


    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');


    const generatePDF = (facturaData) => {
        const doc = new jsPDF();

        doc.text(20, 20, 'ID: ' + facturaData.id);
        doc.text(20, 30, 'Fecha: ' + facturaData.date);
        doc.text(20, 40, 'Proveedor: ' + facturaData.cedulaProveedor);
        doc.text(20, 50, 'Cliente: ' + facturaData.cedulaCliente);
        doc.text(20, 60, 'Tipo de Pago: ' + facturaData.tipoPago);
        doc.text(20, 70, 'Precio Final: ' + facturaData.finalPrice);

        doc.save('factura_numero' + facturaData.id + '.pdf');
    };


    const generateXML = (facturaData) => {

        const xmlContent = `
            <factura>
                <id>${facturaData.id}</id>
                <fecha>${facturaData.date}</fecha>
                <proveedor>${facturaData.cedulaProveedor}</proveedor>
                <cliente>${facturaData.cedulaCliente}</cliente>
                <tipo_pago>${facturaData.tipoPago}</tipo_pago>
                <precio_final>${facturaData.finalPrice}</precio_final>
            </factura>
        `;

        const blob = new Blob([xmlContent], { type: 'application/xml' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);

        link.download = `factura_numero${facturaData.id}.xml`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() =>
    {
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


    const handlePDFGeneration = (facturaId) => {
        generatePDF(facturas.find(factura => factura.id === facturaId));
    };

    const handleXMLGeneration = (facturaId) => {
        const facturaData = facturas.find(factura => factura.id === facturaId);
        generateXML(facturaData);
    };

    return (
        <div className='tabla-productos'>
            <h2>Facturas</h2>
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
                                        <img src={pdfIcon} alt="PDF Icon" />
                                    </button>
                                    <button className="xml-button" onClick={() => handleXMLGeneration(factura.id)}>
                                        <img src={xmlIcon} alt="XML Icon" />
                                    </button>
                                </td>
                            </tr>
                    )
                }
                </tbody>
            </table>
            <Link to="/save-facturas">Agregar Factura</Link>
        </div>
    );
}

export default ListFacturas;