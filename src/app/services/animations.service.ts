import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  
  // Configuración de animaciones
  private readonly animationConfig = {
    duration: 300,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    stagger: 100
  };

  // Animaciones de entrada con Intersection Observer
  observeElements(selector: string, callback: (entries: IntersectionObserverEntry[]) => void): IntersectionObserver {
    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll(selector);
    elements.forEach(el => observer.observe(el));

    return observer;
  }

  // Animación de fade in con slide up
  fadeInSlideUp(element: HTMLElement, delay: number = 0): void {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity ${this.animationConfig.duration}ms ${this.animationConfig.easing}, transform ${this.animationConfig.duration}ms ${this.animationConfig.easing}`;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  }

  // Animación de parallax scrolling
  setupParallax(element: HTMLElement, speed: number = 0.5): void {
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', updateParallax);
  }

  // Micro-interacciones para botones
  addButtonMicroInteractions(button: HTMLElement): void {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px) scale(1.02)';
      button.style.boxShadow = '0 10px 25px rgba(160, 82, 45, 0.3)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0) scale(1)';
      button.style.boxShadow = '0 4px 15px rgba(160, 82, 45, 0.2)';
    });

    button.addEventListener('mousedown', () => {
      button.style.transform = 'translateY(0) scale(0.98)';
    });

    button.addEventListener('mouseup', () => {
      button.style.transform = 'translateY(-2px) scale(1.02)';
    });
  }

  // Animación de cards con hover avanzado
  addCardHoverEffect(card: HTMLElement): void {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
      card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
  }

  // Loading state elegante
  createLoadingSpinner(): HTMLElement {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = `
      <div class="spinner-ring">
        <div class="spinner-ring-inner"></div>
      </div>
      <div class="spinner-text">Preparando tu dulce momento...</div>
    `;
    return spinner;
  }

  // Animación de typing effect
  typeWriter(element: HTMLElement, text: string, speed: number = 50): void {
    let i = 0;
    element.textContent = '';
    
    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }

  // Animación de contador
  animateCounter(element: HTMLElement, target: number, duration: number = 2000): void {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.floor(current).toString();
      
      if (current >= target) {
        element.textContent = target.toString();
        clearInterval(timer);
      }
    }, 16);
  }

  // Efecto de glassmorphism
  applyGlassmorphism(element: HTMLElement): void {
    element.style.background = 'rgba(255, 255, 255, 0.1)';
    element.style.backdropFilter = 'blur(10px)';
    element.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    element.style.borderRadius = '16px';
    element.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
  }

  // Gradiente dinámico
  createDynamicGradient(element: HTMLElement, colors: string[]): void {
    const gradient = `linear-gradient(135deg, ${colors.join(', ')})`;
    element.style.background = gradient;
    element.style.backgroundSize = '400% 400%';
    
    // Animación del gradiente
    let position = 0;
    setInterval(() => {
      position = (position + 1) % 100;
      element.style.backgroundPosition = `${position}% 50%`;
    }, 50);
  }
}
