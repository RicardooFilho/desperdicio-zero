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
import { MatCheckboxModule } from '@angular/material/checkbox';

import { Food, Category } from '../../models/food.model';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-foods',
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
    MatCheckboxModule,
    MatSnackBarModule
  ],
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {
  foods: Food[] = [];
  foodForm: FormGroup;
  isLoading = false;
  isEditing = false;
  editingId: number | null = null;

  categories = [
    { value: Category.FRUTA, label: 'Fruta' },
    { value: Category.VERDURA, label: 'Verdura' },
    { value: Category.LEGUME, label: 'Legume' },
    { value: Category.GRAO, label: 'Grão' },
    { value: Category.SALGADO, label: 'Salgado' },
    { value: Category.DOCE, label: 'Doce' }
  ];

  displayedColumns: string[] = ['id', 'name', 'category', 'perishable', 'shelfLife', 'actions'];

  constructor(
    private foodService: FoodService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.foodForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadFoods();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      category: ['', [Validators.required]],
      perishable: [true],
      shelfLife: ['', [Validators.min(1)]]
    });
  }

  loadFoods(): void {
    this.isLoading = true;
    this.foodService.findAll().subscribe({
      next: (foods) => {
        this.foods = foods;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar alimentos:', error);
        this.snackBar.open('Erro ao carregar alimentos', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.foodForm.valid) {
      this.isLoading = true;
      const food: Food = this.foodForm.value;

      const request = this.isEditing && this.editingId
        ? this.foodService.update(this.editingId, food)
        : this.foodService.create(food);

      request.subscribe({
        next: () => {
          this.snackBar.open(
            this.isEditing ? 'Alimento atualizado com sucesso!' : 'Alimento cadastrado com sucesso!',
            'Fechar',
            { duration: 3000 }
          );
          this.resetForm();
          this.loadFoods();
        },
        error: (error) => {
          console.error('Erro ao salvar alimento:', error);
          this.snackBar.open('Erro ao salvar alimento', 'Fechar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  editFood(food: Food): void {
    this.isEditing = true;
    this.editingId = food.id!;
    this.foodForm.patchValue({
      name: food.name,
      description: food.description,
      category: food.category,
      perishable: food.perishable,
      shelfLife: food.shelfLife
    });
  }

  deleteFood(food: Food): void {
    if (confirm(`Tem certeza que deseja excluir o alimento "${food.name}"?`)) {
      this.foodService.delete(food.id!).subscribe({
        next: () => {
          this.snackBar.open('Alimento excluído com sucesso!', 'Fechar', { duration: 3000 });
          this.loadFoods();
        },
        error: (error) => {
          console.error('Erro ao excluir alimento:', error);
          this.snackBar.open('Erro ao excluir alimento', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  resetForm(): void {
    this.foodForm.reset();
    this.foodForm.patchValue({ perishable: true });
    this.isEditing = false;
    this.editingId = null;
    this.isLoading = false;
  }

  getCategoryLabel(category: Category): string {
    const categoryObj = this.categories.find(c => c.value === category);
    return categoryObj ? categoryObj.label : category;
  }

  getCategoryClass(category: Category): string {
    return category.toLowerCase();
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }
}
