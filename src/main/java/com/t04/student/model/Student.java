package com.t04.student.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;

@Data
@Table(name = "student")
public class Student {

    @Id
    private Long id; // Identificador único

    @Column("first_name")
    private String firstName; // Nombres

    @Column("last_name")
    private String lastName; // Apellidos

    @Column("document_type")
    private String documentType; // Tipo de documento (DNI, CE, PAS)

    @Column("document_number")
    private String documentNumber; // Número de documento

    private String email; // Correo electrónico

    private String grade; // Grado

    private String section; // Sección

    @Column("register_date")
    private LocalDate registerDate; // Fecha de registro

    private String status; // Estado: A=Activo, I=Inactivo
}
