package com.example.proyecto2backend.Data.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.proyecto2backend.Logic.Model.FacturaDetalle;
import org.springframework.stereotype.Repository;

@Repository
public interface FacturaDetalleRepository extends JpaRepository<FacturaDetalle, Long> {
}