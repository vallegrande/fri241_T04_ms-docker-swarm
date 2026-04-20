#!/bin/bash
# Configura el nodo primario para permitir replicación
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER replicator WITH REPLICATION ENCRYPTED PASSWORD 'replicator_secret';
EOSQL

# Permite conexión del replicador en pg_hba.conf
echo "host replication replicator all md5" >> "$PGDATA/pg_hba.conf"

# Habilita replicación en postgresql.conf
echo "wal_level = replica" >> "$PGDATA/postgresql.conf"
echo "max_wal_senders = 3" >> "$PGDATA/postgresql.conf"
echo "wal_keep_size = 64" >> "$PGDATA/postgresql.conf"
