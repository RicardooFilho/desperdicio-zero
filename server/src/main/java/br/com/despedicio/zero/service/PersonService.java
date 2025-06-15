package br.com.despedicio.zero.service;

import br.com.despedicio.zero.domain.Person;
import br.com.despedicio.zero.repository.PersonRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonService {

    private final PersonRepository repository;

    public List<Person> findAll() {

        return repository.findAll();
    }

    public Person findById(Long id) {

        return repository
                .findById(id)
                .orElseThrow(EntityNotFoundException::new);
    }

    public Person create(Person person) {

        return repository.save(person);
    }

    public Person update(Long id, Person newPerson) {

        return repository
                .findById(id)
                .map(person -> repository.save(newPerson))
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
