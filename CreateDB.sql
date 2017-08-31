USE master;
GO

DROP DATABASE IF EXISTS QuoterDevelopment;
CREATE DATABASE QuoterDevelopment;
GO

USE QuoterDevelopment;
GO

CREATE TABLE Categories (
    Id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    Title varchar(max)
);
GO

CREATE TABLE Quotes (
    Id int NOT NULL IDENTITY(1,1) PRIMARY KEY,
    Author varchar(max),
    Body varchar(max),
    CategoryId int,
    CreatedAt DATETIME NOT NULL CONSTRAINT DF_QouteCreatedAt DEFAULT GETDATE(),
    CONSTRAINT FK_Categories_Quotes FOREIGN KEY (CategoryId)
        REFERENCES Categories (Id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
GO

INSERT INTO Categories(Title) VALUES("Юмор"), ("Программирование"), ("Спорт");

DECLARE @quote1 varchar(max) = "- Алиса удивилась, как это она не удивилась, но ведь удивительный день еще только начался и нет ничего удивительного в том, что она еще не начала удивляться."
DECLARE @author1 varchar(max) = "Льюис Кэрролл";

DECLARE @quote2 varchar(max) = "Для меня долгое время было загадкой, как что-то очень дорогое и технологичное может быть столь бесполезным. И вскоре я осознал, что компьютер — это глупая машина, обладающая способностями выполнять невероятно умные вещи, тогда как программисты — это умные люди, у которых талант делать невероятные глупости. Короче, они нашли друг друга.";
DECLARE @author2 varchar(max) = "Билл Брайсон";

DECLARE @quote3 varchar(max) = "Физические упражнения могут заменить множество лекарств, но ни одно лекарство в мире не может заменить физические упражнения.";
DECLARE @author3 varchar(max) = "Анджело Моссо";
INSERT INTO Quotes(Author, Body, CategoryId) VALUES
    (@author1, @quote1, 1), (@author1, @quote1, 1), (@author1, @quote1, 1),
    (@author2, @quote2, 2), (@author2, @quote2, 2), (@author2, @quote2, 2),
    (@author3, @quote3, 3), (@author3, @quote3, 3), (@author3, @quote2, 3),
    ("Лев Ландау", "Английский надо знать! Даже самые тупые англичане знают его неплохо", 1),
    ("Lewis Carroll", "Curiouser and curiouser!", 1);
GO