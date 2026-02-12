import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent {
  activeTab = 'tortas';

  constructor(public languageService: LanguageService) {}

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
