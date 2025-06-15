package br.com.despedicio.zero.repository;

import br.com.despedicio.zero.domain.Institution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsitutionRepository extends JpaRepository<Institution, Long> {
}
