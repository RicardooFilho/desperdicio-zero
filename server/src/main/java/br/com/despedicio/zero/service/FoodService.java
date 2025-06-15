package br.com.despedicio.zero.service;

import br.com.despedicio.zero.domain.Food;
import br.com.despedicio.zero.repository.FoodRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository repository;

    public List<Food> findAll() {

        return repository.findAll();
    }

    public Food findById(Long id) {

        return repository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    public Food create(Food food) {

        return repository.save(food);
    }

    public Food update(Long id, Food newFood) {

        return repository
                .findById(id)
                .map(person -> repository.save(newFood))
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
