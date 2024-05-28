package com.example.proyecto2backend.Data.Repository;

import com.example.proyecto2backend.Logic.Model.ActComercial;
import com.example.proyecto2backend.Logic.Model.Cliente;
import com.example.proyecto2backend.Logic.Model.Producto;
import com.example.proyecto2backend.Logic.Model.Proveedor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

public class HaciendaSTUBRepository {

List<Proveedor> proveedores;
List<ActComercial> actComercial;

List<Cliente> clientes;

List<Producto> productos;
    public HaciendaSTUBRepository() {

        actComercial.add(new ActComercial(1, "Actividad 1"));
        actComercial.add(new ActComercial(2, "Actividad 2"));
        actComercial.add(new ActComercial(3, "Actividad 3"));
        actComercial.add(new ActComercial(4, "Actividad 4"));
        actComercial.add(new ActComercial(5, "Actividad 5"));

        clientes.add(new Cliente("117010975", true, "Rodrigo Castro Rojas", "San Jose", "88888888", "rodrigo@gmail.com", null));
        clientes.add(new Cliente("3102088049", false, "Suplidora Electromecanica","Heredia,Costa Rica", "22601006","heredia@gdiez.com",null));
        clientes.add(new Cliente("901170162",false,"Jerry Solera Celestino","Heredia Costa Rica","84396547","jerrysc@gmail.com",null));
        clientes.add(new Cliente("115960719",false, "Eddy Villarreal Muñoz","Alajuela, Costa Rica", "87532884","eddy.villarreal.munoz@est.una.ac.cr",null));
        clientes.add(new Cliente("118510810",true, "Felipe Herrera Granados", "San Jose", "84243807", "felipe@gmail", null));

        proveedores.add(new Proveedor("1", "Proveedor 1", "proveedor1@example.com", "12345678", true, "PRO", actComercial, clientes, productos));
        proveedores.add(new Proveedor("2", "Proveedor 2", "proveedor2@example.com", "12345678", true, "PRO", actComercial, clientes, productos));
        proveedores.add(new Proveedor("3", "Proveedor 3", "proveedor3@example.com", "12345678", true, "PRO", actComercial, clientes, productos));
        proveedores.add(new Proveedor("4", "Proveedor 4", "proveedor4@example.com", "12345678", true, "PRO", actComercial, clientes, productos));
        proveedores.add(new Proveedor("5", "Proveedor 5", "proveedor5@example.com", "12345678", true, "PRO", actComercial, clientes, productos));
        proveedores.add(new Proveedor("6", "Proveedor 6", "proveedor6@example.com", "12345678", true, "PRO", actComercial, clientes, productos));
        proveedores.add(new Proveedor("7", "Proveedor 7", "proveedor7@example.com", "12345678", true, "PRO", actComercial, clientes, productos));
        proveedores.add(new Proveedor("8", "Proveedor 8", "proveedor8@example.com", "12345678", true, "PRO", actComercial, clientes, productos));
        proveedores.add(new Proveedor("9", "Proveedor 9", "proveedor9@example.com", "12345678", true, "PRO", actComercial, clientes, productos));
        proveedores.add(new Proveedor("10", "Proveedor 10", "proveedor10@example.com", "12345678", true, "PRO", actComercial, clientes, productos));

        System.out.println("Hacienda num elements: " + proveedores.size());
    }

    public Proveedor getProveedorById(String id) throws Exception {
        try
        {
            for (Proveedor proveedor : proveedores)
            {
                if (proveedor.getId().equals(id))
                {
                    return proveedor;
                }
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return null;
    }



    public List<Proveedor> findAll() {
        return proveedores;
    }
}
