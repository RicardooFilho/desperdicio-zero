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

import { Institution, InstitutionType } from '../../models/institution.model';
import { Person } from '../../models/person.model';
import { InstitutionService } from '../../services/institution.service';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-institutions',
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
  templateUrl: './institutions.component.html',
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit {
  institutions: Institution[] = [];
  people: Person[] = [];
  institutionForm: FormGroup;
  isLoading = false;
  isEditing = false;
  editingId: number | null = null;

  institutionTypes = [
    { value: InstitutionType.ONG, label: 'ONG' },
    { value: InstitutionType.ABRIGO, label: 'Abrigo' },
    { value: InstitutionType.ESCOLA, label: 'Escola' }
  ];

  displayedColumns: string[] = ['id', 'name', 'cnpj', 'institutionType', 'capacity', 'owner', 'actions'];

  constructor(
    private institutionService: InstitutionService,
    private personService: PersonService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.institutionForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadInstitutions();
    this.loadPeople();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      cnpj: ['', [Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)]],
      capacity: ['', [Validators.min(1)]],
      institutionType: ['', [Validators.required]],
      ownerId: ['']
    });
  }

  loadInstitutions(): void {
    this.isLoading = true;
    this.institutionService.findAll().subscribe({
      next: (institutions) => {
        this.institutions = institutions;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar instituições:', error);
        this.snackBar.open('Erro ao carregar instituições', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  loadPeople(): void {
    this.personService.findAll().subscribe({
      next: (people) => {
        this.people = people.filter(person => person.active);
      },
      error: (error) => {
        console.error('Erro ao carregar pessoas:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.institutionForm.valid) {
      this.isLoading = true;
      const formValue = this.institutionForm.value;

      const institution: Institution = {
        name: formValue.name,
        description: formValue.description,
        cnpj: formValue.cnpj,
        capacity: formValue.capacity,
        institutionType: formValue.institutionType,
        owner: formValue.ownerId ? this.people.find(p => p.id === formValue.ownerId) : undefined
      };

      const request = this.isEditing && this.editingId
        ? this.institutionService.update(this.editingId, institution)
        : this.institutionService.create(institution);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEditing ? 'Instituição atualizada com sucesso!' : 'Instituição cadastrada com sucesso!',
            'Fechar',
            { duration: 3000 }
          );
          this.resetForm();
          this.loadInstitutions();
        },
        error: (error) => {
          console.error('Erro ao salvar instituição:', error);
          this.snackBar.open('Erro ao salvar instituição', 'Fechar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  editInstitution(institution: Institution): void {
    this.isEditing = true;
    this.editingId = institution.id!;
    this.institutionForm.patchValue({
      name: institution.name,
      description: institution.description,
      cnpj: institution.cnpj,
      capacity: institution.capacity,
      institutionType: institution.institutionType,
      ownerId: institution.owner?.id
    });
  }

  deleteInstitution(institution: Institution): void {
    if (confirm(`Tem certeza que deseja excluir a instituição "${institution.name}"?`)) {
      this.institutionService.delete(institution.id!).subscribe({
        next: () => {
          this.snackBar.open('Instituição excluída com sucesso!', 'Fechar', { duration: 3000 });
          this.loadInstitutions();
        },
        error: (error) => {
          console.error('Erro ao excluir instituição:', error);
          this.snackBar.open('Erro ao excluir instituição', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  resetForm(): void {
    this.institutionForm.reset();
    this.isEditing = false;
    this.editingId = null;
    this.isLoading = false;
  }

  getInstitutionTypeLabel(type: InstitutionType): string {
    const typeObj = this.institutionTypes.find(t => t.value === type);
    return typeObj ? typeObj.label : type;
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}