package com.example.proyecto2backend.Logic.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "actividades_comerciales")
public class ActComercial {
    @Id
    int id;
    String description;

    // Relación inversa con Producto (si un ActComercial puede tener varios productos)
    @OneToMany(mappedBy = "actComercial")
    private List<Producto> productos = new ArrayList<>();

    @Override
    public String toString() {
        return "ActComercial{" +
                "id=" + id +
                ", description='" + description + '\'' +
                '}';
    }
}