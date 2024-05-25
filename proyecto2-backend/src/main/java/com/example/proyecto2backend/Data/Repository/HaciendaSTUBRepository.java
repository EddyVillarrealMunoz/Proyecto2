package com.example.proyecto2backend.Data.Repository;

import com.example.proyecto2backend.Logic.Model.Cliente;

import java.util.ArrayList;
import java.util.List;

public class HaciendaSTUBRepository {
    List<Cliente> clientes;

    public HaciendaSTUBRepository() {
        clientes = new ArrayList<Cliente>();
        Cliente pcliente;

        clientes.add(new Cliente("117010975", true, "Rodrigo Castro Rojas", "San Jose", "88888888", "rodrigo@gmail.com", null));
        clientes.add(new Cliente("3102088049",false, "Suplidora Electromecanica","Heredia,Costa Rica", "22601006","heredia@gdiez.com",null));
        clientes.add(new Cliente("901170162",false,"Jerry Solera Celestino","Heredia Costa Rica","84396547","jerrysc@gmail.com",null));
        clientes.add(new Cliente("115960719",true, "Eddy Villarreal Muñoz","Alajuela, Costa Rica", "87532884","eddy.villarreal.munoz@est.una.ac.cr",null));
        clientes.add(new Cliente("118510810",false, "Felipe Herrera Granados", "San Jose", "84243807", "felipe@gmail", null));
        System.out.println("Hacienda num elements: " + clientes.size());
    }
    public Cliente getClienteById(String id) throws Exception {
        try
        {
            for (Cliente cliente : clientes)
            {
                if (cliente.getId().equals(id))
                {
                    return cliente;
                }
            }
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        return null;
    }

    public int getNumClientes() {
        return clientes.size();
    }

    public Cliente getClienteHacienda(String id) throws Exception {
        try
        {
            System.out.println("Service getClienteHacienda id: " + id);
            return getClienteById(id);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
            return null;
        }
    }


}
