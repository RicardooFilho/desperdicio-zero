package br.com.despedicio.zero.service;

import br.com.despedicio.zero.domain.Donation;
import br.com.despedicio.zero.domain.Food;
import br.com.despedicio.zero.repository.DonationRepository;
import br.com.despedicio.zero.repository.FoodRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DonationService {

    private final DonationRepository repository;

    public List<Donation> findAll() {

        return repository.findAll();
    }

    public Donation findById(Long id) {

        return repository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    public Donation create(Donation donation) {

        return repository.save(donation);
    }

    public Donation update(Long id, Donation newDonation) {

        return repository
                .findById(id)
                .map(person -> repository.save(newDonation))
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
