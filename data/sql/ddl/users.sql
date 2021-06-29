create table if not exists users
(
    id          serial       not null
        constraint users_pkey
            primary key,
    username    varchar(255) not null
        constraint users_username_key
            unique,
    pass        varchar(255) not null,
    email       varchar(255) not null
        constraint users_email_key
            unique,
    firstname   varchar(255) not null,
    surname     varchar(255) not null,
    roleid      integer default 0,
    noofpoints  integer default 0,
    signup_date date    default CURRENT_DATE
);

