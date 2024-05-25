package com.example.proyecto2backend.Logic.Model;

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
public class Proveedor {

    @Id
    private String id;

    private String name;

    private String email;

    private String password;

    private boolean accepted;

    private String rol = "PRO";

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "proveedores_clientes",
            joinColumns = @JoinColumn(name = "proveedor_id"),
            inverseJoinColumns = @JoinColumn(name = "cliente_id")
    )
    private List<Cliente> clientes = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "proveedor_actividades_comerciales",
            joinColumns = @JoinColumn(name = "proveedor_id"),
            inverseJoinColumns = @JoinColumn(name = "act_comercial_id")
    )
    private List<ActComercial> actComerciales = new ArrayList<>();
}