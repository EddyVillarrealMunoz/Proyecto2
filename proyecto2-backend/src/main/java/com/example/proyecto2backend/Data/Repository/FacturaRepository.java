package com.example.proyecto2backend.Data.Repository;

import com.example.proyecto2backend.Logic.Model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {

    @Query("SELECT f FROM Factura f WHERE f.cedulaProveedor = :proveedorId")
    List<Factura> findFacturasByProveedorId(@Param("proveedorId") String proveedorId);
}
