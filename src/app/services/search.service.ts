import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SearchFilter {
  category?: string;
  priceRange?: { min: number; max: number };
  tags?: string[];
  isSignature?: boolean;
  isAvailable?: boolean;
}

export interface SearchResult {
  products: any[];
  totalCount: number;
  filters: SearchFilter;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  private filterSubject = new BehaviorSubject<SearchFilter>({});
  
  public searchQuery$ = this.searchSubject.asObservable();
  public filters$ = this.filterSubject.asObservable();

  // Datos mock para productos (luego vendrán del backend)
  private products = [
    {
      id: '1',
      name: 'Cheesecake de Frutos Rojos',
      description: 'Delicioso cheesecake con frutos rojos frescos',
      price: 3200,
      category: 'tortas',
      tags: ['frutos-rojos', 'cheesecake', 'clasico'],
      isSignature: false,
      isAvailable: true,
      imageUrl: 'assets/mangoymaracuya.jpg'
    },
    {
      id: '2',
      name: 'BOCATO Golden Delight',
      description: 'Torta de chocolate belga con caramelo líquido y láminas de oro',
      price: 4500,
      category: 'patisserie',
      tags: ['chocolate', 'caramelo', 'oro', 'signature'],
      isSignature: true,
      isAvailable: true,
      imageUrl: 'assets/chococro.jpg'
    },
    {
      id: '3',
      name: 'Rose Petal Éclair',
      description: 'Éclair relleno de crema de rosa francesa',
      price: 2800,
      category: 'patisserie',
      tags: ['eclair', 'rosa', 'signature'],
      isSignature: true,
      isAvailable: true,
      imageUrl: 'assets/mesadulce.jpg'
    }
  ];

  updateSearchQuery(query: string): void {
    this.searchSubject.next(query);
  }

  updateFilters(filters: SearchFilter): void {
    this.filterSubject.next(filters);
  }

  searchProducts(query: string, filters: SearchFilter): SearchResult {
    let results = [...this.products];

    // Aplicar filtro de texto
    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      results = results.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Aplicar filtros
    if (filters.category) {
      results = results.filter(product => product.category === filters.category);
    }

    if (filters.priceRange) {
      results = results.filter(product => 
        product.price >= filters.priceRange!.min && 
        product.price <= filters.priceRange!.max
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      results = results.filter(product => 
        filters.tags!.some(tag => product.tags.includes(tag))
      );
    }

    if (filters.isSignature !== undefined) {
      results = results.filter(product => product.isSignature === filters.isSignature);
    }

    if (filters.isAvailable !== undefined) {
      results = results.filter(product => product.isAvailable === filters.isAvailable);
    }

    return {
      products: results,
      totalCount: results.length,
      filters
    };
  }

  getSuggestions(query: string): string[] {
    if (query.length < 2) return [];
    
    const suggestions = new Set<string>();
    const searchTerm = query.toLowerCase();

    this.products.forEach(product => {
      // Sugerencias de nombres
      if (product.name.toLowerCase().includes(searchTerm)) {
        suggestions.add(product.name);
      }
      
      // Sugerencias de tags
      product.tags.forEach((tag: string) => {
        if (tag.toLowerCase().includes(searchTerm)) {
          suggestions.add(tag);
        }
      });
    });

    return Array.from(suggestions).slice(0, 5);
  }

  getPopularSearches(): string[] {
    return ['chocolate', 'cheesecake', 'macarons', 'torta de boda', 'croissant'];
  }

  getCategories(): { id: string; name: string; count: number }[] {
    const categories = new Map<string, number>();
    
    this.products.forEach(product => {
      const count = categories.get(product.category) || 0;
      categories.set(product.category, count + 1);
    });

    return Array.from(categories.entries()).map(([id, count]) => ({
      id,
      name: this.getCategoryDisplayName(id),
      count
    }));
  }

  private getCategoryDisplayName(categoryId: string): string {
    const names: { [key: string]: string } = {
      'tortas': 'Tortas Clásicas',
      'patisserie': 'Patisserie by BOCATO',
      'eventos': 'Catering para Eventos'
    };
    return names[categoryId] || categoryId;
  }
}
