import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-recetas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Modal Bootstrap -->
    <div class="modal fade" [class.show]="isOpen" [style.display]="isOpen ? 'block' : 'none'" 
         tabindex="-1" role="dialog" aria-labelledby="recipeModalLabel" [attr.aria-hidden]="!isOpen">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content recipe-modal">
          <div class="modal-header border-0 pb-0 px-5 pt-4">
            <h2 class="modal-title text-caramel fw-bold" id="recipeModalLabel">
              <i class="bi bi-book me-2"></i>{{ title }}
            </h2>
            <button type="button" class="btn-close" (click)="cerrarModal()" aria-label="Cerrar">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="modal-body px-5 py-4">
            <div class="recipe-content" [innerHTML]="contenidoFormateado"></div>
          </div>
          <div class="modal-footer border-0 pt-0 px-5 pb-4">
            <button type="button" class="btn btn-caramel" (click)="cerrarModal()">
              <i class="bi bi-check-lg me-2"></i>Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Backdrop -->
    <div class="modal-backdrop fade" [class.show]="isOpen" *ngIf="isOpen"></div>
  `,
  styles: [`
    .recipe-modal {
      border-radius: 1.5rem;
      border: none;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .modal-header {
      background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
      border-radius: 1.5rem 1.5rem 0 0;
    }
    
    .modal-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.75rem;
    }
    
    .btn-close {
      background: none;
      border: none;
      font-size: 1.25rem;
      color: #6b7280;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.3s ease;
    }
    
    .btn-close:hover {
      background-color: #f3f4f6;
      color: #a0522d;
    }
    
    .recipe-content {
      font-family: 'Inter', sans-serif;
      line-height: 1.7;
      padding: 1rem 0;
      color: #6b7280;
    }
    
    .recipe-content h3 {
      color: #a0522d;
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 2rem 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f3f4f6;
    }
    
    .recipe-content h3:first-child {
      margin-top: 0;
    }
    
    .recipe-content h4 {
      color: #4b5563;
      font-family: 'Inter', sans-serif;
      font-weight: 500;
      margin: 1.5rem 0 0.75rem 0;
    }
    
    .recipe-content ul {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }
    
    .recipe-content li {
      margin: 0.5rem 0;
      color: #6b7280;
      padding: 0.25rem 0;
    }
    
    .recipe-content ol {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }
    
    .recipe-content ol li {
      margin: 0.75rem 0;
      color: #6b7280;
      padding: 0.25rem 0;
    }
    
    .recipe-content p {
      margin: 0.75rem 0;
      color: #6b7280;
      padding: 0.25rem 0;
    }
    
    .recipe-content strong {
      color: #a0522d;
      font-weight: 600;
    }
    
    .modal-backdrop {
      background-color: rgba(0, 0, 0, 0.5);
    }
    
    .modal.show {
      display: block !important;
    }
    
    .modal-backdrop.show {
      opacity: 0.5;
    }
    
    /* Prevenir scroll en el body cuando el modal está abierto */
    body.modal-open {
      overflow: hidden !important;
      padding-right: 0 !important;
    }
    
    /* Asegurar que el modal tenga su propio contexto de scroll */
    .modal-dialog-scrollable .modal-body {
      max-height: 70vh;
      overflow-y: auto;
      overflow-x: hidden;
    }
    
    /* Prevenir que el scroll se propague al body */
    .modal-dialog-scrollable {
      max-height: 90vh;
    }
    
    /* Estilos adicionales para el scroll interno */
    .modal-body::-webkit-scrollbar {
      width: 8px;
    }
    
    .modal-body::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 4px;
    }
    
    .modal-body::-webkit-scrollbar-thumb {
      background: #a0522d;
      border-radius: 4px;
    }
    
    .modal-body::-webkit-scrollbar-thumb:hover {
      background: #8b4513;
    }
  `]
})
export class ModalRecetasComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() content = '';
  @Output() close = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.abrirModal();
      } else {
        this.cerrarModalInterno();
      }
    }
  }

  private abrirModal(): void {
    // Prevenir scroll en el body
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
  }

  private cerrarModalInterno(): void {
    // Restaurar scroll en el body
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  get contenidoFormateado(): string {
    return this.content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^(.+)$/gm, (match: string) => {
        if (match.trim() === '') return '<br>';
        if (match.includes('Ingredientes') || match.includes('Preparación paso a paso')) {
          return `<h3>${match}</h3>`;
        }
        if (match.startsWith('Para ') && match.includes(':')) {
          return `<h4 class="text-stone-700 fw-semibold mt-3 mb-2">${match}</h4>`;
        }
        if (match.match(/^\d+\./)) {
          return `<li>${match}</li>`;
        }
        if (match.includes('•') || match.includes('-')) {
          return `<li>${match.replace(/^[•\-]\s*/, '')}</li>`;
        }
        return `<p>${match}</p>`;
      });
  }

  public cerrarModal(): void {
    this.isOpen = false;
    this.close.emit();
    // Limpiar el body
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen) {
      this.cerrarModal();
    }
  }
}
