package com.example.proyecto2backend.Data.Repository;

import com.example.proyecto2backend.Logic.Model.Proveedor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class HaciendaSTUBRepository implements InitializingBean {

    private final List<Proveedor> proveedores;

    public HaciendaSTUBRepository() {
        this.proveedores = new ArrayList<>();
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        saveStubData();
    }

    public void saveStubData() {
        // Crear datos quemados
        Proveedor proveedor1 = new Proveedor("117010975", "Rodrigo Castro Rojas", "rodrigo@gmail.com", "rodrigo");
        Proveedor proveedor2 = new Proveedor("901170162", "Jerry Solera Celestino", "jerrysc@gmail.com", "jerry");
        Proveedor proveedor3 = new Proveedor("115960719", "Eddy Villarreal Muñoz", "eddy.villarreal.munoz@est.una.ac.cr", "eddy");
        Proveedor proveedor4 = new Proveedor("118510810", "Felipe Herrera Granados", "felipe@gmail", "felipe");

        proveedores.add(proveedor1);
        proveedores.add(proveedor2);
        proveedores.add(proveedor3);
        proveedores.add(proveedor4);
    }

    @GetMapping("/STUB/proveedores/{id}")
    public Proveedor findProveedorById(@PathVariable String id) {
        for (Proveedor proveedor : proveedores) {
            if (proveedor.getId().equals(id)) {
                return proveedor;
            }
        }
        return null;
    }
}