package com.example.proyecto2backend.Presentation.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.proyecto2backend.Data.Repository.ClienteRepository;
import com.example.proyecto2backend.Exception.ResourceNotFoundException;
import com.example.proyecto2backend.Logic.Model.Factura;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class FacturaController {
}
