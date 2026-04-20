package com.t04.student.service.impl;

import com.t04.student.model.Student;
import com.t04.student.repository.StudentRepository;
import com.t04.student.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;

@Slf4j
@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository repository;

    public StudentServiceImpl(StudentRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flux<Student> findAll() {
        log.info("Listando todos los estudiantes");
        return repository.findAll();
    }

    @Override
    public Mono<Student> findById(Long id) {
        log.info("Buscando estudiante por ID = {}", id);
        return repository.findById(id);
    }

    @Override
    public Mono<Student> save(Student student) {
        student.setRegisterDate(LocalDate.now());
        student.setStatus("A"); // Activo al crear
        log.info("Guardando estudiante: {}", student);
        return repository.save(student);
    }

    @Override
    public Mono<Student> update(Long id, Student student) {
        log.info("Actualizando estudiante ID = {}", id);
        return repository.findById(id)
                .flatMap(existing -> {
                    existing.setFirstName(student.getFirstName());
                    existing.setLastName(student.getLastName());
                    existing.setDocumentType(student.getDocumentType());
                    existing.setDocumentNumber(student.getDocumentNumber());
                    existing.setEmail(student.getEmail());
                    existing.setGrade(student.getGrade());
                    existing.setSection(student.getSection());
                    return repository.save(existing);
                });
    }

    @Override
    public Mono<Student> delete(Long id) {
        log.info("Desactivando estudiante ID = {}", id);
        return repository.findById(id)
                .flatMap(existing -> {
                    existing.setStatus("I"); // Inactivo al eliminar
                    return repository.save(existing);
                });
    }

    @Override
    public Mono<Student> restore(Long id) {
        log.info("Restaurando estudiante ID = {}", id);
        return repository.findById(id)
                .flatMap(existing -> {
                    existing.setStatus("A"); // Activo al restaurar
                    return repository.save(existing);
                });
    }
}
