import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html'
})
export class App {
  isMenuOpen = false;
  currentRoute = '';

  constructor(
    private router: Router,
    public languageService: LanguageService,
    public themeService: ThemeService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute === route;
  }

  isHomePage(): boolean {
    return this.currentRoute === '/home' || this.currentRoute === '/';
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
