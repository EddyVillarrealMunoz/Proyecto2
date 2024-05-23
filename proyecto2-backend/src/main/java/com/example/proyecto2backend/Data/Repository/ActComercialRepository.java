package com.example.proyecto2backend.Data.Repository;

import com.example.proyecto2backend.Logic.Model.ActComercial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActComercialRepository extends JpaRepository<ActComercial, Integer> {
}