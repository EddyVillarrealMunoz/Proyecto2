package com.example.proyecto2backend.Logic.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "facturas")
public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date date;
    @NotEmpty(message = "{error.Empty}")
    private String cedulaProveedor;
    @NotEmpty(message = "{error.Empty}")
    private String cedulaCliente;
    @NotEmpty(message = "{error.Empty}")
    private String tipoPago;
    @Min(value = 0, message = "{error.Negative}")
    private Double finalPrice;

    @OneToMany(mappedBy = "factura")
    private List<Producto> listProducts = new ArrayList<>();
}
