package com.example.proyecto2backend.Logic.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ActComercial {
    @Id
    int id;
    String description;

    @Override
    public String toString() {
        return "ActComercial{" +
                "id=" + id +
                ", description='" + description + '\'' +
                '}';
    }
}