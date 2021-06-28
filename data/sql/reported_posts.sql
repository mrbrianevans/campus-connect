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

