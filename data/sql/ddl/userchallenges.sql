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

