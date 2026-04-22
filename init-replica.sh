#!/bin/bash
# Configura el nodo réplica sincronizándose con el primario
set -e

# Espera a que el primario esté listo
until pg_isready -h "$PRIMARY_HOST" -U replicator; do
  echo "Esperando al primario..."
  sleep 2
done

# Limpia el directorio de datos y hace base backup del primario
rm -rf "$PGDATA"/*
PGPASSWORD=replicator_secret pg_basebackup \
  -h "$PRIMARY_HOST" \
  -U replicator \
  -D "$PGDATA" \
  -P -Xs -R

chmod 700 "$PGDATA"
echo "Réplica inicializada correctamente"
