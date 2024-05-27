package com.example.proyecto2backend.Presentation.Controller;

import com.example.proyecto2backend.Data.Repository.FacturaDetalleRepository;
import com.example.proyecto2backend.Data.Repository.FacturaRepository;
import com.example.proyecto2backend.Data.Repository.ProveedorRepository;
import com.example.proyecto2backend.Logic.Model.FacturaDetalle;
import com.example.proyecto2backend.Logic.Model.Producto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.proyecto2backend.Exception.ResourceNotFoundException;
import com.example.proyecto2backend.Logic.Model.Factura;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class FacturaController {
    @Autowired
    private FacturaRepository facturaRepository;

    @Autowired
    private FacturaDetalleRepository facturaDetalleRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ProveedorRepository proveedorRepository;

    @GetMapping("/facturas")
    public List<Factura> findAllFacturas(@RequestParam(required = false) String proveedorId) {
        return facturaRepository.findFacturasByProveedorId(proveedorId);
    }

    @PostMapping("/facturas")
    public Factura saveFactura(@RequestBody Map<String, Object> body) {

        Factura factura = objectMapper.convertValue(body.get("factura"), Factura.class);
        List<FacturaDetalle> listFacturaDetalles = objectMapper.convertValue(body.get("listFacturaDetalles"), new TypeReference<List<FacturaDetalle>>() {});
        List<FacturaDetalle> savedFacturaDetalles = new ArrayList<>(); // Crea una nueva lista para guardar los detalles de la factura

        factura = facturaRepository.save(factura); // Guarda la factura antes de guardar los detalles de la factura

        for(FacturaDetalle detalle : listFacturaDetalles){
            FacturaDetalle facturaDetalle = new FacturaDetalle();

            facturaDetalle.setIdProducto(detalle.getIdProducto());
            facturaDetalle.setCantidad(detalle.getCantidad());
            FacturaDetalle savedDetalle = facturaDetalleRepository.save(facturaDetalle);
            savedFacturaDetalles.add(savedDetalle);
        }
        factura.setListFacturaDetalle(savedFacturaDetalles);
        return facturaRepository.save(factura);
    }

    @GetMapping("/facturas/{id}")
    public ResponseEntity<Factura> findFacturaById(@PathVariable Long id) {
        Factura factura = facturaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Factura not found with id: " + id));
        return ResponseEntity.ok(factura);
    }
}
