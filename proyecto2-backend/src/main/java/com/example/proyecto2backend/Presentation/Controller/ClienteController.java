package com.example.proyecto2backend.Presentation.Controller;

import com.example.proyecto2backend.Data.Repository.ProveedorRepository;
import com.example.proyecto2backend.Logic.Model.Proveedor;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.proyecto2backend.Data.Repository.ClienteRepository;
import com.example.proyecto2backend.Exception.ResourceNotFoundException;
import com.example.proyecto2backend.Logic.Model.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProveedorRepository proveedorRepository;

    @GetMapping("/clientes")
    public List<Cliente> findAllClientes() {
        return clienteRepository.findAll();
    }

    @PostMapping("/clientes")
    public Cliente saveCliente(@RequestBody Cliente cliente, @RequestParam String proveedorId) {
        Proveedor proveedor = proveedorRepository.findById(proveedorId)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor not found with id: " + proveedorId));


        proveedor.getClientes().add(cliente); // Agregar el cliente a la lista de clientes del proveedor
        proveedorRepository.save(proveedor); // Guardar el proveedor, lo que también guardará el cliente debido a la relación CascadeType.ALL

        return cliente;
    }

    @GetMapping("/clientes/proveedor/{proveedorId}")
    public List<Cliente> findClientesByProveedor(@PathVariable String proveedorId) {
        Proveedor proveedor = proveedorRepository.findById(proveedorId)
                .orElseThrow(() -> new ResourceNotFoundException("Proveedor not found with id: " + proveedorId));
        return proveedor.getClientes();
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> findClienteById(@PathVariable String id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente not found with id: " + id));
        return ResponseEntity.ok(cliente);
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable String id, @RequestBody Cliente cliente) {

        Cliente clienteUpdate = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente not found with id: " + id));

        clienteUpdate.setTipoCliente(cliente.isTipoCliente());
        clienteUpdate.setName(cliente.getName());
        clienteUpdate.setDireccion(cliente.getDireccion());
        clienteUpdate.setTelefono(cliente.getTelefono());
        clienteUpdate.setEmail(cliente.getEmail());

        Cliente updatedCliente = clienteRepository.save(clienteUpdate);
        return ResponseEntity.ok(updatedCliente);
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteCliente(@PathVariable String id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente not found with id: " + id));

        clienteRepository.delete(cliente);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}