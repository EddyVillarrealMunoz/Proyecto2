package com.example.proyecto2backend.Logic.Model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "productos")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @Column(name = "description")
    private String description;

    @Column(name = "iva_fee")
    private Double ivaFee;

    @Size(max = 255)
    @Column(name = "measure")
    private String measure;

    @Column(name = "price")
    private Double price;

    @Column(name = "type")
    private Boolean type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "act_comercial_id", nullable = true)
    private ActComercial actComercial;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proveedor_id")
    @JsonBackReference
    private Proveedor proveedor;
}