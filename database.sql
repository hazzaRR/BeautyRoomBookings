CREATE DATABASE beauty_room;

--\c into beauty_room

CREATE TABLE admins (
    ID SERIAL PRIMARY KEY,
    username VARCHAR(40) UNIQUE,
    AdminPassword VARCHAR(40)
);

CREATE TABLE clients (
    ID SERIAL PRIMARY KEY,
    ClientName VARCHAR(40),
    Email VARCHAR(40) NOT NULL UNIQUE,
    Telephone VARCHAR(20)
);

CREATE TABLE treatment (
    ID SERIAL PRIMARY KEY,
    TreatmentName VARCHAR(40),
    TreatmentType VARCHAR(40),
    PRICE NUMERIC(6, 2)
);

CREATE TABLE bookings (
    BookingDate DATE,
    StartTime TIME,
    EndTime TIME,
    ClientID INTEGER,
    treatmentId INTEGER,
    FOREIGN KEY (ClientID) REFERENCES clients(ID),
    FOREIGN KEY (treatmentId) REFERENCES treatment(ID),
    CONSTRAINT BookingID PRIMARY KEY(BookingDate, StartTime)
);
