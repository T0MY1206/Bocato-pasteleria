import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface OrderCalculator {
  guestCount: number;
  eventType: string;
  budget: number;
  preferences: string[];
  customizations: { [key: string]: any };
}

export interface CalculatedOrder {
  recommendedPackage: string;
  items: OrderItem[];
  totalPrice: number;
  savings: number;
  servingSize: number;
  preparationTime: number;
  suggestions: string[];
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderCalculatorService {
  private calculatorSubject = new BehaviorSubject<OrderCalculator>({
    guestCount: 20,
    eventType: 'cumpleanos',
    budget: 20000,
    preferences: [],
    customizations: {}
  });

  public calculator$ = this.calculatorSubject.asObservable();

  // Configuraciones de paquetes
  private packages = {
    basico: {
      name: 'Combo Básico',
      basePrice: 17700,
      guestRange: { min: 15, max: 30 },
      items: [
        { productId: 'torta-principal', name: 'Torta Principal', quantity: 1, unitPrice: 8500 },
        { productId: 'cupcakes', name: 'Cupcakes Variados', quantity: 12, unitPrice: 350 },
        { productId: 'alfajores', name: 'Alfajores Artesanales', quantity: 20, unitPrice: 150 },
        { productId: 'montaje', name: 'Montaje y Decoración', quantity: 1, unitPrice: 2000 }
      ]
    },
    premium: {
      name: 'Combo Premium',
      basePrice: 41200,
      guestRange: { min: 30, max: 60 },
      items: [
        { productId: 'torta-principal', name: 'Torta Principal', quantity: 1, unitPrice: 15000 },
        { productId: 'macarons', name: 'Macarons de Lujo', quantity: 24, unitPrice: 300 },
        { productId: 'petit-fours', name: 'Petit Fours Variados', quantity: 30, unitPrice: 200 },
        { productId: 'mesa-dulce', name: 'Mesa Dulce Temática', quantity: 1, unitPrice: 8000 },
        { productId: 'catering', name: 'Servicio de Catering', quantity: 1, unitPrice: 5000 }
      ]
    },
    luxury: {
      name: 'Combo Luxury',
      basePrice: 64800,
      guestRange: { min: 50, max: 100 },
      items: [
        { productId: 'torta-principal', name: 'Torta Principal', quantity: 1, unitPrice: 22000 },
        { productId: 'macarons-premium', name: 'Macarons Premium', quantity: 36, unitPrice: 300 },
        { productId: 'petit-fours-gourmet', name: 'Petit Fours Gourmet', quantity: 50, unitPrice: 200 },
        { productId: 'mesa-dulce-personalizada', name: 'Mesa Dulce Personalizada', quantity: 1, unitPrice: 12000 },
        { productId: 'servicio-completo', name: 'Servicio Completo', quantity: 1, unitPrice: 8000 },
        { productId: 'opciones-especiales', name: 'Opciones Sin Gluten/Veganas', quantity: 1, unitPrice: 3000 }
      ]
    }
  };

  updateCalculator(calculator: Partial<OrderCalculator>): void {
    const current = this.calculatorSubject.value;
    this.calculatorSubject.next({ ...current, ...calculator });
  }

  calculateOrder(calculator: OrderCalculator): CalculatedOrder {
    const { guestCount, eventType, budget, preferences } = calculator;
    
    // Determinar el paquete recomendado
    const recommendedPackage = this.getRecommendedPackage(guestCount, budget);
    const packageConfig = this.packages[recommendedPackage as keyof typeof this.packages];
    
    // Calcular items ajustados por cantidad de invitados
    const adjustedItems = this.adjustItemsForGuestCount(packageConfig.items, guestCount);
    
    // Calcular precio total
    const totalPrice = adjustedItems.reduce((sum, item) => sum + item.totalPrice, 0);
    
    // Calcular ahorros
    const savings = this.calculateSavings(totalPrice, budget);
    
    // Generar sugerencias
    const suggestions = this.generateSuggestions(guestCount, eventType, budget, totalPrice);
    
    return {
      recommendedPackage: packageConfig.name,
      items: adjustedItems,
      totalPrice,
      savings,
      servingSize: guestCount,
      preparationTime: this.calculatePreparationTime(guestCount),
      suggestions
    };
  }

  private getRecommendedPackage(guestCount: number, budget: number): string {
    if (guestCount <= 30 && budget <= 25000) {
      return 'basico';
    } else if (guestCount <= 60 && budget <= 50000) {
      return 'premium';
    } else {
      return 'luxury';
    }
  }

  private adjustItemsForGuestCount(items: any[], guestCount: number): OrderItem[] {
    return items.map(item => {
      let adjustedQuantity = item.quantity;
      
      // Ajustar cantidad basada en número de invitados
      if (item.productId === 'torta-principal') {
        adjustedQuantity = Math.ceil(guestCount / 25); // 25 porciones por torta
      } else if (item.productId === 'cupcakes') {
        adjustedQuantity = Math.ceil(guestCount * 0.6); // 60% de invitados
      } else if (item.productId === 'alfajores') {
        adjustedQuantity = Math.ceil(guestCount * 0.8); // 80% de invitados
      } else if (item.productId === 'macarons' || item.productId === 'macarons-premium') {
        adjustedQuantity = Math.ceil(guestCount * 0.5); // 50% de invitados
      } else if (item.productId === 'petit-fours' || item.productId === 'petit-fours-gourmet') {
        adjustedQuantity = Math.ceil(guestCount * 0.6); // 60% de invitados
      }
      
      return {
        ...item,
        quantity: adjustedQuantity,
        totalPrice: adjustedQuantity * item.unitPrice
      };
    });
  }

  private calculateSavings(totalPrice: number, budget: number): number {
    return Math.max(0, budget - totalPrice);
  }

  private calculatePreparationTime(guestCount: number): number {
    // Tiempo base + tiempo adicional por invitado
    return Math.max(24, 24 + Math.ceil(guestCount / 10) * 6); // Mínimo 24 horas
  }

  private generateSuggestions(guestCount: number, eventType: string, budget: number, totalPrice: number): string[] {
    const suggestions: string[] = [];
    
    if (totalPrice < budget * 0.8) {
      suggestions.push('💡 Puedes agregar opciones premium con tu presupuesto actual');
    }
    
    if (guestCount > 50) {
      suggestions.push('🎂 Considera una torta adicional para asegurar suficientes porciones');
    }
    
    if (eventType === 'boda') {
      suggestions.push('💍 Incluye mesa dulce temática para una experiencia completa');
    }
    
    if (eventType === 'corporativo') {
      suggestions.push('☕ Agrega servicio de café premium para eventos corporativos');
    }
    
    return suggestions;
  }

  // Métodos para cálculos específicos
  calculatePortionsPerGuest(guestCount: number): number {
    return Math.ceil(guestCount * 1.2); // 20% extra para asegurar suficientes porciones
  }

  calculateDeliveryCost(guestCount: number, distance: number): number {
    const baseCost = 1500;
    const perGuestCost = guestCount * 50;
    const distanceCost = distance * 200;
    return baseCost + perGuestCost + distanceCost;
  }

  estimatePreparationTime(guestCount: number, complexity: 'simple' | 'medium' | 'complex'): number {
    const baseHours = { simple: 12, medium: 24, complex: 48 };
    const additionalHours = Math.ceil(guestCount / 20) * 6;
    return baseHours[complexity] + additionalHours;
  }
}
