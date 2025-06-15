package br.com.despedicio.zero.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "donation_item")
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "id")
@Getter
public class DonationItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_donation")
    @JsonIgnoreProperties("items")
    private Donation donation;

    @ManyToOne
    @JoinColumn(name = "id_food")
    private Food food;

    private BigDecimal quantity;


}
