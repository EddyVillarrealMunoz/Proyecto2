package com.example.proyecto2backend.Data.Repository;

import com.example.proyecto2backend.Logic.Model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
}