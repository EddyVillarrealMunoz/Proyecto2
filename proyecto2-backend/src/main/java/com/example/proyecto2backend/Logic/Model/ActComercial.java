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
@Table(name = "actividades_comerciales")
public class ActComercial {
    @Id
    int id;
    String name;
    String description;
}