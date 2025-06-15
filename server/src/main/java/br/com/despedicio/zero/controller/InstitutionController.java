package br.com.despedicio.zero.controller;

import br.com.despedicio.zero.domain.Institution;
import br.com.despedicio.zero.service.InstitutionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/institutions")
@RequiredArgsConstructor
public class InstitutionController {

    private final InstitutionService service;

    @GetMapping
    public ResponseEntity<List<Institution>> findAll() {

        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Institution> findById(@PathVariable Long id) {

        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Institution> create(@Valid @RequestBody Institution institution) {

        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(institution));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Institution> update(@PathVariable Long id, @Valid @RequestBody Institution institution) {

        return ResponseEntity.ok(service.update(id, institution));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
