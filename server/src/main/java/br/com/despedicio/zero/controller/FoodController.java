package br.com.despedicio.zero.controller;

import br.com.despedicio.zero.domain.Food;
import br.com.despedicio.zero.domain.Institution;
import br.com.despedicio.zero.service.FoodService;
import br.com.despedicio.zero.service.InstitutionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/foods")
@RequiredArgsConstructor
public class FoodController {

    private final FoodService service;

    @GetMapping
    public ResponseEntity<List<Food>> findAll() {

        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Food> findById(@PathVariable Long id) {

        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Food> create(@Valid @RequestBody Food food) {

        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(food));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> update(@PathVariable Long id, @Valid @RequestBody Food food) {

        return ResponseEntity.ok(service.update(id, food));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
