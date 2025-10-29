import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderCalculatorService, OrderCalculator, CalculatedOrder } from '../../services/order-calculator.service';

@Component({
  selector: 'app-order-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-calculator.component.html'
})
export class OrderCalculatorComponent implements OnInit {
  @Output() orderCalculated = new EventEmitter<CalculatedOrder>();
  @Output() customizeRequested = new EventEmitter<void>();
  @Output() proceedToOrderEvent = new EventEmitter<CalculatedOrder>();

  calculator: OrderCalculator = {
    guestCount: 20,
    eventType: '',
    budget: 20000,
    preferences: [],
    customizations: {}
  };

  preferences = {
    sinGluten: false,
    vegano: false,
    sugarFree: false,
    entrega: false
  };

  calculatedOrder: CalculatedOrder | null = null;

  constructor(private orderCalculatorService: OrderCalculatorService) {}

  ngOnInit(): void {
    // Suscribirse a cambios en el calculador
    this.orderCalculatorService.calculator$.subscribe(calculator => {
      this.calculator = calculator;
    });
  }

  calculateOrder(): void {
    // Actualizar preferencias
    this.calculator.preferences = [];
    if (this.preferences.sinGluten) this.calculator.preferences.push('sin-gluten');
    if (this.preferences.vegano) this.calculator.preferences.push('vegano');
    if (this.preferences.sugarFree) this.calculator.preferences.push('sugar-free');
    if (this.preferences.entrega) this.calculator.preferences.push('entrega');

    // Realizar cálculo
    this.calculatedOrder = this.orderCalculatorService.calculateOrder(this.calculator);
    
    // Emitir resultado
    this.orderCalculated.emit(this.calculatedOrder);
    
    // Actualizar el servicio
    this.orderCalculatorService.updateCalculator(this.calculator);
  }

  customizeOrder(): void {
    this.customizeRequested.emit();
  }

  proceedToOrderAction(): void {
    if (this.calculatedOrder) {
      this.proceedToOrderEvent.emit(this.calculatedOrder);
    }
  }

  // Métodos para cálculos adicionales
  calculatePortionsPerGuest(): number {
    return this.orderCalculatorService.calculatePortionsPerGuest(this.calculator.guestCount);
  }

  estimateDeliveryCost(distance: number = 10): number {
    return this.orderCalculatorService.calculateDeliveryCost(this.calculator.guestCount, distance);
  }

  estimatePreparationTime(): number {
    const complexity = this.calculator.guestCount > 50 ? 'complex' : 
                      this.calculator.guestCount > 30 ? 'medium' : 'simple';
    return this.orderCalculatorService.estimatePreparationTime(this.calculator.guestCount, complexity);
  }

  // Métodos para validación
  isValidForm(): boolean {
    return this.calculator.guestCount >= 10 && 
           this.calculator.eventType !== '' && 
           this.calculator.budget >= 5000;
  }

  getEventTypeDisplayName(eventType: string): string {
    const names: { [key: string]: string } = {
      'cumpleanos': 'Cumpleaños',
      'boda': 'Boda',
      'corporativo': 'Evento Corporativo',
      'graduacion': 'Graduación',
      'baby-shower': 'Baby Shower',
      'otro': 'Otro'
    };
    return names[eventType] || eventType;
  }

  // Métodos para sugerencias dinámicas
  getBudgetRecommendation(): string {
    const guestCount = this.calculator.guestCount;
    const recommendedBudget = guestCount * 800; // $800 por invitado
    
    if (this.calculator.budget < recommendedBudget * 0.8) {
      return 'Considera aumentar tu presupuesto para una mejor experiencia';
    } else if (this.calculator.budget > recommendedBudget * 1.2) {
      return 'Tu presupuesto permite opciones premium adicionales';
    } else {
      return 'Tu presupuesto es ideal para este tipo de evento';
    }
  }

  getGuestCountRecommendation(): string {
    const count = this.calculator.guestCount;
    
    if (count < 20) {
      return 'Para eventos pequeños, considera el Combo Básico';
    } else if (count < 50) {
      return 'El Combo Premium sería perfecto para tu evento';
    } else {
      return 'Para eventos grandes, el Combo Luxury ofrece la mejor experiencia';
    }
  }
}
