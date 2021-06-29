create table if not exists roles
(
    roleid   integer not null
        constraint roles_pkey
            primary key,
    rolename varchar(255)
);

