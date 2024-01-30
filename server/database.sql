-- // in the shell it is very important to create any database or table with (;) semicolon  in the end

CREATE DATABASE perntodo;      

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);