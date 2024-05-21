package com.example.proyecto2backend.Presentation.Controller;

import com.example.proyecto2backend.Logic.Model.Producto;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.proyecto2backend.Data.Repository.ProductoRepository;
import com.example.proyecto2backend.Exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @GetMapping("/productos")
    public List<Producto> findAllProductos() {
        return productoRepository.findAll();
    }

    @PostMapping("/productos")
    public Producto saveProducto(@RequestBody Producto producto) {
        return productoRepository.save(producto);
    }

    public ResponseEntity<Producto> findProductoById(@PathVariable Integer id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto not found with id: " + id));
        return ResponseEntity.ok(producto);
    }

    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> updateProducto(@PathVariable Integer id, @RequestBody Producto producto) {

        Producto productoUpdate = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto not found with id: " + id));

        productoUpdate.setDescription(producto.getDescription());
        productoUpdate.setMeasure(producto.getMeasure());
        productoUpdate.setPrice(producto.getPrice());
        productoUpdate.setIvaFee(producto.getIvaFee());

        Producto updatedProducto = productoRepository.save(productoUpdate);
        return ResponseEntity.ok(updatedProducto);
    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProducto(@PathVariable Integer id) {
        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto not found with id: " + id));

        productoRepository.delete(producto);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}