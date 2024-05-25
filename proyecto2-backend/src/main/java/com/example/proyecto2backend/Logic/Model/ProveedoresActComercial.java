package com.example.proyecto2backend.Logic.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "proveedores_act_comercial")
public class ProveedoresActComercial {
    @EmbeddedId
    private ProveedoresActComercialId id;

    @MapsId("actComercialId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "act_comercial_id", nullable = false)
    private ActComercial actComercial;

    @MapsId("proveedorId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "proveedor_id", nullable = false)
    private Proveedor proveedor;

}