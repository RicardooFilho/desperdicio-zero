package br.com.despedicio.zero.service;

import br.com.despedicio.zero.domain.Person;
import br.com.despedicio.zero.domain.Vendor;
import br.com.despedicio.zero.repository.PersonRepository;
import br.com.despedicio.zero.repository.VendorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VendorService {

    private final VendorRepository repository;

    public List<Vendor> findAll() {

        return repository.findAll();
    }

    public Vendor findById(Long id) {

        return repository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    public Vendor create(Vendor vendor) {

        return repository.save(vendor);
    }

    public Vendor update(Long id, Vendor newVendor) {

        return repository
                .findById(id)
                .map(person -> repository.save(newVendor))
                .orElseThrow(EntityNotFoundException::new);
    }

    public void delete(Long id) {

        repository.findById(id)
                .ifPresentOrElse(
                        repository::delete,
                        () -> {
                            throw new EntityNotFoundException();
                        });
    }
}
