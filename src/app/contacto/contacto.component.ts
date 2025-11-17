import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AnimationsService } from '../services/animations.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contacto.component.html'
})
export class ContactoComponent implements OnInit, AfterViewInit {
  formData = {
    name: '',
    email: '',
    phone: '',
    message: '',
    eventDate: '',
    guestCount: 0,
    eventType: '',
    budget: 0,
    preferences: {
      sinGluten: false,
      vegano: false,
      sugarFree: false
    }
  };

  errors = {
    name: '',
    email: '',
    message: ''
  };

  formMessage = '';
  showMessage = false;
  minDate = '';

  constructor(private animationsService: AnimationsService) {}

  ngOnInit(): void {
    // Establecer fecha mínima (hoy)
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
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
    const cards = document.querySelectorAll('.hover-lift');
    cards.forEach(card => {
      this.animationsService.addCardHoverEffect(card as HTMLElement);
    });
  }

  validateForm(): boolean {
    let isValid = true;
    this.errors = { name: '', email: '', message: '' };

    // Validación de Nombre
    if (!this.formData.name.trim()) {
      this.errors.name = 'El nombre es obligatorio.';
      isValid = false;
    } else if (!this.isValidName(this.formData.name)) {
      this.errors.name = 'El nombre solo puede contener letras y espacios.';
      isValid = false;
    }

    // Validación de Email
    if (!this.formData.email.trim()) {
      this.errors.email = 'El correo electrónico es obligatorio.';
      isValid = false;
    } else if (!this.isValidEmail(this.formData.email)) {
      this.errors.email = 'Ingresa un correo válido.';
      isValid = false;
    }

    // Validación de Mensaje
    if (!this.formData.message.trim()) {
      this.errors.message = 'El mensaje es obligatorio.';
      isValid = false;
    }

    return isValid;
  }

  isValidName(name: string): boolean {
    // Solo permite letras, espacios, acentos y caracteres especiales del español
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    return nameRegex.test(name.trim());
  }

  onNameInput(event: any) {
    // Prevenir que se escriban números
    const value = event.target.value;
    const filteredValue = value.replace(/[0-9]/g, '');
    
    if (value !== filteredValue) {
      event.target.value = filteredValue;
      this.formData.name = filteredValue;
    }
  }

  isValidEmail(email: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit() {
    if (this.validateForm()) {
      // Crear mensaje completo
      let completeMessage = this.formData.message;

      // Información adicional del formulario
      if (this.formData.eventDate) {
        completeMessage += `\nFecha del evento: ${this.formData.eventDate}\n`;
      }
      if (this.formData.guestCount > 0) {
        completeMessage += `Cantidad de invitados: ${this.formData.guestCount}\n`;
      }
      if (this.formData.eventType) {
        completeMessage += `Tipo de evento: ${this.formData.eventType}\n`;
      }
      if (this.formData.budget > 0) {
        completeMessage += `Presupuesto: $${this.formData.budget}\n`;
      }

      // Preferencias especiales
      const preferences = [];
      if (this.formData.preferences.sinGluten) preferences.push('Sin Gluten');
      if (this.formData.preferences.vegano) preferences.push('Opciones Veganas');
      if (this.formData.preferences.sugarFree) preferences.push('Sin Azúcar');
      
      if (preferences.length > 0) {
        completeMessage += `Preferencias especiales: ${preferences.join(', ')}\n`;
      }

      // Simulación de envío exitoso
      console.log('Formulario de Reserva Enviado:', {
        ...this.formData,
        message: completeMessage
      });
      
      this.formMessage = '✅ ¡Gracias! Tu reserva ha sido enviada. Te contactaremos pronto para confirmar los detalles.';
      this.showMessage = true;
      
      // Limpiar el formulario
      this.resetForm();
    } else {
      this.formMessage = '❌ Por favor, revisa y corrige los campos marcados en rojo para enviar tu reserva.';
      this.showMessage = true;
    }
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      message: '',
      eventDate: '',
      guestCount: 0,
      eventType: '',
      budget: 0,
      preferences: {
        sinGluten: false,
        vegano: false,
        sugarFree: false
      }
    };
  }
}
