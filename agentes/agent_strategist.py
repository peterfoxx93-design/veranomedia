#!/usr/bin/env python3
"""STRATEGIST — Agente Estratega VM. Convierte señales en decisiones editoriales.

Recibe la señal aprobada del SCOUT y devuelve UNA decisión editorial:
lector, resultado, tensión, tesis, formato, headline.

Salida: ~/veranomedia/agentes/briefs/YYYY-MM-DD.md (brief editorial)
"""
import os, sys
from datetime import datetime

OUT_DIR = os.path.expanduser("~/veranomedia/agentes/briefs")
os.makedirs(OUT_DIR, exist_ok=True)

# Briefs base por vertical (playbook interno VM)
PLAYBOOKS = {
    "clinica": {
        "lector": "Dueño de clínica dental en RD (2+ doctores)",
        "dolores": ["No-shows (citas que nadie confirma)", "Recepcionista saturada", "Leads que se enfrían"],
        "resultado": "Recuperar horas perdidas y llenar la agenda sin más presupuesto",
        "mecanismo": "Automatización de confirmación y seguimiento de citas con IA",
    },
    "inmobiliaria": {
        "lector": "Agente inmobiliario / dueño de agencia en RD (3+ agentes)",
        "dolores": ["Leads que preguntan y nunca vuelven", "Seguimiento manual que nadie hace", "Propiedades que se quedan en vitrina"],
        "resultado": "Convertir más consultas en visitas y ventas",
        "mecanismo": "Seguimiento automatizado con IA + CRM",
    },
}

def main():
    today = datetime.now().strftime("%Y-%m-%d")
    # El brief lo genera el LLM (Neo) con esta plantilla como guía
    print("📋 STRATEGIST — plantilla de brief editorial")
    print(f"Fecha: {today}")
    print()
    print("Instrucciones para el STRATEGIST (Neo):")
    print("1. Lee las señales de scout/ de hoy o selecciona el tema del calendario.")
    print("2. Decide: lector, resultado, tensión central, tesis, formato, headline.")
    print("3. Escribe el brief en briefs/YYYY-MM-DD.md con esta estructura:")
    print()
    print("""---
    # 📋 Brief Editorial
    fecha: {fecha}
    tema: [señal elegida]
    vertical: [clínica | inmobiliaria | pyme]
    
    ## Decisión editorial
    - **Lector:** {lector}
    - **Resultado prometido:** {resultado}
    - **Tensión central:** [el problema que duele]
    - **Tesis (1 línea):** [qué afirmamos]
    - **Formato:** [post | carrusel | hilo | video | artículo]
    - **Headline (hook):** [máximo 8 palabras, dolor + promesa]
    
    ## Evidencia requerida
    - [dato citable con fuente]
    - [caso real o mecanismo]
    - [objeción del lector a anticipar]
    
    ## Reglas VM
    - NUNCA inventar datos ni prospectos (integridad de datos)
    - El hook debe nombrar un dolor real y medible
    - El mecanismo debe ser IA + automatización (nuestra ventaja)
    ---""".format(fecha=today, **PLAYBOOKS["clinica"]))

if __name__ == "__main__":
    main()
