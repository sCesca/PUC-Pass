CREATE SEQUENCE ID_RECARGA_S MINVALUE 1 START WITH 1 INCREMENT BY 1;

CREATE TABLE BILHETES (
    NUMERO_BILHETE INTEGER NOT NULL PRIMARY KEY,
    DATA_CRIACAO VARCHAR(100) NOT NULL
);

CREATE TABLE RECARGAS (
    ID_RECARGAS NUMBER NOT NULL PRIMARY KEY,
    NUMERO_BILHETE INTEGER NOT NULL,
    TIPO VARCHAR(50) NOT NULL,
    DATA_RECARGA VARCHAR2 (100) NOT NULL,
    CONSTRAINT FK_RECARGAS_BILHETES FOREIGN KEY (NUMERO_BILHETE) REFERENCES BILHETES(NUMERO_BILHETE)
);

CREATE TABLE RELATORIOS (
    ID_UTILIZACAO NUMBER NOT NULL PRIMARY KEY,
);

CREATE TABLE UTILIZACOES (
    DATA_UTILIZACAO VARCHAR2(50) NOT NULL
);

/*para fazer inner join no relatorio*/
SELECT
    *
FROM
    BILHETES
    INNER JOIN RECARGAS,
    UTILIZACOES