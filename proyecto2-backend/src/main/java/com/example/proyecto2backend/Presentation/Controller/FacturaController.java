package com.example.proyecto2backend.Presentation.Controller;

import com.example.proyecto2backend.Data.Repository.FacturaRepository;
import com.example.proyecto2backend.Data.Repository.ProductoRepository;
import com.example.proyecto2backend.Logic.Model.FacturaDetalle;
import com.example.proyecto2backend.Logic.Model.Producto;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.proyecto2backend.Data.Repository.ClienteRepository;
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

    @GetMapping("/facturas")
    public List<Factura> findAllFacturas() {
        return facturaRepository.findAll();
    }

    @PostMapping("/facturas")
    public Factura saveFactura(@RequestBody Factura factura) {
        return facturaRepository.save(factura);
    }

    public ResponseEntity<Factura> findFacturaById(@PathVariable Long id) {
        Factura factura = facturaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Factura not found with id: " + id));
        return ResponseEntity.ok(factura);
    }

    @PutMapping("/facturas/{id}")
    public ResponseEntity<Factura> updateFactura(@PathVariable Long id, @RequestBody Factura factura) {

        Factura facturaUpdate = facturaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Factura not found with id: " + id));

        facturaUpdate.setDate(factura.getDate());
        facturaUpdate.setCedulaProveedor(factura.getCedulaProveedor());
        facturaUpdate.setCedulaCliente(factura.getCedulaCliente());
        facturaUpdate.setTipoPago(factura.getTipoPago());
        facturaUpdate.setFinalPrice(factura.getFinalPrice());
        facturaUpdate.setListFacturasDetalles(factura.getListFacturasDetalles());

        Factura updatedFactura = facturaRepository.save(facturaUpdate);
        return ResponseEntity.ok(updatedFactura);
    }

    @DeleteMapping("/facturas/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteFactura(@PathVariable Long id) {
        Factura factura = facturaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Factura not found with id: " + id));

        facturaRepository.delete(factura);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }


}
