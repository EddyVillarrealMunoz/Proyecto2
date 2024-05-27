import React, { useState, useEffect } from 'react';
import FacturaService from "../../Services/FacturaService";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf';
import '../../css/style.css';
import {NumericFormat} from "react-number-format";

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




return (
    <div id="factura">
        <div id="encabezado">
            <img id="logo" src="" alt="Logo"/>
            <div id="informacion-cliente">
                <h3>Cliente</h3>
                <p>Jose Luis</p>
                <p>Teléfono: 5067070-7888</p>
                <p>Email: jose@test.com</p>
            </div>
            <div id="informacion-factura">
                <h3>Factura</h3>
                <p>Número: 12345</p>
                <p>Fecha: 25/05/2024</p>
                <p>Pago: Efectivo</p>
            </div>
        </div>

        <table id="tabla-productos">
            <thead>
            <tr>
                <th>CÓDIGO</th>
                <th>CANT.</th>
                <th>DESCRIPCIÓN</th>
                <th>PRECIO UNIT.</th>
                <th>PRECIO TOTAL</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>ST01</td>
                <td>1</td>
                <td>Diseño de página web</td>
                <td>250.00</td>
                <td>250.00</td>
            </tr>
            <tr>
                <td>HT01</td>
                <td>1</td>
                <td>Plan de Hosting Anual</td>
                <td>99.00</td>
                <td>99.00</td>
            </tr>
            <tr>
                <td>LG01</td>
                <td>1</td>
                <td>Diseño de logo</td>
                <td>56.00</td>
                <td>56.00</td>
            </tr>
            <tr>
                <td>VD01</td>
                <td>1</td>
                <td>Creación de video corporativo</td>
                <td>99.00</td>
                <td>99.00</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
                <th colSpan="4">SUBTOTAL S</th>
                <td>504.00</td>
            </tr>
            <tr>
                <th colSpan="4">IVA (13)%</th>
                <td>65.52</td>
            </tr>
            <tr>
                <th colSpan="4">TOTAL S</th>
                <td>569.52</td>
            </tr>
            </tfoot>
        </table>
    </div>
);
