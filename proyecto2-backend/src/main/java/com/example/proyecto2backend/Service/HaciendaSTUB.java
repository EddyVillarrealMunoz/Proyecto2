package com.example.proyecto2backend.Service;


import com.example.proyecto2backend.Data.Repository.ProveedorRepository;
import com.example.proyecto2backend.Logic.Model.Proveedor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@org.springframework.stereotype.Service
public class HaciendaSTUB {

    @Autowired
    private ProveedorRepository proveedorRepository;

    public boolean validateProveedorRegistration(Proveedor proveedor) {
        List<Proveedor> proveedoresRegistrados= proveedorRepository.findAll();
        for (Proveedor registeredProvider : proveedoresRegistrados) {
            if (registeredProvider.getId().equals(proveedor.getId())) {
                return false;
            }
        }
        return true;
    }

}
