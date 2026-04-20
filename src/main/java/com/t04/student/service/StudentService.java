package com.t04.student.service;

import com.t04.student.model.Student;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface StudentService {
    Flux<Student> findAll();
    Mono<Student> findById(Long id);
    Mono<Student> save(Student student);
    Mono<Student> update(Long id, Student student);
    Mono<Student> delete(Long id);    // cambia status a I
    Mono<Student> restore(Long id);   // cambia status a A
}
