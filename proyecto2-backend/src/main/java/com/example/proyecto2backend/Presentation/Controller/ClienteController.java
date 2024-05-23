package com.example.proyecto2backend.Presentation.Controller;

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

    @GetMapping("/clientes")
    public List<Cliente> findAllClientes() {
        return clienteRepository.findAll();
    }

    @PostMapping("/clientes")
    public Cliente saveCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> findClienteById(@PathVariable String id) {
        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente not found with id: " + id));
        System.out.println(cliente.toString());
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