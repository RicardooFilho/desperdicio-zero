package br.com.despedicio.zero.domain;

import br.com.despedicio.zero.enums.Category;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode(of = "id")
@Getter
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Enumerated(EnumType.STRING)
    private Category category;

    private Boolean perishable = Boolean.TRUE;

    @Column(name = "shelf_life")
    private Long shelfLife;
}
