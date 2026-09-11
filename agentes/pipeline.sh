#!/usr/bin/env bash
# ORCHESTRATOR — Equipo de Agentes VM sincronizado
# Pipeline: SCOUT → STRATEGIST → WRITER → AUDIT → DISPATCH
#
# Uso:
#   ./pipeline.sh scout        # Solo buscar señales
#   ./pipeline.sh audit        # Auditar el post de hoy (pre-publicación)
#   ./pipeline.sh dispatch     # Publicar en todas las plataformas (los scripts diarios)
#   ./pipeline.sh team         # Demo: mostrar los roles del equipo
#   ./pipeline.sh full         # Pipeline completo (con LLM para strategist/writer)

set -e
AGENT_DIR=~/veranomedia/agentes
TODAY=$(date +%Y-%m-%d)

echo "╔══════════════════════════════════════════════╗"
echo "║   🤖 EQUIPO DE AGENTES VERANO MEDIA          ║"
echo "╚══════════════════════════════════════════════╝"

case "${1:-team}" in
  scout)
    echo "🕵️  [SCOUT] Buscando señales de mercado..."
    python3 "$AGENT_DIR/agent_scout.py"
    echo ""
    echo "📄 Señales guardadas en: $AGENT_DIR/scout/$TODAY.md"
    echo "   → Pásame las señales y defino el brief (STRATEGIST)."
    ;;

  audit)
    PLAT="${2:-x}"
    echo "🔎 [AUDIT] Revisando el post de hoy para $PLAT..."
    python3 "$AGENT_DIR/agent_audit.py" --plataforma "$PLAT"
    echo ""
    if [ $? -eq 0 ]; then
      echo "✅ Post aprobado — listo para publicar."
    else
      echo "❌ Post rechazado — me lo mandas de vuelta y lo mejoro."
    fi
    ;;

  dispatch)
    echo "📤 [DISPATCH] Publicando en todas las plataformas..."
    echo "   → X:      cron diario 9AM (ya activo)"
    echo "   → Threads: cron diario 8:30AM (ya activo)"
    echo "   → LinkedIn: cron diario 9AM (ya activo)"
    echo "   → BlueSky: cron diario 8AM (ya activo)"
    echo "   → FB/IG:   entrega manual (visual generado)"
    echo ""
    echo "   Los crons publican solos. Aquí verifico el estado:"
    python3 -c "
import json, os
cal = os.path.expanduser('~/.hermes/scripts/vm_x_posts_premium.json')
with open(cal) as f:
    posts = json.load(f)
import datetime
today = datetime.date.today().strftime('%Y-%m-%d')
post = next((p for p in posts if p.get('date') == today), None)
if post:
    print(f'   📅 Post de hoy ({today}): {post.get(\"title\",\"\")[:50]}')
    print(f'      X:{\"✅\" if post.get(\"published_x\") else \"⏳\"}  TH:{\"✅\" if post.get(\"published_threads\") else \"⏳\"}  LI:{\"✅\" if post.get(\"published_linkedin\") else \"⏳\"}  BS:{\"✅\" if post.get(\"published_bluesky\") else \"⏳\"}  FB:{\"✅\" if post.get(\"posted_fb_ig\") else \"⏳\"}')
else:
    print(f'   ⚠️ No hay post para hoy ({today}) en el calendario')
"
    ;;

  team)
    echo ""
    echo "   🕵️  SCOUT       → encuentra señales y oportunidades"
    echo "   📋 STRATEGIST   → decide ángulo, formato, headline"
    echo "   ✍️  WRITER       → redacta el contenido (skills de escritura VM)"
    echo "   🎨 DESIGNER     → visuales en Canva (vm-visual-creator)"
    echo "   🔎 AUDIT        → revisa calidad ANTES de publicar (rechaza si falla)"
    echo "   📤 DISPATCH     → publica en X, Threads, LinkedIn, BlueSky, FB/IG"
    echo ""
    echo "   ⚡ Sincronización:"
    echo "   - Calendario unificado: ~/.hermes/scripts/vm_x_posts_premium.json"
    echo "   - Señales:             $AGENT_DIR/scout/"
    echo "   - Briefs:              $AGENT_DIR/briefs/"
    echo "   - Post de hoy:         leído por todos los publicadores"
    echo ""
    echo "   🔄 Loop de mejora: publicación → rendimiento → playbooks actualizados"
    ;;

  full)
    echo "🕵️  [1/4] SCOUT..."
    python3 "$AGENT_DIR/agent_scout.py"
    echo ""
    echo "📋 [2/4] STRATEGIST — generando brief (requiere tu input o el mío):"
    python3 "$AGENT_DIR/agent_strategist.py"
    echo ""
    echo "✍️  [3/4] WRITER — redacta con skills de escritura VM"
    echo "🔎 [4/4] AUDIT — reviso calidad antes de publicar"
    ;;

  *)
    echo "Uso: $0 {scout|audit|dispatch|team|full}"
    ;;
esac
