package com.example.proyecto2backend.Logic.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class ProveedoresActComercialId implements Serializable {
    private static final long serialVersionUID = -3420323719086584841L;
    @NotNull
    @Column(name = "act_comercial_id", nullable = false)
    private Integer actComercialId;

    @Size(max = 255)
    @NotNull
    @Column(name = "proveedor_id", nullable = false)
    private String proveedorId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ProveedoresActComercialId entity = (ProveedoresActComercialId) o;
        return Objects.equals(this.actComercialId, entity.actComercialId) &&
                Objects.equals(this.proveedorId, entity.proveedorId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(actComercialId, proveedorId);
    }

}