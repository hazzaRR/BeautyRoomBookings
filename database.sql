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
    AppDate DATE,
    StartTime TIME,
    EndTime TIME,
    ClientID INTEGER,
    TotalPrice NUMERIC(6, 2) DEFAULT 0,
    FOREIGN KEY (ClientID) REFERENCES clients(ID)
);

CREATE TABLE appointmentTreatments (
    ID SERIAL PRIMARY KEY,
    treatmentID INTEGER,
    appointmentID INTEGER,
    FOREIGN KEY (treatmentID) REFERENCES treatment(ID),
    FOREIGN KEY (appointmentID) REFERENCES appointment(ID)
);


CREATE OR REPLACE FUNCTION update_appointment_price_after_insert()
RETURNS TRIGGER AS $$
Declare  
 appointmentPrice NUMERIC(6, 2);
BEGIN
SELECT SUM(treatment.PRICE) into appointmentPrice
FROM treatment INNER JOIN appointmentTreatments ON treatment.ID = appointmentTreatments.treatmentID
INNER JOIN appointment ON appointment.ID = appointmentTreatments.appointmentID
WHERE appointment.ID = new.appointmentID
GROUP BY appointment.ID;

UPDATE appointment SET TotalPrice = appointmentPrice WHERE new.appointmentID = id;

RETURN NULL;
END
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER update_price_after_insert
AFTER INSERT
 ON appointmentTreatments
FOR EACH ROW
EXECUTE PROCEDURE update_appointment_price_after_insert();

CREATE OR REPLACE FUNCTION update_appointment_price_after_delete()
RETURNS TRIGGER AS $$
Declare  
 appointmentPrice NUMERIC(6, 2);
BEGIN
SELECT SUM(treatment.PRICE) into appointmentPrice
FROM treatment INNER JOIN appointmentTreatments ON treatment.ID = appointmentTreatments.treatmentID
INNER JOIN appointment ON appointment.ID = appointmentTreatments.appointmentID
WHERE appointment.ID = old.appointmentID
GROUP BY appointment.ID;

SELECT COALESCE(appointmentPrice,0) into appointmentPrice;

UPDATE appointment SET TotalPrice = appointmentPrice WHERE old.appointmentID = id;

RETURN old;
END
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER update_price_after_delete
AFTER DELETE
 ON appointmentTreatments
FOR EACH ROW
EXECUTE PROCEDURE update_appointment_price_after_delete();
