import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService, SearchFilter, SearchResult } from '../../services/search.service';

@Component({
  selector: 'app-search-advanced',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-advanced.component.html',
  styleUrls: ['./search-advanced.component.css']
})
export class SearchAdvancedComponent implements OnInit {
  @Output() searchResultsEvent = new EventEmitter<SearchResult>();
  @Output() productSelected = new EventEmitter<any>();

  // Propiedades de búsqueda
  searchQuery = '';
  suggestions: string[] = [];
  showSuggestions = false;
  
  // Filtros
  selectedCategory = '';
  priceRange = { min: 0, max: 10000 };
  filters: SearchFilter = {};
  activeFilters: string[] = [];
  
  // Propiedades para checkboxes
  isSignatureChecked = false;
  isAvailableChecked = false;
  
  // Resultados
  searchResults: SearchResult = { products: [], totalCount: 0, filters: {} };
  sortBy = 'name';
  
  // Categorías
  categories: { id: string; name: string; count: number }[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.performSearch();
  }

  onSearchInput(event: any): void {
    this.searchQuery = event.target.value;
    this.updateSuggestions();
    this.performSearch();
  }

  updateSuggestions(): void {
    if (this.searchQuery.length >= 2) {
      this.suggestions = this.searchService.getSuggestions(this.searchQuery);
    } else {
      this.suggestions = [];
    }
  }

  selectSuggestion(suggestion: string): void {
    this.searchQuery = suggestion;
    this.showSuggestions = false;
    this.performSearch();
  }

  hideSuggestions(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.suggestions = [];
    this.performSearch();
  }

  applyFilters(): void {
    // Resetear filtros completamente
    this.filters = {};
    
    // Solo aplicar filtros que tienen valores válidos
    if (this.selectedCategory) {
      this.filters.category = this.selectedCategory;
    }
    
    if (this.priceRange.min > 0 || this.priceRange.max < 10000) {
      this.filters.priceRange = this.priceRange;
    }
    
    if (this.isSignatureChecked) {
      this.filters.isSignature = true;
    }
    
    if (this.isAvailableChecked) {
      this.filters.isAvailable = true;
    }

    this.updateActiveFilters();
    this.performSearch();
  }

  updateActiveFilters(): void {
    this.activeFilters = [];
    
    if (this.selectedCategory) {
      const category = this.categories.find(c => c.id === this.selectedCategory);
      this.activeFilters.push(`Categoría: ${category?.name}`);
    }
    
    if (this.priceRange.min > 0 || this.priceRange.max < 10000) {
      this.activeFilters.push(`Precio: $${this.priceRange.min} - $${this.priceRange.max}`);
    }
    
    if (this.isSignatureChecked) {
      this.activeFilters.push('Signature');
    }
    
    if (this.isAvailableChecked) {
      this.activeFilters.push('Disponible');
    }
  }

  removeFilter(filter: string): void {
    if (filter.startsWith('Categoría:')) {
      this.selectedCategory = '';
    } else if (filter.startsWith('Precio:')) {
      this.priceRange = { min: 0, max: 10000 };
    } else if (filter === 'Signature') {
      this.isSignatureChecked = false;
    } else if (filter === 'Disponible') {
      this.isAvailableChecked = false;
    }
    
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.priceRange = { min: 0, max: 10000 };
    this.isSignatureChecked = false;
    this.isAvailableChecked = false;
    this.filters = {};
    this.activeFilters = [];
    this.performSearch();
  }

  clearAll(): void {
    this.clearSearch();
    this.clearFilters();
  }

  sortResults(): void {
    const products = [...this.searchResults.products];
    
    switch (this.sortBy) {
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'category':
        products.sort((a, b) => a.category.localeCompare(b.category));
        break;
    }
    
    this.searchResults.products = products;
    this.searchResults = { ...this.searchResults };
  }

  viewProduct(product: any): void {
    this.productSelected.emit(product);
  }

  private performSearch(): void {
    this.searchResults = this.searchService.searchProducts(this.searchQuery, this.filters);
    this.searchResultsEvent.emit(this.searchResults);
  }

  private loadCategories(): void {
    this.categories = this.searchService.getCategories();
  }
}
