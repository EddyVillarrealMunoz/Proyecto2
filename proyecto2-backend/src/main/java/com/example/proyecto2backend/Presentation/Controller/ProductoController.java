package com.example.proyecto2backend.Presentation.Controller;

import com.example.proyecto2backend.Data.Repository.ActComercialRepository;
import com.example.proyecto2backend.Data.Repository.ProductoRepository;
import com.example.proyecto2backend.Data.Repository.ProveedorRepository;
import com.example.proyecto2backend.Exception.ResourceNotFoundException;
import com.example.proyecto2backend.Logic.Model.ActComercial;
import com.example.proyecto2backend.Logic.Model.Producto;
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
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private ActComercialRepository actComercialRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    @GetMapping("/productos")
    public List<Producto> findAllProductos(@RequestParam String proveedorId) {
        return proveedorRepository.findProductosByProveedorId(proveedorId);
    }

    @GetMapping("/productos/{id}")
    public ResponseEntity<Producto> findProductoById(@PathVariable Integer id) {
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Producto not found with id: " + id));
        return ResponseEntity.ok(producto);
    }

    @GetMapping("/productos/actcomerciales/{id}")
    public ActComercial getActComercialByProductoId(@PathVariable Integer id) {
        return actComercialRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ActComercial not found with id: " + id));
    }

    @PostMapping("/productos")
    public Producto saveProducto(@RequestBody Producto producto, @RequestParam String proveedorId, @RequestParam Integer actComercialId) {
        System.out.println("Controller Crear producto: " + producto);
        //--------------------------------------------------------------------------------------------------------------
        // 1. Obtener el datos
        //--------------------------------------------------------------------------------------------------------------
        Proveedor proveedor = proveedorRepository.findById(proveedorId)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor not found with id: " + proveedorId));

        ActComercial actComercial = actComercialRepository.findById(actComercialId)
                .orElseThrow(() -> new ResourceNotFoundException("ActComercial not found with id: " + actComercialId));

        //--------------------------------------------------------------------------------------------------------------
        // 2. Setear
        //--------------------------------------------------------------------------------------------------------------
        producto.setProveedor(proveedor);
        producto.setActComercial(actComercial);

        //--------------------------------------------------------------------------------------------------------------
        // 3. Guardar el producto
        //--------------------------------------------------------------------------------------------------------------
        proveedor.getProductos().add(producto);

        return productoRepository.save(producto);
    }

    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> updateProducto(
            @PathVariable Integer id,
            @RequestBody Producto producto,
            @RequestParam String proveedorId,
            @RequestParam Integer actComercialId) {

        // Obtener el producto existente
        Producto productoUpdate = productoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto not found with id: " + id));

        // Obtener el proveedor
        Proveedor proveedor = proveedorRepository.findById(proveedorId)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor not found with id: " + proveedorId));

        // Obtener la actividad comercial
        ActComercial actComercial = actComercialRepository.findById(actComercialId)
                .orElseThrow(() -> new ResourceNotFoundException("ActComercial not found with id: " + actComercialId));

        // Actualizar los detalles del producto
        productoUpdate.setDescription(producto.getDescription());
        productoUpdate.setMeasure(producto.getMeasure());
        productoUpdate.setPrice(producto.getPrice());
        productoUpdate.setIvaFee(producto.getIvaFee());
        productoUpdate.setType(producto.getType());
        productoUpdate.setActComercial(actComercial); // Establecer la actividad comercial
        productoUpdate.setProveedor(proveedor); // Establecer el proveedor

        // Guardar el producto actualizado
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