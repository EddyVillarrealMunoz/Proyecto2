package com.example.proyecto2backend.Data.Repository;

import com.example.proyecto2backend.Logic.Model.Producto;
import com.example.proyecto2backend.Logic.Model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, String>
{
    @Query("SELECT pr FROM Producto pr JOIN pr.proveedor p WHERE p.id = :proveedorId")
    List<Producto> findProductosByProveedorId(@Param("proveedorId") String proveedorId);



}