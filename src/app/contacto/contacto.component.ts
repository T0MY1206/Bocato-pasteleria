import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contacto.component.html'
})
export class ContactoComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  errors = {
    name: '',
    email: '',
    message: ''
  };

  formMessage = '';
  showMessage = false;

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
      // Simulación de envío exitoso
      console.log('Formulario de Pedido Enviado:', this.formData);
      
      this.formMessage = '✅ ¡Gracias! Tu pedido ha sido enviado. Te contactaremos pronto.';
      this.showMessage = true;
      
      // Limpiar el formulario
      this.formData = { name: '', email: '', message: '' };
    } else {
      this.formMessage = '❌ Por favor, revisa y corrige los campos marcados en rojo para enviar tu pedido.';
      this.showMessage = true;
    }
  }
}
