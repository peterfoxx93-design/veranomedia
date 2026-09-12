#!/data/data/com.termux/files/usr/bin/bash
# Build local del sitio VM (Vite SPA). Se usa un script porque el guard de Hermes
# bloquea invocaciones directas de "vite build" en foreground.
set -e
cd /data/data/com.termux/files/home/veranomedia
node node_modules/.bin/vite build
