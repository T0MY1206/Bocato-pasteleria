# 🔒 Configuración de Protección de Rama Main

Esta guía explica cómo configurar la protección de la rama `main` en GitHub para que solo el propietario pueda hacer push directo y todos los demás cambios requieran Pull Requests aprobados.

## 📋 Pasos para Configurar la Protección de Rama

### 1. Acceder a la Configuración del Repositorio

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración) en la barra superior del repositorio
3. En el menú lateral izquierdo, haz clic en **Branches** (Ramas)

### 2. Configurar Branch Protection Rule

1. En la sección **"Branch protection rules"**, haz clic en **"Add rule"** (Agregar regla)
2. En el campo **"Branch name pattern"**, escribe: `main`

### 3. Configurar las Opciones de Protección

Activa las siguientes opciones:

#### ✅ **Require a pull request before merging**
   - ✅ **Require approvals**: 1 (o el número que prefieras)
   - ✅ **Dismiss stale pull request approvals when new commits are pushed**
   - ✅ **Require review from Code Owners** (opcional, si tienes un archivo CODEOWNERS)

#### ✅ **Require status checks to pass before merging**
   - Si tienes GitHub Actions configurados, puedes requerir que pasen antes de fusionar
   - Marca los checks que quieras requerir (ej: build, test, lint)

#### ✅ **Require conversation resolution before merging**
   - Esto asegura que todos los comentarios en el PR sean resueltos antes de fusionar

#### ✅ **Require signed commits** (Opcional pero recomendado)
   - Requiere que los commits estén firmados con GPG

#### ✅ **Require linear history** (Opcional)
   - Evita merge commits, solo permite rebase o squash

#### ✅ **Include administrators** (IMPORTANTE)
   - **Marca esta opción** para que incluso tú (como administrador) necesites seguir estas reglas
   - Esto asegura que nadie pueda hacer push directo, ni siquiera tú

#### ✅ **Restrict who can push to matching branches**
   - Selecciona **"Restrict pushes that create files"** si quieres restringir aún más
   - O deja solo las reglas anteriores

#### ✅ **Do not allow bypassing the above settings**
   - Esto previene que alguien con permisos de administrador pueda saltarse las reglas

### 4. Configurar Notificaciones

Para recibir notificaciones cuando alguien abre un Pull Request:

1. Ve a **Settings** > **Notifications**
2. En la sección **"Pull requests"**, activa:
   - ✅ **Pull requests**
   - ✅ **Pull request reviews**
   - ✅ **Pull request comments**
3. Configura cómo quieres recibir las notificaciones:
   - Email
   - Notificaciones en GitHub
   - Webhooks (para integraciones)

### 5. Configurar Webhooks (Opcional pero Recomendado)

Para recibir notificaciones en tiempo real:

1. Ve a **Settings** > **Webhooks**
2. Haz clic en **"Add webhook"**
3. Configura:
   - **Payload URL**: Tu endpoint (Slack, Discord, email, etc.)
   - **Content type**: `application/json`
   - **Events**: Selecciona:
     - ✅ Pull requests
     - ✅ Pull request reviews
     - ✅ Pull request review comments
   - ✅ **Active**

## 🎯 Resultado Final

Una vez configurado, el flujo será:

1. **Otros colaboradores:**
   - No pueden hacer push directo a `main`
   - Deben crear una rama nueva (ej: `feature/nueva-funcionalidad`)
   - Hacer push a su rama
   - Crear un Pull Request desde su rama hacia `main`

2. **Tú (propietario):**
   - Recibirás notificaciones cuando se abra un PR
   - Puedes revisar los cambios
   - Aprobar o solicitar cambios
   - Una vez aprobado, puedes fusionar el PR

3. **Protección:**
   - Nadie puede hacer push directo a `main` (ni siquiera tú si marcaste "Include administrators")
   - Todos los cambios deben pasar por un PR aprobado
   - Los checks de CI/CD deben pasar (si los configuraste)

## 📧 Configuración de Notificaciones por Email

Para asegurarte de recibir todas las notificaciones:

1. Ve a tu perfil en GitHub (arriba a la derecha) > **Settings**
2. Ve a **Notifications**
3. Configura:
   - ✅ **Email** > Activa las notificaciones que quieras
   - ✅ **Pull requests** > Marca todas las opciones
   - ✅ **Pull request reviews** > Marca todas las opciones

## 🔔 Notificaciones en Tiempo Real

### Opción 1: GitHub Mobile App
- Descarga la app de GitHub en tu móvil
- Activa las notificaciones push
- Recibirás alertas instantáneas

### Opción 2: Integración con Slack/Discord
- Configura un webhook que envíe notificaciones a tu canal de Slack/Discord
- Recibirás mensajes cuando se abran PRs

### Opción 3: Email con Filtros
- Configura filtros en tu email para destacar las notificaciones de GitHub
- Marca como importantes los emails de Pull Requests

## ⚠️ Notas Importantes

- **Incluir administradores**: Si marcas "Include administrators", incluso tú necesitarás crear PRs para cambios en `main`. Esto es más seguro pero menos flexible.
- **Permisos de colaboradores**: Asegúrate de que los colaboradores tengan permisos de "Write" o "Maintain" para poder crear ramas y PRs.
- **Ramas alternativas**: Puedes crear ramas de desarrollo (ej: `develop`) sin protección si necesitas más flexibilidad.

## 🚀 Flujo de Trabajo Recomendado

```
Colaborador                    Tú (Propietario)
     |                              |
     |-- Fork/Clone repo            |
     |-- Crear rama feature         |
     |-- Hacer cambios              |
     |-- Push a su rama             |
     |-- Crear Pull Request ------>  |
     |                              |-- Recibir notificación
     |                              |-- Revisar cambios
     |                              |-- Aprobar/Solicitar cambios
     |                              |-- Fusionar PR
     |<-----------------------------|
```

## 📚 Recursos Adicionales

- [GitHub Docs: About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [GitHub Docs: Managing pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews)
- [GitHub Docs: Configuring notifications](https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications)
