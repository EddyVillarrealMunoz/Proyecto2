package com.example.proyecto2backend.Logic.Model;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.example.proyecto2backend.Logic.Model.ActComercial;
import com.example.proyecto2backend.Logic.Model.Cliente;

import java.util.List;

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

    @ManyToOne
    @JoinColumn(name="act_comercial_id", nullable = true)
    private ActComercial actComercial;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "proveedor_id", nullable = true) //La tabla cliente tendrá el proveedor_id
    private List<Cliente> clientes;
}