create table if not exists posts
(
    posttitle   varchar(255) not null,
    postcontent text         not null,
    userid      integer      not null
        constraint posts_userid_fkey
            references users,
    groupid     integer      not null
        constraint posts_groupid_fkey
            references groups,
    id          serial       not null
        constraint posts_pkey
            primary key,
    timestamp   timestamp default CURRENT_TIMESTAMP
);

