import { Injectable, signal } from '@angular/core';
import { translations } from '../assets/i18n/translations';

export type Language = 'es' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage = signal<Language>('es');
  private translations = translations;

  constructor() {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'es' || saved === 'en')) {
      this.currentLanguage.set(saved);
    } else {
      // Por defecto inglés
      this.currentLanguage.set('en');
    }
  }

  getLanguage(): Language {
    return this.currentLanguage();
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    localStorage.setItem('language', lang);
  }

  toggleLanguage(): void {
    const newLang = this.currentLanguage() === 'es' ? 'en' : 'es';
    this.setLanguage(newLang);
  }

  translate(key: string): string {
    if (!this.translations) return key;
    const keys = key.split('.');
    let value: any = this.translations[this.currentLanguage()];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  }

  get currentLanguageSignal() {
    return this.currentLanguage.asReadonly();
  }
}
