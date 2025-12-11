# Bocato Pastelería

Proyecto web para Bocato Pastelería desarrollado con Angular.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.7.

## 🛠️ Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd Bocato-pasteleria
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm start
   # o
   ng serve
   ```

4. **Compilar para producción**
   ```bash
   npm run build
   # o
   ng build
   ```

## 📦 Deployment a GitHub Pages

### Método 1: Usando GitHub Actions (Recomendado)

El proyecto está configurado con GitHub Actions para deployment automático. Cada vez que hagas push a la rama `main`, el workflow automáticamente:

1. Compila el proyecto con el `base-href` correcto
2. Crea un archivo `404.html` para soporte de SPA (Single Page Application)
3. Despliega a GitHub Pages

**Pasos para activar:**

1. **Habilitar GitHub Pages en el repositorio:**
   - Ve a Settings > Pages en tu repositorio de GitHub
   - En "Source", selecciona "GitHub Actions"
   - Guarda los cambios

2. **Hacer push a la rama main:**
   ```bash
   git push origin main
   ```

3. **Tu sitio estará disponible en:**
   ```
   https://<username>.github.io/Bocato-pasteleria/
   ```

### Método 2: Deployment Manual

1. **Compilar el proyecto con base-href:**
   ```bash
   ng build --base-href=/Bocato-pasteleria/
   ```

2. **Instalar gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Agregar script de deploy a `package.json`:**
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
   - Ve a Settings > Pages en tu repositorio
   - Source: rama `gh-pages`
   - Guarda

## 🧪 Testing

### Ejecutar tests unitarios

```bash
ng test
```

### Ejecutar tests end-to-end

```bash
ng e2e
```

Angular CLI no incluye un framework de testing e2e por defecto. Puedes elegir uno que se adapte a tus necesidades.

## 📚 Recursos Adicionales

Para más información sobre Angular CLI, incluyendo referencias detalladas de comandos, visita la [página de Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
