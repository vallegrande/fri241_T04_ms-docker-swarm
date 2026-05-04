CREATE TABLE IF NOT EXISTS student (
    id              SERIAL PRIMARY KEY NOT NULL,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    document_type   VARCHAR(10),
    document_number VARCHAR(20),
    email           VARCHAR(150),
    grade           VARCHAR(20),
    section         VARCHAR(10),
    register_date   DATE,
    status          VARCHAR(1) DEFAULT 'A'
);

