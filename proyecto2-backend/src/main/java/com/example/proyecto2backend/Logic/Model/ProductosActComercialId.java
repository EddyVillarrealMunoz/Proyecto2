package com.example.proyecto2backend.Logic.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class ProductosActComercialId implements Serializable {
    private static final long serialVersionUID = 1164143100874955411L;
    @NotNull
    @Column(name = "act_comercial_id", nullable = false)
    private Integer actComercialId;

    @NotNull
    @Column(name = "producto_id", nullable = false)
    private Integer productoId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ProductosActComercialId entity = (ProductosActComercialId) o;
        return Objects.equals(this.actComercialId, entity.actComercialId) &&
                Objects.equals(this.productoId, entity.productoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(actComercialId, productoId);
    }

}