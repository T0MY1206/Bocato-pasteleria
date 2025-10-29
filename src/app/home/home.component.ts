import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimationsService } from '../services/animations.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('heroSection', { static: false }) heroSection!: ElementRef;

  constructor(private animationsService: AnimationsService) {}

  ngOnInit(): void {
    // Inicializar animaciones cuando el componente se carga
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
    this.setupParallaxEffects();
    this.setupTypingEffect();
    this.setupFloatingParticles();
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
      const text = 'la dulce tentación';
      typingElement.textContent = '';
      this.animationsService.typeWriter(typingElement as HTMLElement, text, 100);
    }
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
