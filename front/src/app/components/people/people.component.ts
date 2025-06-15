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

import { Person } from '../../models/person.model';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-people',
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
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people: Person[] = [];
  personForm: FormGroup;
  isLoading = false;
  isEditing = false;
  editingId: number | null = null;

  displayedColumns: string[] = ['id', 'name', 'active', 'dataCadastro', 'actions'];

  constructor(
    private personService: PersonService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.personForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadPeople();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  loadPeople(): void {
    this.isLoading = true;
    this.personService.findAll().subscribe({
      next: (people) => {
        this.people = people;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pessoas:', error);
        this.snackBar.open('Erro ao carregar pessoas', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      this.isLoading = true;
      const person: Person = {
        name: this.personForm.value.name,
        active: true
      };

      const request = this.isEditing && this.editingId
        ? this.personService.update(this.editingId, person)
        : this.personService.create(person);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEditing ? 'Pessoa atualizada com sucesso!' : 'Pessoa cadastrada com sucesso!',
            'Fechar',
            { duration: 3000 }
          );
          this.resetForm();
          this.loadPeople();
        },
        error: (error) => {
          console.error('Erro ao salvar pessoa:', error);
          this.snackBar.open('Erro ao salvar pessoa', 'Fechar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  editPerson(person: Person): void {
    this.isEditing = true;
    this.editingId = person.id!;
    this.personForm.patchValue({
      name: person.name
    });
  }

  deletePerson(person: Person): void {
    if (confirm(`Tem certeza que deseja excluir "${person.name}"?`)) {
      this.personService.delete(person.id!).subscribe({
        next: () => {
          this.snackBar.open('Pessoa excluída com sucesso!', 'Fechar', { duration: 3000 });
          this.loadPeople();
        },
        error: (error) => {
          console.error('Erro ao excluir pessoa:', error);
          this.snackBar.open('Erro ao excluir pessoa', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  resetForm(): void {
    this.personForm.reset();
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