create table if not exists users
(
    id       serial
    primary key,
    name     varchar(20)           not null,
    email    varchar(100)          not null
    unique,
    password varchar(120)          not null,
    admin    boolean default false not null,
    active   boolean default true  not null
    );
