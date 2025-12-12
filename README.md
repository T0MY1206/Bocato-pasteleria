# 🍰 Bocato Pastelería

Sitio web moderno y elegante para Bocato Pastelería, desarrollado con Angular. Una experiencia digital que refleja la dulzura y el arte de la repostería, con soporte completo para múltiples idiomas y temas.

![Angular](https://img.shields.io/badge/Angular-20.3.0-red?style=flat-square&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue?style=flat-square&logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple?style=flat-square&logo=bootstrap)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## ✨ Características Principales

### 🌍 Internacionalización (i18n)
- **Soporte completo para Español e Inglés**
- Cambio de idioma en tiempo real sin recargar la página
- Traducciones completas en todas las secciones:
  - Página de inicio
  - Menú completo (carta)
  - Galería de productos
  - Formulario de reservas y contacto
  - Navegación y footer
- Idioma por defecto: Inglés
- Preferencias guardadas en `localStorage`

### 🌙 Tema Oscuro
- **Modo claro y oscuro** con transición suave
- Estética de pastelería mantenida en ambos temas
- Colores personalizados con variables CSS
- Detección automática de preferencias del sistema
- Preferencias guardadas en `localStorage`

### 🎨 Diseño y Animaciones
- **Animaciones fluidas** y micro-interacciones
- Efecto de escritura (typing) en el hero
- Efectos parallax en la sección principal
- Carrusel automático en la galería
- Transiciones suaves entre páginas
- Diseño responsive para todos los dispositivos

### 📱 Responsive Design
- Diseño adaptativo para móviles, tablets y desktop
- Navegación móvil con menú hamburguesa
- Imágenes optimizadas y carga rápida
- Experiencia de usuario consistente en todos los dispositivos

## 🛠️ Tecnologías Utilizadas

- **Framework**: Angular 20.3.0
- **Lenguaje**: TypeScript 5.9.2
- **Estilos**: CSS3 con variables CSS, Bootstrap 5.3.8
- **Iconos**: Bootstrap Icons 1.13.1
- **Routing**: Angular Router
- **Estado**: Angular Signals
- **Build Tool**: Angular CLI 20.3.7

## 📋 Requisitos Previos

- **Node.js**: v20.19 o superior (o v22.12+)
- **npm**: v9.0.0 o superior
- **Angular CLI**: v20.3.7 o superior

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd Bocato-pasteleria
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar servidor de desarrollo

```bash
npm start
# o
ng serve
```

El sitio estará disponible en `http://localhost:4200/`

### 4. Compilar para producción

```bash
npm run build
# o
ng build
```

Los archivos compilados se generarán en `dist/proyecto/browser/`

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo en `http://localhost:4200` |
| `npm run build` | Compila el proyecto para producción |
| `npm run watch` | Compila en modo watch (desarrollo) |
| `npm test` | Ejecuta los tests unitarios con Karma |

## 📁 Estructura del Proyecto

```
Bocato-pasteleria/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Workflow de GitHub Actions para deployment
├── public/
│   └── assets/                # Imágenes y recursos estáticos
├── src/
│   ├── app/
│   │   ├── assets/
│   │   │   └── i18n/
│   │   │       └── translations.ts    # Archivo de traducciones ES/EN
│   │   ├── carta/                      # Componente del menú
│   │   ├── contacto/                   # Componente de reservas/contacto
│   │   ├── galeria/                    # Componente de galería
│   │   ├── home/                       # Componente de inicio
│   │   ├── services/
│   │   │   ├── language.service.ts     # Servicio de idiomas
│   │   │   ├── theme.service.ts        # Servicio de temas
│   │   │   └── animations.service.ts   # Servicio de animaciones
│   │   ├── app.ts                      # Componente raíz
│   │   ├── app.html                    # Template raíz
│   │   ├── app.routes.ts               # Configuración de rutas
│   │   └── app.config.ts               # Configuración de la app
│   ├── styles.css                      # Estilos globales y variables CSS
│   ├── index.html                      # HTML principal
│   └── main.ts                         # Punto de entrada
├── angular.json                        # Configuración de Angular
├── package.json                        # Dependencias y scripts
└── README.md                           # Este archivo
```

## 🌐 Deployment a GitHub Pages

### Método 1: GitHub Actions (Recomendado) ⚡

El proyecto está configurado con GitHub Actions para deployment automático. Cada push a la rama `main` desplegará automáticamente el sitio.

**Pasos para activar:**

1. **Habilitar GitHub Pages:**
   - Ve a `Settings > Pages` en tu repositorio
   - En "Source", selecciona **"GitHub Actions"**
   - Guarda los cambios

2. **Hacer push a main:**
   ```bash
   git push origin main
   ```

3. **Tu sitio estará disponible en:**
   ```
   https://<username>.github.io/Bocato-pasteleria/
   ```

El workflow automáticamente:
- ✅ Compila el proyecto con el `base-href` correcto
- ✅ Crea un archivo `404.html` para soporte de SPA
- ✅ Despliega a GitHub Pages

### Método 2: Deployment Manual

1. **Compilar con base-href:**
   ```bash
   ng build --base-href=/Bocato-pasteleria/
   ```

2. **Instalar gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Agregar script a `package.json`:**
   ```json
   "scripts": {
     "deploy": "ng build --base-href=/Bocato-pasteleria/ && gh-pages -d dist/proyecto/browser"
   }
   ```

4. **Desplegar:**
   ```bash
   npm run deploy
   ```

5. **Configurar GitHub Pages:**
   - Ve a `Settings > Pages`
   - Source: rama `gh-pages`
   - Guarda

## 🎨 Personalización

### Cambiar Colores del Tema

Los colores se definen mediante variables CSS en `src/styles.css`:

```css
:root {
  --bg-primary: #fcfcfc;
  --text-primary: #3e2723;
  --caramel: #a0522d;
  /* ... más variables */
}

[data-theme="dark"] {
  --bg-primary: #1a1614;
  --text-primary: #f5e6d3;
  --caramel: #d2691e;
  /* ... más variables */
}
```

### Agregar Traducciones

Las traducciones se encuentran en `src/app/assets/i18n/translations.ts`:

```typescript
export const translations = {
  es: {
    // Traducciones en español
  },
  en: {
    // Traducciones en inglés
  }
};
```

### Agregar Nuevas Rutas

Las rutas se configuran en `src/app/app.routes.ts`:

```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'carta', component: CartaComponent },
  // ... más rutas
];
```

## 🧪 Testing

### Ejecutar tests unitarios

```bash
npm test
# o
ng test
```

### Ejecutar tests con cobertura

```bash
ng test --code-coverage
```

## 📚 Recursos Adicionales

- [Angular Documentation](https://angular.dev)
- [Angular CLI Overview](https://angular.dev/tools/cli)
- [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

**Nota importante**: La rama `main` está protegida. Todos los cambios deben pasar por un Pull Request que será revisado y aprobado antes de ser fusionado.

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ para Bocato Pastelería

---

**Nota**: Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 20.3.7.