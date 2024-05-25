package com.example.proyecto2backend.Logic.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "facturas_detalles")
public class FacturaDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotEmpty(message = "{error.Empty}")
    private int idProducto;
    @Min(value = 0, message = "{error.Negative}")
    private int cantidad;
    @ManyToOne
    @JoinColumn(name = "factura_id")
    private Factura factura;
}
