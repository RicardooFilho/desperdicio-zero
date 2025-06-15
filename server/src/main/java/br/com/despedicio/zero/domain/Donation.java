package br.com.despedicio.zero.domain;

import br.com.despedicio.zero.enums.DonationStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "id")
@Getter
public class Donation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Enumerated(EnumType.STRING)
    private DonationStatus status;

    @ManyToOne
    @JoinColumn(name = "id_vendor")
    private Vendor vendor;

    @OneToMany(mappedBy = "donation")
    @JsonIgnoreProperties("donation")
    private List<DonationItem> items = new ArrayList<>();

}
