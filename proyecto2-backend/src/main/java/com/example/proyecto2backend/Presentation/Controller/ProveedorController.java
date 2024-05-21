package com.example.proyecto2backend.Presentation.Controller;

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

    @PostMapping("/proveedores")
    public Proveedor saveProveedor(@RequestBody Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    public ResponseEntity<Proveedor> findProveedorById(@PathVariable String id) {
        Proveedor proveedor = proveedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor not found with id: " + id));
        return ResponseEntity.ok(proveedor);
    }

    @PutMapping("/proveedores/{id}")
    public ResponseEntity<Proveedor> updateProveedor(@PathVariable String id, @RequestBody Proveedor proveedor) {

        Proveedor proveedorUpdate = proveedorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor not found with id: " + id));

        proveedorUpdate.setName(proveedor.getName());
        proveedorUpdate.setEmail(proveedor.getEmail());
        proveedorUpdate.setPassword(proveedor.getPassword());
        proveedorUpdate.setAccepted(proveedor.isAccepted());

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