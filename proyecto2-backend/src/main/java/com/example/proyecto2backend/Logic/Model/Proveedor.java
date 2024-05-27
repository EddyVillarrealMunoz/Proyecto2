package com.example.proyecto2backend.Logic.Model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.example.proyecto2backend.Logic.Model.ActComercial;
import com.example.proyecto2backend.Logic.Model.Cliente;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "proveedores")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Proveedor {

    @Id
    private String id;

    private String name;

    private String email;

    private String password;

    private boolean accepted;

    private String rol = "PRO";

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "proveedor_actividades_comerciales",
            joinColumns = @JoinColumn(name = "proveedor_id"),
            inverseJoinColumns = @JoinColumn(name = "act_comercial_id")
    )
    private List<ActComercial> actComerciales = new ArrayList<>();

    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Cliente> clientes = new ArrayList<>();

    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<Producto> productos = new ArrayList<>();
}