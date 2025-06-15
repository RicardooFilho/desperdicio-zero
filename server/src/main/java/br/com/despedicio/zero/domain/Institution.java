package br.com.despedicio.zero.domain;

import br.com.despedicio.zero.enums.InstitutionType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "id")
@Getter
public class Institution {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String cnpj;

    private Long capacity;

    @ManyToOne
    @JoinColumn(name = "id_owner")
    private Person owner;

    @Enumerated(EnumType.STRING)
    @Column(name = "institution_type")
    private InstitutionType institutionType;
}
