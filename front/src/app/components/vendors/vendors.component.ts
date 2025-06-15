import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Vendor } from '../../models/vendor.model';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  vendors: Vendor[] = [];
  vendorForm: FormGroup;
  isLoading = false;
  isEditing = false;
  editingId: number | null = null;

  displayedColumns: string[] = ['id', 'name', 'phone', 'active', 'actions'];

  constructor(
    private vendorService: VendorService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.vendorForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadVendors();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]]
    });
  }

  loadVendors(): void {
    this.isLoading = true;
    this.vendorService.findAll().subscribe({
      next: (vendors) => {
        this.vendors = vendors;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar feirantes:', error);
        this.snackBar.open('Erro ao carregar feirantes', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.vendorForm.valid) {
      this.isLoading = true;
      const vendor: Vendor = this.vendorForm.value;

      const request = this.isEditing && this.editingId
        ? this.vendorService.update(this.editingId, vendor)
        : this.vendorService.create(vendor);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEditing ? 'Feirante atualizado com sucesso!' : 'Feirante cadastrado com sucesso!',
            'Fechar',
            { duration: 3000 }
          );
          this.resetForm();
          this.loadVendors();
        },
        error: (error) => {
          console.error('Erro ao salvar feirante:', error);
          this.snackBar.open('Erro ao salvar feirante', 'Fechar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  editVendor(vendor: Vendor): void {
    this.isEditing = true;
    this.editingId = vendor.id!;
    this.vendorForm.patchValue({
      name: vendor.name,
      phone: vendor.phone
    });
  }

  deleteVendor(vendor: Vendor): void {
    if (confirm(`Tem certeza que deseja excluir o feirante "${vendor.name}"?`)) {
      this.vendorService.delete(vendor.id!).subscribe({
        next: () => {
          this.snackBar.open('Feirante excluído com sucesso!', 'Fechar', { duration: 3000 });
          this.loadVendors();
        },
        error: (error) => {
          console.error('Erro ao excluir feirante:', error);
          this.snackBar.open('Erro ao excluir feirante', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  resetForm(): void {
    this.vendorForm.reset();
    this.isEditing = false;
    this.editingId = null;
    this.isLoading = false;
  }

  getStatusText(active: boolean): string {
    return active ? 'Ativo' : 'Inativo';
  }

  getStatusClass(active: boolean): string {
    return active ? 'status-active' : 'status-inactive';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
