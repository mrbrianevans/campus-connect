FROM postgres:13

ADD tables_ddl.sql init_user.sql docker-entrypoint-initdb.d/

ADD pg_hba.conf postgresql.conf /var/lib/postgresql/data/
