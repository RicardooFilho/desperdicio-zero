package br.com.despedicio.zero.controller;

import br.com.despedicio.zero.domain.Donation;
import br.com.despedicio.zero.domain.Food;
import br.com.despedicio.zero.service.DonationService;
import br.com.despedicio.zero.service.FoodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/donations")
@RequiredArgsConstructor
public class DonationController {

    private final DonationService service;

    @GetMapping
    public ResponseEntity<List<Donation>> findAll() {

        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Donation> findById(@PathVariable Long id) {

        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Donation> create(@Valid @RequestBody Donation donation) {

        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(donation));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Donation> update(@PathVariable Long id, @Valid @RequestBody Donation donation) {

        return ResponseEntity.ok(service.update(id, donation));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
