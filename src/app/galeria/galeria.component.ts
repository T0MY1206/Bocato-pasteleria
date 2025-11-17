import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRecetasComponent } from '../compartido/modal-recetas/modal-recetas.component';
import { SearchAdvancedComponent } from '../compartido/search-advanced/search-advanced.component';
import { AnimationsService } from '../services/animations.service';
import { SearchResult } from '../services/search.service';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, ModalRecetasComponent],
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit, AfterViewInit, OnDestroy {
  // Modal de recetas
  isModalOpen = false;
  modalTitle = '';
  modalContent = '';

  // Modal de zoom de imagen
  isImageZoomOpen = false;
  zoomedImageUrl = '';
  zoomedImageAlt = '';

  // Filtros y búsqueda
  quickFilters = [
    { id: 'all', name: 'Todos', icon: 'bi bi-grid-3x3' },
    { id: 'tortas', name: 'Tortas', icon: 'bi bi-cake' },
    { id: 'bolleria', name: 'Bollería', icon: 'bi bi-basket' },
    { id: 'catering', name: 'Catering', icon: 'bi bi-calendar-event' },
    { id: 'signature', name: 'Signature', icon: 'bi bi-star-fill' }
  ];
  activeFilter = 'all';

  // Wishlist/Favoritos
  favorites: string[] = [];

  // Resultados de búsqueda
  searchResults: SearchResult | null = null;

  // Carrusel de productos
  productos = [
    { id: 1, nombre: 'tarta de Mango & Maracuyá', imagen: 'assets/mangoymaracuya.jpg' },
    { id: 2, nombre: 'croissant de Doble Chocolate', imagen: 'assets/chococro.jpg' },
    { id: 3, nombre: 'bride', imagen: 'assets/mesadulce.jpg' }
  ];

  currentIndex = 0;
  private carouselInterval: any;

  constructor(private animationsService: AnimationsService) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.startCarousel();
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  ngOnDestroy(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  startCarousel(): void {
    // Cambiar de imagen cada 3 segundos
    this.carouselInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.productos.length;
    }, 3000);
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    // Reiniciar el intervalo cuando se cambia manualmente
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
    this.startCarousel();
  }

  private initializeAnimations(): void {
    // Configurar animaciones de entrada
    this.animationsService.observeElements('.animate-fade-in-up', (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const delay = parseInt(element.getAttribute('data-animation-delay') || '0');
          
          setTimeout(() => {
            element.classList.add('animate-in');
          }, delay);
        }
      });
    });

    // Aplicar efectos hover a las cards
    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(card => {
      this.animationsService.addCardHoverEffect(card as HTMLElement);
    });
  }

  // Métodos del modal de recetas
  openRecipeModal(title: string, content: string) {
    this.modalTitle = title;
    this.modalContent = content;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Métodos del modal de zoom
  openImageZoom(imageUrl: string, imageAlt: string) {
    this.zoomedImageUrl = imageUrl;
    this.zoomedImageAlt = imageAlt;
    this.isImageZoomOpen = true;
    
    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
  }

  closeImageZoom() {
    this.isImageZoomOpen = false;
    this.zoomedImageUrl = '';
    this.zoomedImageAlt = '';
    
    // Restaurar scroll del body
    document.body.style.overflow = '';
  }

  // Métodos de filtros
  applyQuickFilter(filter: any) {
    this.activeFilter = filter.id;
    // Aquí implementarías la lógica de filtrado
    console.log('Aplicando filtro:', filter.name);
  }

  // Métodos de favoritos
  toggleFavorite(productId: string) {
    const index = this.favorites.indexOf(productId);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(productId);
    }
    this.saveFavorites();
  }

  isFavorite(productId: string): boolean {
    return this.favorites.includes(productId);
  }

  private loadFavorites(): void {
    const saved = localStorage.getItem('bocato-favorites');
    if (saved) {
      this.favorites = JSON.parse(saved);
    }
  }

  private saveFavorites(): void {
    localStorage.setItem('bocato-favorites', JSON.stringify(this.favorites));
  }

  // Métodos de búsqueda
  onSearchResults(results: SearchResult) {
    this.searchResults = results;
    console.log('Resultados de búsqueda:', results);
  }

  onProductSelected(product: any) {
    console.log('Producto seleccionado:', product);
    // Aquí podrías abrir un modal con detalles del producto
  }

  // Métodos de recetas (mantener los existentes)
  getMangoMaracuyaRecipe(): string {
    return `Ingredientes

Para la base:

200 g de galletas tipo María o Digestive

100 g de mantequilla derretida

1 cucharada de azúcar (opcional)

Para el relleno:

250 g de pulpa de mango (puede ser natural o congelada)

150 g de pulpa de maracuyá (sin semillas)

200 g de queso crema (tipo Philadelphia)

200 ml de nata o crema para batir (35% MG)

80 g de azúcar

6 hojas de gelatina (o 10 g de gelatina sin sabor en polvo)

1 cucharadita de esencia de vainilla (opcional)

Jugo de medio limón

Para la cobertura:

150 g de pulpa de maracuyá

2 cucharadas de azúcar

2 hojas de gelatina (o 3 g en polvo)

Preparación paso a paso

1. Tritura las galletas hasta obtener un polvo fino.

2. Mezcla las galletas trituradas con la mantequilla derretida y el azúcar hasta obtener una masa homogénea.

3. Coloca la mezcla en el fondo de un molde desmontable de 20 a 22 cm de diámetro, presiona bien y refrigera durante 20 minutos.

4. Hidrata las hojas de gelatina en agua fría durante 5 a 10 minutos.

5. En una olla pequeña, calienta las pulpas de mango y maracuyá junto con el azúcar y el jugo de limón.

6. Cuando la mezcla esté caliente (sin hervir), agrega las hojas de gelatina escurridas y remueve hasta que se disuelvan completamente.

7. Deja templar la mezcla durante unos minutos.

8. En otro recipiente, bate el queso crema con la nata y la esencia de vainilla hasta obtener una crema suave.

9. Incorpora poco a poco la mezcla de frutas al batido de queso y nata, mezclando hasta que quede homogéneo.

10. Vierte la mezcla sobre la base de galletas y refrigera durante al menos 4 horas, preferiblemente toda la noche.

11. Hidrata las hojas de gelatina para la cobertura en agua fría.

12. Calienta la pulpa de maracuyá con el azúcar, añade la gelatina escurrida y remueve hasta disolver.

13. Deja enfriar un poco y vierte la mezcla sobre la tarta ya cuajada.

14. Refrigera nuevamente durante 1 a 2 horas, hasta que la cobertura esté firme.

15. Desmolda la tarta con cuidado.

16. Si lo deseas, decora con trozos de mango, semillas de maracuyá, hojas de menta o ralladura de limón.`;
  }

  getCroissantRecipe(): string {
    return `Ingredientes

Para la masa:

500 g de harina de fuerza

10 g de sal

50 g de azúcar

10 g de levadura fresca

250 ml de leche tibia

50 g de mantequilla blanda

Para el laminado:

300 g de mantequilla fría

Para el relleno:

200 g de chocolate negro (70% cacao)

100 g de chocolate con leche

Preparación paso a paso

1. Mezcla la harina, sal y azúcar en un bol grande.

2. Disuelve la levadura en la leche tibia y añádela a la harina.

3. Amasa hasta obtener una masa suave y elástica.

4. Incorpora la mantequilla blanda y amasa otros 10 minutos.

5. Forma una bola, colócala en un bol engrasado y refrigera 1 hora.

6. Estira la masa en rectángulo y coloca la mantequilla fría en el centro.

7. Dobla la masa sobre la mantequilla y refrigera 30 minutos.

8. Estira y dobla la masa 3 veces más, refrigerando entre cada doblez.

9. Refrigera toda la noche.

10. Estira la masa y córtala en triángulos.

11. Coloca chocolate en la base de cada triángulo.

12. Enrolla desde la base hacia la punta.

13. Coloca en bandeja engrasada y deja levar 2 horas.

14. Pinta con huevo batido y hornea a 200°C por 15-20 minutos.`;
  }

  getBrideRecipe(): string {
    return `Paquete Catering para Bodas

Información del Paquete:

Para 50-80 invitados

Precio: $45.000 - $65.000

Tiempo de preparación: 3-5 días

Incluye:

Torta Principal de Bodas:

Torta de 3 pisos elegante (chocolate belga, vainilla francesa, o red velvet)

Decoración personalizada con flores comestibles

Base de galletas artesanal

Servicio de corte profesional

Mesa Dulce Completa:

30 Macarons premium (6 sabores diferentes)

40 Petit Fours gourmet variados

25 Alfajores artesanales de dulce de leche

20 Trufas de chocolate belga

15 Cupcakes decorados temáticamente

20 Galletas decoradas personalizadas

Bebidas Signature:

Café espresso y americano ilimitado

Té de hierbas premium

Agua saborizada con frutas frescas

Jugos naturales de temporada

Servicios Incluidos:

Montaje y decoración completa del espacio

Mesa dulce temática con diseño personalizado

Servicio de catering durante el evento (3 horas)

Coordinador de evento dedicado

Decoración floral comestible

Embalaje elegante para llevar

Servicio Post-Evento:

Limpieza completa del área

Embalaje de sobras para los novios

Asesoramiento gastronómico personalizado

Garantía de satisfacción

Opciones Adicionales Disponibles:

Torta adicional para mesa de niños (+$8.000)

Barra de café especializada (+$5.000)

Postres sin gluten y veganos (+$3.000)

Decoración temática personalizada (+$4.000)

Servicio extendido hasta 5 horas (+$2.500)

Notas Importantes:

Reserva mínima con 15 días de anticipación

Degustación previa incluida para los novios

Menú adaptable a alergias e intolerancias

Servicio disponible en toda Buenos Aires

Contacto directo con chef pastelero para personalización`;
  }
}
