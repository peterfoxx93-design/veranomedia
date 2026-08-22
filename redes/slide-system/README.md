# Slide System — HTML → Chromium headless

## Uso
1. Editar el `.html` de la slide con el contenido real
2. Ejecutar:
   chromium-browser --headless --disable-gpu --screenshot=RUTA/SALIDA.png --window-size=1080,1350 file://RUTA/INPUT.html

## Variantes de diseño
- **Portada:** badge + número grande + título + subtítulo + CTA
- **Problema 1:** número centrado grande + título + 2 cuerpos
- **Problema 2:** barra lateral color + número vertical + contenido
- **Problema 3:** minimalista — número pequeño "03" + título + cuerpo
- **CTA:** badge superior + título + cuerpo + botón grande

## Colores por vertical
- Dental: rojo (#ff3b30)
- Inmobiliaria: naranja (#ff9f0a)
- Legal: azul (#007aff)
- PYMEs: verde (#34c759)

## Fuente
- DejaVu Sans (instalada en Termux)
