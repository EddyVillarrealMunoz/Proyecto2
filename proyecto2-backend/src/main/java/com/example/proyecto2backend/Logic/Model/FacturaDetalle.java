package com.example.proyecto2backend.Logic.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.converter.json.GsonBuilderUtils;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "facturasDetalles")
public class FacturaDetalle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Agrega esta línea
    private Long id;
    @NotEmpty(message = "{error.Empty}")
    private int idProducto;
    @Min(value = 0, message = "{error.Negative}")
    private int cantidad;
}