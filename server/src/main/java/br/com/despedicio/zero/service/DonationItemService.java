package br.com.despedicio.zero.service;

import br.com.despedicio.zero.domain.DonationItem;
import br.com.despedicio.zero.repository.DonationItemRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationItemService {

    private final DonationItemRepository repository;

    public List<DonationItem> findAll() {

        return repository.findAll();
    }

    public DonationItem findById(Long id) {

        return repository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    public DonationItem create(DonationItem donationItem) {

        return repository.save(donationItem);
    }

    public DonationItem update(Long id, DonationItem newDonationItem) {

        return repository
                .findById(id)
                .map(person -> repository.save(newDonationItem))
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
