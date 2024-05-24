import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Eliminar la información del usuario del almacenamiento local
        localStorage.removeItem('user');
        localStorage.removeItem('proveedorId');

        console.log("Usuario: ", localStorage.getItem('user'));

        // Redirigir al usuario a la página de inicio de sesión
        navigate('/');
    }, [navigate]);

    return null;
};

export default Logout;