#!/usr/bin/env bash
set -euo pipefail

# Uso:
#   ./scripts/merge-deploy.sh [-y] [target_branch] [remote] [source_branch]
# Ejemplo:
#   ./scripts/merge-deploy.sh -y vps-portfolio-deploy origin main

YES=0
while getopts 'y' flag; do
  case "$flag" in
    y) YES=1 ;;
    *) ;;
  esac
done
shift $((OPTIND - 1))

TARGET_BRANCH="${1:-vps-portfolio-deploy}"
REMOTE="${2:-origin}"
SOURCE_BRANCH="${3:-main}"

# Rutas a excluir del merge (restaurar desde HEAD)
EXCLUDES=(
  "portfolio-api/src/server"
  "portfolio-web/src/api"
)

# ───────────────── helpers ─────────────────
current_branch() { git rev-parse --abbrev-ref HEAD; }

require_clean() {
  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "❌ El árbol de trabajo no está limpio. Haz commit/stash antes." >&2
    exit 1
  fi
}

ensure_remote_branch() {
  if ! git ls-remote --exit-code "$REMOTE" "refs/heads/$SOURCE_BRANCH" >/dev/null; then
    echo "❌ No existe $REMOTE/$SOURCE_BRANCH" >&2
    exit 1
  fi
}

abort_merge_if_any() {
  git merge --abort >/dev/null 2>&1 || true
}

# ───────────────── main ─────────────────
ensure_remote_branch
git fetch "$REMOTE" --prune

INITIAL_BRANCH="$(current_branch)"
trap 'echo "⚠️  Error: abortando merge y volviendo a $INITIAL_BRANCH"; abort_merge_if_any; git switch - >/dev/null 2>&1 || git switch "$INITIAL_BRANCH" >/dev/null 2>&1 || true' ERR

git switch "$TARGET_BRANCH"
require_clean

echo "🔄 Merge sin commit de $REMOTE/$SOURCE_BRANCH → $TARGET_BRANCH"
git merge --no-commit --no-ff "$REMOTE/$SOURCE_BRANCH"

echo "↩️  Restaurando rutas excluidas desde HEAD (staged + worktree):"
printf '   - %s\n' "${EXCLUDES[@]}"
git restore --source=HEAD --staged --worktree "${EXCLUDES[@]}"

echo
git status

MSG="Merge $SOURCE_BRANCH into $TARGET_BRANCH, excluding backend server and frontend api"

if [[ "$YES" -eq 1 ]]; then
  git commit -m "$MSG"
  git push "$REMOTE" HEAD
  echo "✅ Merge commit + push hechos."
else
  read -r -p "¿Hacer commit y push ahora? [y/N] " REPLY
  if [[ "$REPLY" =~ ^[Yy]$ ]]; then
    git commit -m "$MSG"
    git push "$REMOTE" HEAD
    echo "✅ Merge commit + push hechos."
  else
    echo "ℹ️  Puedes revisar y luego:"
    echo "    git commit -m \"$MSG\" && git push $REMOTE HEAD"
  fi
fi

