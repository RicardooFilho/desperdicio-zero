package br.com.despedicio.zero.controller;

import br.com.despedicio.zero.domain.DonationItem;
import br.com.despedicio.zero.service.DonationItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/donation-items")
@RequiredArgsConstructor
public class DonationItemController {

    private final DonationItemService service;

    @GetMapping
    public ResponseEntity<List<DonationItem>> findAll() {

        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonationItem> findById(@PathVariable Long id) {

        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<DonationItem> create(@Valid @RequestBody DonationItem donationItem) {

        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(donationItem));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonationItem> update(@PathVariable Long id, @Valid @RequestBody DonationItem donationItem) {

        return ResponseEntity.ok(service.update(id, donationItem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
