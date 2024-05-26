package com.example.proyecto2backend.Logic.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "productos_act_comercial")
public class ProductosActComercial {
    @EmbeddedId
    private ProductosActComercialId id;

    @MapsId("actComercialId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "act_comercial_id", nullable = false)
    private ActComercial actComercial;

    @MapsId("productoId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "producto_id", nullable = false)
    private Producto producto;

}