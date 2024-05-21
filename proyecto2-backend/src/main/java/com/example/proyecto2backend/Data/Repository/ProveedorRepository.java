package com.example.proyecto2backend.Data.Repository;

import com.example.proyecto2backend.Logic.Model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, String> {
}