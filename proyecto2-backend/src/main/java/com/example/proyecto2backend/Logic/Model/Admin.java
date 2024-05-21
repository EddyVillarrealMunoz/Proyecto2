package com.example.proyecto2backend.Logic.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "administradores")
public class Admin {
    @Id
    private String id;

    private String name;
    private String password;
    private String rol = "ADM";
}