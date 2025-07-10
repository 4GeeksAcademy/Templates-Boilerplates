---
title: 'Despliegue en Vercel'
description: 'Aprende cómo publicar fácilmente tu aplicación Vite + React en Vercel con integración a GitHub, compilaciones automáticas y opciones de configuración personalizadas.'
technologies: ['vite', 'react', 'despliegue', 'vercel', 'frontend']
---


# Guía de Despliegue a Vercel

Este archivo te guiará a través de los pasos para desplegar tu aplicación React en Vercel utilizando Vite. Sigue estos pasos para asegurar que tu proyecto se despliegue correctamente.

## Requisitos previos

Antes de comenzar con el despliegue, asegúrate de que:

1. Tienes una cuenta en [Vercel](https://vercel.com).
2. Tienes Git instalado en tu máquina.
3. El proyecto está configurado correctamente en tu máquina local y ya está utilizando Vite para la construcción.

## Paso 1: Conecta tu repositorio a Vercel

1. Accede a tu cuenta de [Vercel](https://vercel.com).
2. Haz clic en el botón **"New Project"**.
3. Selecciona **GitHub** como proveedor de repositorio y autoriza a Vercel para acceder a tu cuenta de GitHub.
4. Elige el repositorio donde tienes tu proyecto y haz clic en **"Import"**.

Vercel automáticamente detectará que estás utilizando un proyecto de Vite y configurará los ajustes de construcción para ti.

## Paso 2: Despliega tu proyecto

Vercel se encargará de construir y desplegar tu proyecto cada vez que hagas un push a tu repositorio. Sin embargo, también puedes hacer un despliegue manual si lo prefieres.

### Paso 3: Configuración adicional (Opcional)

#### 3.1. Dominios personalizados

Si quieres usar un dominio personalizado (por ejemplo, mi-sitio.com), puedes configurar tu dominio en el panel de control de Vercel:

- Ve a la página de tu proyecto en Vercel.
- Entra en **Settings**.
- Selecciona la sección **Domains**.
- Agrega tu dominio personalizado y sigue las instrucciones de Vercel para configurarlo.

#### 3.2. Variables de entorno

Si necesitas configurar variables de entorno (por ejemplo, claves de API), puedes hacerlo desde el panel de configuración de Vercel:

- Entra en **Settings** de tu proyecto.
- Ve a la sección **Environment Variables**.
- Agrega las variables que necesites para tu proyecto.

## Paso 4: Monitorear y mantener

Una vez que tu proyecto esté desplegado en Vercel, puedes usar las herramientas de Vercel para monitorear el rendimiento y los logs de tu aplicación.

- **Logs**: Revisa los logs de construcción y ejecución en el panel de Vercel para detectar errores o problemas.
- **Dashboard**: Accede a las métricas de tráfico, tiempos de respuesta y otros detalles importantes.
