create database burgers_db;

use burgers_db;

create table burgers(

id integer auto_increment,
burger_name varchar(64) not null,
devoured boolean not null,
date_stamp timestamp not null,
primary key(id)

)