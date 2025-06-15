import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuItems = [
    { label: 'Início', route: '/', icon: 'home' },
    { label: 'Feirantes', route: '/vendors', icon: 'store' },
    { label: 'Instituições', route: '/institutions', icon: 'volunteer_activism' },
    { label: 'Doações', route: '/donations', icon: 'card_giftcard' },
    { label: 'Alimentos', route: '/foods', icon: 'restaurant' },
    { label: 'Pessoas', route: '/people', icon: 'people' }
  ];
}
