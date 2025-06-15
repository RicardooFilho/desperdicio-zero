import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  modules = [
    {
      title: 'Gerenciar Feirantes',
      subtitle: 'Vendedores e Produtores',
      description: 'Cadastre e gerencie feirantes, vendedores e produtores que fazem doações',
      icon: 'store',
      route: '/vendors',
      color: '#4CAF50'
    },
    {
      title: 'Gerenciar Instituições',
      subtitle: 'ONGs, Abrigos e Escolas',
      description: 'Administre as instituições que recebem as doações de alimentos',
      icon: 'volunteer_activism',
      route: '/institutions',
      color: '#2196F3'
    },
    {
      title: 'Controlar Doações',
      subtitle: 'Doações e Coletas',
      description: 'Gerencie todo o processo de doações, desde o cadastro até a coleta',
      icon: 'card_giftcard',
      route: '/donations',
      color: '#FF9800'
    },
    {
      title: 'Catálogo de Alimentos',
      subtitle: 'Tipos de Alimentos',
      description: 'Mantenha o catálogo de alimentos disponíveis para doação',
      icon: 'restaurant',
      route: '/foods',
      color: '#9C27B0'
    }
  ];

  benefits = [
    {
      icon: 'eco',
      title: 'Sustentabilidade',
      description: 'Reduza o desperdício de alimentos e contribua para um planeta mais sustentável'
    },
    {
      icon: 'people',
      title: 'Impacto Social',
      description: 'Ajude famílias em vulnerabilidade social através da doação de alimentos'
    },
    {
      icon: 'smartphone',
      title: 'Facilidade',
      description: 'Plataforma simples e intuitiva para conectar doadores e beneficiários'
    },
    {
      icon: 'analytics',
      title: 'Controle',
      description: 'Tenha visibilidade completa de todo o processo de doações'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
