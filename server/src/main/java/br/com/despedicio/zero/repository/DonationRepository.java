package br.com.despedicio.zero.repository;

import br.com.despedicio.zero.domain.Donation;
import br.com.despedicio.zero.domain.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
}
