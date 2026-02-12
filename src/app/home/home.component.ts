import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, effect } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimationsService } from '../services/animations.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;
  private typingTimer: any = null;

  constructor(
    private animationsService: AnimationsService,
    public languageService: LanguageService
  ) {
    // Reaccionar a cambios de idioma
    effect(() => {
      const lang = this.languageService.currentLanguageSignal();
      // Re-ejecutar el efecto de typing cuando cambia el idioma
      // Esperar un poco más para asegurar que el cambio de idioma se haya aplicado
      setTimeout(() => {
        this.setupTypingEffect();
      }, 150);
    });
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  ngOnInit(): void {
    // Inicializar animaciones cuando el componente se carga
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
    this.setupParallaxEffects();
    // Esperar un poco para asegurar que el servicio de traducción esté listo
    // Usar un delay más largo para asegurar que todo esté inicializado
    setTimeout(() => {
      this.setupTypingEffect();
    }, 300);
    this.setupFloatingParticles();
  }

  ngOnDestroy(): void {
    // Limpiar el timer cuando el componente se destruye
    if (this.typingTimer) {
      clearInterval(this.typingTimer);
      this.typingTimer = null;
    }
  }

  private initializeAnimations(): void {
    // Configurar Intersection Observer para animaciones de entrada
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

    // Aplicar micro-interacciones a botones
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      this.animationsService.addButtonMicroInteractions(ctaButton as HTMLElement);
    }
  }

  private setupParallaxEffects(): void {
    // Configurar parallax para elementos de fondo
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
      this.animationsService.setupParallax(parallaxBg as HTMLElement, 0.3);
    }

    const parallaxElements = document.querySelectorAll('.parallax-element-1, .parallax-element-2, .parallax-element-3');
    parallaxElements.forEach((element, index) => {
      const speed = 0.1 + (index * 0.05); // Velocidades diferentes para cada elemento
      this.animationsService.setupParallax(element as HTMLElement, speed);
    });
  }

  private setupTypingEffect(): void {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
      // Limpiar cualquier timer previo
      if (this.typingTimer) {
        clearInterval(this.typingTimer);
        this.typingTimer = null;
      }
      
      // Asegurarse de que el elemento esté completamente vacío
      typingElement.textContent = '';
      
      // Obtener el texto traducido
      const text = this.translate('home.subtitle');
      
      // Verificar que el texto sea válido antes de iniciar el typing
      if (text && text !== 'home.subtitle' && text.length > 0) {
        // Esperar un frame para asegurar que el DOM esté listo
        requestAnimationFrame(() => {
          // Limpiar nuevamente por si acaso
          typingElement.textContent = '';
          
          // Iniciar el typing effect con control del timer
          this.startTypingEffect(typingElement as HTMLElement, text);
        });
      } else {
        // Si la traducción no está lista, intentar de nuevo en un momento
        setTimeout(() => {
          this.setupTypingEffect();
        }, 100);
      }
    }
  }

  private startTypingEffect(element: HTMLElement, text: string): void {
    // Limpiar cualquier timer previo
    if (this.typingTimer) {
      clearInterval(this.typingTimer);
    }
    
    let i = 0;
    element.textContent = '';
    
    this.typingTimer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        if (this.typingTimer) {
          clearInterval(this.typingTimer);
          this.typingTimer = null;
        }
      }
    }, 100);
  }

  private setupFloatingParticles(): void {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      const element = particle as HTMLElement;
      
      // Posiciones aleatorias
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const randomSize = Math.random() * 4 + 2;
      const randomDuration = Math.random() * 3 + 2;
      
      element.style.left = `${randomX}%`;
      element.style.top = `${randomY}%`;
      element.style.width = `${randomSize}px`;
      element.style.height = `${randomSize}px`;
      element.style.animationDuration = `${randomDuration}s`;
      
      // Agregar clase de animación
      element.classList.add('animate-float');
    });
  }
}
