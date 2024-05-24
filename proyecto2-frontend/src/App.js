import './App.css';

import AdminProfile from "./Components/Admin/ProfileAdmin";

import CreateProducto from "./Components/Producto/CreateProducto";
import ListProductos from "./Components/Producto/ListProductos";

import CreateProveedor from "./Components/Proveedor/CreateProveedor";
import ProfileProveedor from "./Components/Proveedor/ProfileProveedor";

import ListClientes from "./Components/Cliente/ListCliente";
import CreateCliente from "./Components/Cliente/CreateCliente";

import Login from "./Components/Login";

import IndexComponent from "./Components/IndexComponent";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListFacturas from "./Components/Factura/ListFactura";
import CreateFactura from "./Components/Factura/CreateFactura";

function App() {
  return (
    <div >
        <BrowserRouter>
            {<Header/>}
            <div className='container'>
                <Routes>
                    <Route exact path = '/'                           element = {< IndexComponent />}> </Route>
                    <Route exact path = '/login'                      element = {< Login />}> </Route>
                    <Route exact path = '/save-proveedor'             element = {< CreateProveedor/>}></Route>
                    <Route exact path = '/update-proveedor/:idUpdate' element = {< CreateProveedor/>}></Route>
                    <Route exact path = '/proveedor-profile/'         element = {< ProfileProveedor/>}></Route>
                    <Route exact path = '/admin-profile/'             element = {< AdminProfile/>}></Route>

                    <Route exact path = '/save-productos'             element = {< CreateProducto/>}></Route>
                    <Route exact path = '/productos'                  element = {< ListProductos/>}></Route>
                    <Route exact path = '/productos/view/:id'         element = {< CreateProducto/>}></Route>


                    <Route exact path = '/save-clientes'              element = {< CreateCliente/>}></Route>
                    <Route exact path = '/clientes/view/:idP'         element = {< CreateCliente/>}></Route>
                    <Route exact path = '/clientes'                   element = {< ListClientes/>}></Route>

                    <Route exact path = '/profile-proveedor/:id'      element = {< ProfileProveedor/>}></Route>
                    <Route exact path = '/facturas'                   element=  {< ListFacturas/>}></Route>
                    <Route exact path = '/save-facturas'              element=  {< CreateFactura/>}></Route>
                    <Route exact path = '/update-producto/:id'        element = {< CreateProducto/>}></Route>
                </Routes>
            </div>
            {<Footer/>}
        </BrowserRouter>
    </div>
  );
}

export default App;