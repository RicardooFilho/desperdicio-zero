import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Donation, DonationStatus } from '../../models/donation.model';
import { Vendor } from '../../models/vendor.model';
import { DonationService } from '../../services/donation.service';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss']
})
export class DonationsComponent implements OnInit {
  donations: Donation[] = [];
  vendors: Vendor[] = [];
  donationForm: FormGroup;
  isLoading = false;
  isEditing = false;
  editingId: number | null = null;

  donationStatuses = [
    { value: DonationStatus.DISPONIVEL, label: 'Disponível' },
    { value: DonationStatus.COLETADO, label: 'Coletado' },
    { value: DonationStatus.CANCELADO, label: 'Cancelado' }
  ];

  displayedColumns: string[] = ['id', 'description', 'vendor', 'status', 'actions'];

  constructor(
    private donationService: DonationService,
    private vendorService: VendorService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.donationForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadDonations();
    this.loadVendors();
  }

  createForm(): FormGroup {
    return this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      status: [DonationStatus.DISPONIVEL, [Validators.required]],
      vendorId: ['', [Validators.required]]
    });
  }

  loadDonations(): void {
    this.isLoading = true;
    this.donationService.findAll().subscribe({
      next: (donations) => {
        this.donations = donations;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar doações:', error);
        this.snackBar.open('Erro ao carregar doações', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  loadVendors(): void {
    this.vendorService.findAll().subscribe({
      next: (vendors) => {
        this.vendors = vendors.filter(vendor => vendor.active);
      },
      error: (error) => {
        console.error('Erro ao carregar feirantes:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.donationForm.valid) {
      this.isLoading = true;
      const formValue = this.donationForm.value;

      const donation: Donation = {
        description: formValue.description,
        status: formValue.status,
        vendor: this.vendors.find(v => v.id === formValue.vendorId)
      };

      const request = this.isEditing && this.editingId
        ? this.donationService.update(this.editingId, donation)
        : this.donationService.create(donation);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEditing ? 'Doação atualizada com sucesso!' : 'Doação cadastrada com sucesso!',
            'Fechar',
            { duration: 3000 }
          );
          this.resetForm();
          this.loadDonations();
        },
        error: (error) => {
          console.error('Erro ao salvar doação:', error);
          this.snackBar.open('Erro ao salvar doação', 'Fechar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  editDonation(donation: Donation): void {
    this.isEditing = true;
    this.editingId = donation.id!;
    this.donationForm.patchValue({
      description: donation.description,
      status: donation.status,
      vendorId: donation.vendor?.id
    });
  }

  deleteDonation(donation: Donation): void {
    if (confirm(`Tem certeza que deseja excluir esta doação?`)) {
      this.donationService.delete(donation.id!).subscribe({
        next: () => {
          this.snackBar.open('Doação excluída com sucesso!', 'Fechar', { duration: 3000 });
          this.loadDonations();
        },
        error: (error) => {
          console.error('Erro ao excluir doação:', error);
          this.snackBar.open('Erro ao excluir doação', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  collectDonation(donation: Donation): void {
    if (confirm('Confirmar coleta desta doação?')) {
      this.donationService.collectDonation(donation.id!).subscribe({
        next: () => {
          this.snackBar.open('Doação coletada com sucesso!', 'Fechar', { duration: 3000 });
          this.loadDonations();
        },
        error: (error) => {
          console.error('Erro ao coletar doação:', error);
          this.snackBar.open('Erro ao coletar doação', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  cancelDonation(donation: Donation): void {
    if (confirm('Cancelar esta doação?')) {
      this.donationService.cancelDonation(donation.id!).subscribe({
        next: () => {
          this.snackBar.open('Doação cancelada!', 'Fechar', { duration: 3000 });
          this.loadDonations();
        },
        error: (error) => {
          console.error('Erro ao cancelar doação:', error);
          this.snackBar.open('Erro ao cancelar doação', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  resetForm(): void {
    this.donationForm.reset();
    this.donationForm.patchValue({ status: DonationStatus.DISPONIVEL });
    this.isEditing = false;
    this.editingId = null;
    this.isLoading = false;
  }

  getStatusLabel(status: DonationStatus): string {
    const statusObj = this.donationStatuses.find(s => s.value === status);
    return statusObj ? statusObj.label : status;
  }

  getStatusClass(status: DonationStatus): string {
    return status.toLowerCase().replace('_', '-');
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
