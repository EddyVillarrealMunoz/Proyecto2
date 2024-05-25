package com.example.proyecto2backend.Security;

import com.example.proyecto2backend.Data.Repository.AdminRepository;
import com.example.proyecto2backend.Data.Repository.HaciendaSTUBRepository;
import com.example.proyecto2backend.Data.Repository.ProveedorRepository;
import com.example.proyecto2backend.Logic.Model.Admin;
import com.example.proyecto2backend.Logic.Model.Cliente;
import com.example.proyecto2backend.Logic.Model.Proveedor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    ProveedorRepository proveedorRepository;

    @Autowired
    AdminRepository adminRepository;
    HaciendaSTUBRepository haciendaSTUBRepository;


    public Object login(String id, String password) {
        Admin admin;
        Proveedor proveedor;


        try {
          Cliente cliente = haciendaSTUBRepository.getClienteHacienda(id);
        } catch (Exception e) {
            return null;
        }

        // Primero intenta encontrar al usuario en el repositorio de Admin
        admin = adminRepository.findById(id).orElse(null);
        if (admin != null && admin.getPassword().equals(password)) {
            return admin;
        }

        // Si no se encuentra en el repositorio de Admin, intenta encontrarlo en el repositorio de Proveedor
        proveedor = proveedorRepository.findById(id).orElse(null);
        if (proveedor != null && proveedor.getPassword().equals(password)) {
            return proveedor;
        }

        // Si no se encuentra en ninguno de los repositorios, lanza una excepción
        throw new RuntimeException("User not found or invalid password");
    }
}