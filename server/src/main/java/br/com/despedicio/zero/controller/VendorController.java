package br.com.despedicio.zero.controller;

import br.com.despedicio.zero.domain.Vendor;
import br.com.despedicio.zero.service.VendorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/vendors")
@RequiredArgsConstructor
public class VendorController {

    private final VendorService service;

    @GetMapping
    public ResponseEntity<List<Vendor>> findAll() {

        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vendor> findById(@PathVariable Long id) {

        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Vendor> create(@Valid @RequestBody Vendor vendor) {

        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(vendor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vendor> update(@PathVariable Long id, @Valid @RequestBody Vendor vendor) {

        return ResponseEntity.ok(service.update(id, vendor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
