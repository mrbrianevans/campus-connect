create table if not exists challenges
(
    challengeid    serial            not null
        constraint challenges_pkey
            primary key,
    challengetitle varchar(255)      not null,
    challengedesc  varchar(255)      not null,
    points         integer default 0 not null
);

