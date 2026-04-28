#!/bin/bash
# =======================================
# AUTOPUSH — Surveillance automatique
# Dès qu'un fichier change → git push
# =======================================

FOLDER="/Users/axeloddon/Downloads/agence-web"

echo "✅ Surveillance active sur $FOLDER"
echo "📡 Chaque modification sera pushée sur GitHub automatiquement."
echo "⏹  Pour arrêter : Ctrl+C"
echo ""

fswatch -o "$FOLDER" \
  --exclude ".git" \
  --exclude "autopush.sh" \
  --latency 3 | while read; do
    echo "🔄 Modification détectée — push en cours..."
    cd "$FOLDER"
    git add .
    git commit -m "auto: mise à jour $(date '+%d/%m/%Y %H:%M')" 2>/dev/null
    git push 2>&1 && echo "✅ Site mis à jour !" || echo "⚠️  Erreur push"
    echo ""
done
