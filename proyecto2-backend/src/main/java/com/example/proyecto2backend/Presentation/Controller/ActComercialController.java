package com.example.proyecto2backend.Presentation.Controller;

import com.example.proyecto2backend.Data.Repository.ActComercialRepository;
import com.example.proyecto2backend.Logic.Model.ActComercial;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ActComercialController {

    @Autowired
    private ActComercialRepository actComercialRepository;


    @GetMapping("/actcomerciales")
    public ResponseEntity<?> findAllActComerciales() {
        return ResponseEntity.ok(actComercialRepository.findAll());
    }

    @GetMapping("/actcomerciales/{id}")
    public ResponseEntity<ActComercial> findActComercialById(@PathVariable Integer id) {
        ActComercial actComercial = actComercialRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ActComercial not found with id: " + id));
        return ResponseEntity.ok(actComercial);
    }
}