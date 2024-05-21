import React from 'react';
import '../css/style.css';
import facturaImage from '../images/factura.png';
import { Link } from "react-router-dom";

export const indexComponent = () => {
    return (
        <>
            <div>
                {<img src={facturaImage} alt="img"/>}
            </div>

            {<Link className={'loginRef'} to="/login">Login</Link>}

        </>
    )
}

export default indexComponent;