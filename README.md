# Nobukaza Media — sitio web

Versión estática (HTML, CSS y JS puro, sin frameworks) de la página de planes de Nobukaza Media. Lista para publicarse en GitHub Pages o cualquier hosting estático.

## Estructura

```
index.html      Página completa
style.css       Todos los estilos
script.js       Interactividad: videos, WhatsApp, cursor, escritura animada, sonido
media/          Videos (hero + 3 clips de edición)
```

## Publicar en GitHub Pages

1. Crea un repositorio nuevo (vacío) en GitHub.
2. Sube estos archivos:
   ```bash
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git branch -M main
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Source → Deploy from a branch → main / (root)**.
4. En un par de minutos el sitio queda publicado en `https://TU-USUARIO.github.io/TU-REPO/`.

## Notas

- El número de WhatsApp (+51 981111518) y el usuario de Instagram (@nobukaza.tech) están definidos como constantes al inicio de `script.js`.
- Los videos pesan en total ~40 MB. GitHub acepta archivos individuales hasta 100 MB, así que no hay problema, pero ten en cuenta que el repositorio no será pequeño.
- El cursor personalizado y el ícono de reinicio de video usan SVG embebido, no requieren archivos aparte.
