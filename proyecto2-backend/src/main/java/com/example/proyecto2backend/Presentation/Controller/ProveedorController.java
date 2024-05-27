package com.example.proyecto2backend.Presentation.Controller;

import com.example.proyecto2backend.Logic.Model.ActComercial;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.proyecto2backend.Data.Repository.ProveedorRepository;
import com.example.proyecto2backend.Exception.ResourceNotFoundException;
import com.example.proyecto2backend.Logic.Model.Proveedor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ProveedorController {

    @Autowired
    private ProveedorRepository proveedorRepository;

    @GetMapping("/proveedores")
    public List<Proveedor> findAllProveedores() {
        return proveedorRepository.findAll();
    }

    @GetMapping("/proveedores/{id}")
    public ResponseEntity<Proveedor> findProveedorById(@PathVariable String id)
    {
        Proveedor proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor not found with id: " + id));

        System.out.println("GET Proveedor: " + proveedor.toString());
        return ResponseEntity.ok(proveedor);
    }

    @GetMapping("/proveedores/actcomerciales/{id}")
    public ResponseEntity<List<ActComercial>> getActComercialesByProveedorId(@PathVariable String id) {
        Proveedor proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor not found with id: " + id));
        List<ActComercial> actComerciales = proveedor.getActComerciales();
        return ResponseEntity.ok(actComerciales);
    }

    @PostMapping("/proveedores")
    public Proveedor saveProveedor(@RequestBody Proveedor proveedor) {
        System.out.println("Controller Post Proveedor" + proveedor.toString());

        return proveedorRepository.save(proveedor);
    }

    @PutMapping("/proveedores/{idUpdate}")
    public ResponseEntity<Proveedor> updateProveedor(@PathVariable String idUpdate, @RequestBody Proveedor proveedor) {
        Proveedor proveedorUpdate = proveedorRepository.findById(idUpdate)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor not found with id: " + idUpdate));

        proveedorUpdate.setName(proveedor.getName());
        proveedorUpdate.setEmail(proveedor.getEmail());
        proveedorUpdate.setPassword(proveedor.getPassword());
        proveedorUpdate.setAccepted(proveedor.isAccepted());
        proveedorUpdate.setActComerciales(proveedor.getActComerciales());

        Proveedor updatedProveedor = proveedorRepository.save(proveedorUpdate);
        return ResponseEntity.ok(updatedProveedor);
    }

    @DeleteMapping("/proveedores/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProveedor(@PathVariable String id) {
        Proveedor proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor not found with id: " + id));

        proveedorRepository.delete(proveedor);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}