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
create table if not exists challenges
(
    challengeid    serial            not null
        constraint challenges_pkey
            primary key,
    challengetitle varchar(255)      not null,
    challengedesc  varchar(255)      not null,
    points         integer default 0 not null
);
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

create table if not exists post_views
(
    view_id   serial not null
        constraint post_views_pk
            primary key,
    timestamp timestamp default CURRENT_TIMESTAMP,
    post_id   integer
        constraint post_views_posts_id_fk
            references posts
            on update cascade on delete set null,
    username  varchar(255)
        constraint username_fk
            references users (username)
            on update cascade on delete set null
);

create table if not exists reported_posts
(
    report_id serial not null
        constraint reported_posts_pk
            primary key,
    timestamp timestamp default CURRENT_TIMESTAMP,
    post_id   integer
        constraint post_views_posts_id_fk
            references posts
            on update cascade on delete set null,
    username  varchar(255)
        constraint username_fk
            references users (username)
);

create table if not exists roles
(
    roleid   integer not null
        constraint roles_pkey
            primary key,
    rolename varchar(255)
);

create table if not exists userchallenges
(
    userid      integer not null
        constraint userchallenges_userid_fkey
            references users,
    challengeid integer not null
        constraint userchallenges_challengeid_fkey
            references challenges,
    iscompleted boolean default false,
    constraint userchallenges_pkey
        primary key (userid, challengeid)
);


create table if not exists groupmembership
(
    userid  integer not null
        constraint fk_users_membership_cascade
            references users
            on delete cascade,
    groupid integer not null
        constraint fk_groups_membership_cascade
            references groups
            on delete cascade,
    constraint groupmembership_pkey
        primary key (userid, groupid)
);
