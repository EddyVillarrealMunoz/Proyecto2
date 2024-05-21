package com.example.proyecto2backend.Presentation.Controller;

import com.example.proyecto2backend.Logic.Model.User;
import com.example.proyecto2backend.Security.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class AuthController {
    @Autowired
    AuthService authService;
    @Qualifier("handlerExceptionResolver")

    @PostMapping("/login")
    public Object login(@RequestBody User loginRequest) {
        return authService.login(loginRequest.getId(), loginRequest.getPassword());
    }
}