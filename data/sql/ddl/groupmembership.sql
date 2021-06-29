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

