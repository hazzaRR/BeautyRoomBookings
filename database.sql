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

-- CREATE TABLE bookings (
--     BookingDate DATE,
--     StartTime TIME,
--     EndTime TIME,
--     ClientID INTEGER,
--     treatmentId INTEGER,
--     FOREIGN KEY (ClientID) REFERENCES clients(ID),
--     FOREIGN KEY (treatmentId) REFERENCES treatment(ID),
--     CONSTRAINT BookingID PRIMARY KEY(BookingDate, StartTime)
-- );

CREATE TABLE appointment (
    ID SERIAL PRIMARY KEY,
    BookingDate DATE,
    StartTime TIME,
    EndTime TIME,
    ClientID INTEGER,
    TotalPrice NUMERIC(6, 2),
    FOREIGN KEY (ClientID) REFERENCES clients(ID)
);

CREATE TABLE appointmentTreatments (
    ID SERIAL PRIMARY KEY,
    treatmentID INTEGER,
    appointmentID INTEGER,
    FOREIGN KEY (treatmentID) REFERENCES treatment(ID),
    FOREIGN KEY (appointmentID) REFERENCES appointment(ID)
);


-- CREATE OR REPLACE FUNCTION update_appointment_price()
-- RETURNS TRIGGER AS $$
-- Declare  
--  TotalPrice NUMERIC(6, 2);  
-- BEGIN
-- SELECT SUM(PRICE) FROM treatment
-- WHERE TicketID = new.TicketID;
-- RETURN NEW;
-- END
-- $$ LANGUAGE PLPGSQL;

-- CREATE TRIGGER print_ticket
-- AFTER INSERT ON TicketUpdate
-- FOR EACH ROW
-- EXECUTE PROCEDURE ticket_confirmation();