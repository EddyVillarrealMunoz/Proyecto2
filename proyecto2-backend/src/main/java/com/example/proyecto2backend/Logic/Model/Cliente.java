package com.example.proyecto2backend.Logic.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "clientes")
public class Cliente {
    @Id
    private String id;
    private boolean tipoCliente; //0 = Físico, 1 = Jurídico
    private String name;
    private String direccion;
    private String telefono;
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proveedor_id")
    @JsonBackReference
    private Proveedor proveedor;
}