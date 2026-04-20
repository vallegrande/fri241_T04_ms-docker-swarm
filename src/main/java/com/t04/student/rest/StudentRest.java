package com.t04.student.rest;

import com.t04.student.model.Student;
import com.t04.student.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/v1/api/student")
public class StudentRest {

    private final StudentService service;

    @Autowired
    public StudentRest(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public Flux<Student> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Mono<Student> findById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public Mono<Student> save(@RequestBody Student student) {
        return service.save(student);
    }

    @PutMapping("/{id}")
    public Mono<Student> update(@PathVariable Long id, @RequestBody Student student) {
        return service.update(id, student);
    }

    @PatchMapping("/delete/{id}")
    public Mono<Student> delete(@PathVariable Long id) {
        return service.delete(id);
    }

    @PatchMapping("/restore/{id}")
    public Mono<Student> restore(@PathVariable Long id) {
        return service.restore(id);
    }

    @GetMapping("/health")
    public Mono<Map<String, String>> health() {
        return Mono.just(Map.of("status", "UP", "service", "ms-student"));
    }
}
