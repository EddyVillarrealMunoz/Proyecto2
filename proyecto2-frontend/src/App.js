import './App.css';

import AdminProfile from "./Components/Admin/ProfileAdmin";

import CreateProducto from "./Components/Producto/CreateProducto";
import ListProductos from "./Components/Producto/ListProductos";

import CreateProveedor from "./Components/Proveedor/CreateProveedor";
import ProfileProveedor from "./Components/Proveedor/ProfileProveedor";

import ListClientes from "./Components/Cliente/ListCliente";
import CreateCliente from "./Components/Cliente/CreateCliente";

import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListFacturas from "./Components/Factura/ListFactura";
import CreateFactura from "./Components/Factura/CreateFactura";
import FacturaCompleta from "./Components/Factura/FacturaCompleta";

function App() {
  return (
    <div >
        <BrowserRouter>
            {<Header/>}
            <div className={"container min-vh-100"}>
                <Routes>
                    <Route exact path = '/'                           element = {< Login />}> </Route>
                    <Route exact path = '/login'                      element = {< Login />}> </Route>
                    <Route exact path = '/logout'                     element = {< Logout />}> </Route>
                    <Route exact path = '/save-proveedor'             element = {< CreateProveedor/>}></Route>
                    <Route exact path = '/update-proveedor/:idUpdate' element = {< CreateProveedor/>}></Route>
                    <Route exact path = '/proveedor-profile/'         element = {< ProfileProveedor/>}></Route>
                    <Route exact path = '/profile-proveedor/:id'      element = {< ProfileProveedor/>}></Route>

                    <Route exact path = '/admin-profile/'             element = {< AdminProfile/>}></Route>

                    <Route exact path = '/save-productos'             element = {< CreateProducto/>}></Route>
                    <Route exact path = '/productos'                  element = {< ListProductos/>}></Route>
                    <Route exact path = '/productos/view/:id'         element = {< CreateProducto mode={"view"}/>}></Route>
                    <Route exact path = '/update-producto/:id'        element = {< CreateProducto mode={"edit"}/>}></Route>


                    <Route exact path = '/save-clientes'              element = {< CreateCliente/>}></Route>
                    <Route exact path = '/clientes/edit/:idP'         element = {< CreateCliente mode={"edit"}/>}></Route>
                    <Route exact path = '/clientes/view/:idP'         element = {< CreateCliente mode={"view"}/>}></Route>
                    <Route exact path = '/clientes'                   element = {< ListClientes/>}></Route>

                    <Route exact path = '/facturas'                   element=  {< ListFacturas/>}></Route>
                    <Route exact path=  '/facturas/view/:idP'         element= {< FacturaCompleta mode={"view"}/>}></Route>
                    <Route exact path = '/save-facturas'              element=  {< CreateFactura/>}></Route>
                </Routes>
            </div>
            {<Footer/>}
        </BrowserRouter>
    </div>
  );
}

export default App;