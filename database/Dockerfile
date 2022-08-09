FROM postgres:13

ADD tables_ddl.sql init_user.sql docker-entrypoint-initdb.d/

# this causes an issue where the data directory is not empty so the db can't be initialised.
# If custom config is required, then these files should be put in /etc and the postgres command -c /etc/postgresql.conf
#ADD pg_hba.conf postgresql.conf /var/lib/postgresql/data/
