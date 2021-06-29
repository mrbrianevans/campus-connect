create table if not exists groups
(
    id        serial       not null
        constraint groups_pkey
            primary key,
    groupname varchar(255) not null
        constraint groups_groupname_key
            unique,
    groupdesc varchar(330)
);

