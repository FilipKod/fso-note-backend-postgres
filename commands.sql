CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text not null,
  title text not null,
  likes integer default 0
);

insert into blogs (author, url, title, likes) values ('Filip Madunicky', 'ako-odist-z-inalfy', 'Ako odist z inalfy', 69);
insert into blogs (url, title) values ('ako-zbohatnut', 'Ako zbohatnut');

SELECT * FROM blogs;