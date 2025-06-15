package br.com.despedicio.zero.service;

import br.com.despedicio.zero.domain.Institution;
import br.com.despedicio.zero.domain.Vendor;
import br.com.despedicio.zero.repository.InsitutionRepository;
import br.com.despedicio.zero.repository.VendorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstitutionService {

    private final InsitutionRepository repository;

    public List<Institution> findAll() {

        return repository.findAll();
    }

    public Institution findById(Long id) {

        return repository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    public Institution create(Institution institution) {

        return repository.save(institution);
    }

    public Institution update(Long id, Institution newInstitution) {

        return repository
                .findById(id)
                .map(person -> repository.save(newInstitution))
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
