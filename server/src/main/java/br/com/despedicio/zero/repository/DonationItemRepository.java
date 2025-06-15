package br.com.despedicio.zero.repository;

import br.com.despedicio.zero.domain.DonationItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationItemRepository extends JpaRepository<DonationItem, Long> {
}
