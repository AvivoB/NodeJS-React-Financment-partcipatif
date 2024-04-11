-- Active: 1647878334561@@127.0.0.1@3306@cofonds
CREATE DATABASE IF NOT EXISTS Cofonds;

CREATE TABLE UTILISATEUR (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    PSEUDO VARCHAR(255) NOT NULL,
    NOM VARCHAR(255) NOT NULL,
    PRENOM VARCHAR(255) NOT NULL,
    BIRTHDAY DATE,
    EMAIL VARCHAR(255) NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL,
    TEL VARCHAR(255),
    ADRESS VARCHAR(255),
    CP VARCHAR(10),
    VILLE VARCHAR(255),
    NUMADRESSE VARCHAR(10),
    GENRE  VARCHAR(255)
);

CREATE TABLE CAGNOTTE (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    IDUSER INT,
    NOM VARCHAR(255) NOT NULL,
    DESCRIPTION VARCHAR(255),
    OBJECTIF INT NOT NULL,
    ETAT VARCHAR(255) NOT NULL,
    DATEDEBUT DATE,
    DATEFIN DATE,
    IMAGEURL VARCHAR(255),
    FOREIGN KEY (IDUSER) REFERENCES UTILISATEUR(ID)
);

CREATE TABLE COMMENTAIRE (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    IDUSER INT,
    IDCAGNOTTE INT,
    DATE  DATE,
    COMMENTAIRE VARCHAR (255),
    FOREIGN KEY (IDUSER) REFERENCES UTILISATEUR(ID),
    FOREIGN KEY (IDCAGNOTTE) REFERENCES CAGNOTTE(ID)
);

CREATE TABLE PARTICIPATION (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    IDCAGNOTTE INT,
    IDUSER INT,
    DATE_TIMESTAMP INT,
    PAIEMENT_TYPE VARCHAR(50),
    STATUT_PAIEMENT VARCHAR(15)NOT NULL,
    AMOUNT INT NOT NULL,
    FOREIGN KEY (IDCAGNOTTE) REFERENCES CAGNOTTE(ID),
    FOREIGN KEY (IDUSER) REFERENCES UTILISATEUR(ID)
); 

-- Insertion de fausses données pour UTILISATEUR
INSERT INTO UTILISATEUR (PSEUDO, NOM, PRENOM, BIRTHDAY, EMAIL, PASSWORD, TEL, ADRESS, CP, VILLE, NUMADRESSE, GENRE)
VALUES
('user1', 'Doe', 'John', '1990-05-15', 'john.doe@example.com', 'password1', '0123456789', '123 Fake Street', '12345', 'Fakeville', '1', 'M'),
('user2', 'Smith', 'Jane', '1985-08-22', 'jane.smith@example.com', 'password2', '9876543210', '456 Mock Avenue', '54321', 'Mocktown', '2', 'F'),
('user3', 'Johnson', 'Michael', '1978-03-10', 'michael.johnson@example.com', 'password3', '5551234567', '789 Dummy Road', '67890', 'Dummy City', '3', 'M'),
('user4', 'Brown', 'Emily', '1995-11-27', 'emily.brown@example.com', 'password4', '4449876543', '321 Test Boulevard', '45678', 'Testville', '4', 'F'),
('user5', 'Davis', 'William', '1982-07-08', 'william.davis@example.com', 'password5', '3338765432', '654 Trial Lane', '34567', 'Trial City', '5', 'M'),
('user6', 'Wilson', 'Olivia', '1998-02-14', 'olivia.wilson@example.com', 'password6', '2227654321', '987 Experiment Street', '23456', 'Experimentville', '6', 'F'),
('user7', 'Taylor', 'Daniel', '1970-09-03', 'daniel.taylor@example.com', 'password7', '1116543210', '1472 Pilot Avenue', '12345', 'Pilotstown', '7', 'M'),
('user8', 'Anderson', 'Sophia', '1989-04-19', 'sophia.anderson@example.com', 'password8', '9995432167', '369 Sample Road', '87654', 'Sample City', '8', 'F'),
('user9', 'Thomas', 'Matthew', '1976-01-25', 'matthew.thomas@example.com', 'password9', '8884321654', '852 Example Boulevard', '98765', 'Exampletown', '9', 'M'),
('user10', 'Jackson', 'Emma', '1993-06-30', 'emma.jackson@example.com', 'password10', '7773216548', '753 Pilot Lane', '56789', 'Pilot City', '10', 'F'),
('user11', 'White', 'Christopher', '1980-12-05', 'christopher.white@example.com', 'password11', '6662165437', '1599 Template Street', '43210', 'Templatetown', '11', 'M'),
('user12', 'Harris', 'Ava', '1991-10-18', 'ava.harris@example.com', 'password12', '5554321679', '456 Prototype Avenue', '87654', 'Prototypetown', '12', 'F'),
('user13', 'Martin', 'David', '1974-02-23', 'david.martin@example.com', 'password13', '4445432165', '852 Beta Road', '23456', 'Betaville', '13', 'M'),
('user14', 'Thompson', 'Isabella', '1987-07-12', 'isabella.thompson@example.com', 'password14', '3333216547', '753 Gamma Lane', '76543', 'Gammacity', '14', 'F'),
('user15', 'Garcia', 'James', '1984-09-28', 'james.garcia@example.com', 'password15', '2226543218', '1599 Delta Street', '12345', 'Deltatown', '15', 'M'),
('user16', 'Martinez', 'Mia', '1996-04-03', 'mia.martinez@example.com', 'password16', '1115432169', '456 Epsilon Avenue', '98765', 'Epsilontown', '16', 'F'),
('user17', 'Robinson', 'Joseph', '1979-11-09', 'joseph.robinson@example.com', 'password17', '9994321670', '852 Zeta Road', '34567', 'Zetaville', '17', 'M'),
('user18', 'Clark', 'Charlotte', '1988-01-14', 'charlotte.clark@example.com', 'password18', '8883216541', '753 Eta Lane', '87654', 'Etacity', '18', 'F'),
('user19', 'Rodriguez', 'Alexander', '1975-08-20', 'alexander.rodriguez@example.com', 'password19', '7774321652', '1599 Theta Street', '23456', 'Thetatown', '19', 'M'),
('user20', 'Lewis', 'Ella', '1992-03-07', 'ella.lewis@example.com', 'password20', '6665432184', '456 Iota Avenue', '76543', 'Iotacity', '20', 'F');
-- Insertion de fausses données pour CAGNOTTE
INSERT INTO CAGNOTTE (IDUSER, NOM, DESCRIPTION, OBJECTIF, ETAT, DATEDEBUT, DATEFIN, IMAGEURL)
VALUES
(1, 'Cagnotte pour un anniversaire', 'Collecte de fonds pour l''anniversaire de John', 500, 'En cours', '2024-04-01', '2024-05-01', 'https://via.placeholder.com/500'),
(2, 'Voyage en famille', 'Financer des vacances en famille', 1000, 'En cours', '2024-06-01', '2024-08-01', 'https://via.placeholder.com/500'),
(3, 'Aide aux études', 'Récolter de l''argent pour les frais de scolarité', 2000, 'Terminée', '2024-03-01', '2024-06-01', 'https://via.placeholder.com/500'),
(4, 'Projet associatif', 'Financer un projet caritatif', 1500, 'En cours', '2024-05-01', '2024-07-01', 'https://via.placeholder.com/500'),
(5, 'Achat de matériel sportif', 'Acquérir du matériel pour une équipe sportive', 800, 'Terminée', '2024-02-01', '2024-04-01', 'https://via.placeholder.com/500'),
(6, 'Cagnotte pour un mariage', 'Contribuer aux dépenses du mariage', 3000, 'En cours', '2024-07-01', '2024-09-01', 'https://via.placeholder.com/500'),
(7, 'Projet communautaire', 'Financer un projet pour la communauté locale', 1200, 'Terminée', '2024-01-01', '2024-04-01', 'https://via.placeholder.com/500'),
(8, 'Aide aux personnes âgées', 'Collecte de fonds pour les personnes âgées isolées', 1800, 'En cours', '2024-03-01', '2024-05-01', 'https://via.placeholder.com/500'),
(9, 'Sauvetage animalier', 'Aider les animaux abandonnés', 900, 'En cours', '2024-06-01', '2024-08-01', 'https://via.placeholder.com/500'),
(10, 'Projet écologique', 'Financer des actions pour l''environnement', 2500, 'Terminée', '2024-04-01', '2024-07-01', 'https://via.placeholder.com/500'),
(11, 'Cagnotte pour un anniversaire', 'Collecte de fonds pour l''anniversaire de Jane', 500, 'En cours', '2024-04-01', '2024-05-01', 'https://via.placeholder.com/500'),

-- Insertion de fausses données pour COMMENTAIRE
INSERT INTO COMMENTAIRE (IDUSER, IDCAGNOTTE, DATE, COMMENTAIRE)
VALUES
(1, 1, '2024-04-05', 'Bonne initiative!'),
(2, 1, '2024-04-06', 'J''ai participé!'),
(3, 2, '2024-06-10', 'Super projet!'),
(4, 3, '2024-03-15', 'Bonne chance pour les études!'),
(5, 4, '2024-05-20', 'Je soutiens ce projet.'),
(6, 5, '2024-02-10', 'J''espère que vous atteindrez votre objectif.'),
(7, 6, '2024-07-02', 'Félicitations pour votre mariage!'),
(8, 7, '2024-01-25', 'J''ai hâte de voir les résultats.'),
(9, 8, '2024-03-05', 'Bravo pour cette initiative.'),
(10, 9, '2024-06-15', 'Les animaux méritent notre aide.'),
(11, 10, '2024-04-20', 'L''environnement compte!');

-- Insertion de fausses données pour PARTICIPATION
INSERT INTO PARTICIPATION (IDCAGNOTTE, IDUSER, DATE_TIMESTAMP, PAIEMENT_TYPE, STATUT_PAIEMENT, AMOUNT)
VALUES
(1, 2, UNIX_TIMESTAMP(), 'Carte de crédit', 'Payé', 50),
(1, 3, UNIX_TIMESTAMP(), 'PayPal', 'Payé', 30),
(1, 5, UNIX_TIMESTAMP(), 'Virement bancaire', 'Payé', 20),
(2, 1, UNIX_TIMESTAMP(), 'Carte de crédit', 'Payé', 100),
(2, 4, UNIX_TIMESTAMP(), 'PayPal', 'Payé', 200),
(3, 7, UNIX_TIMESTAMP(), 'Virement bancaire', 'Payé', 150),
(4, 9, UNIX_TIMESTAMP(), 'Carte de crédit', 'Payé', 80),
(4, 8, UNIX_TIMESTAMP(), 'PayPal', 'Payé', 120),
(5, 10, UNIX_TIMESTAMP(), 'Carte de crédit', 'Payé', 70),
(6, 6, UNIX_TIMESTAMP(), 'PayPal', 'Payé', 300),
(7, 3, UNIX_TIMESTAMP(), 'Virement bancaire', 'Payé', 90),
(8, 5, UNIX_TIMESTAMP(), 'Carte de crédit', 'Payé', 110),
(9, 7, UNIX_TIMESTAMP(), 'PayPal', 'Payé', 180),
(10, 1, UNIX_TIMESTAMP(), 'Virement bancaire', 'Payé', 250),
(11, 2, UNIX_TIMESTAMP(), 'Carte de crédit', 'Payé', 50),
(1, 4, UNIX_TIMESTAMP(), 'PayPal', 'Payé', 50),
(2, 6, UNIX_TIMESTAMP(), 'Virement bancaire', 'Payé', 100),
(3, 8, UNIX_TIMESTAMP(), 'Carte de crédit', 'Payé', 150),
(4, 10, UNIX_TIMESTAMP(), 'PayPal', 'Payé', 80),
(5, 9, UNIX_TIMESTAMP(), 'Virement bancaire', 'Payé', 120),
(6, 7, UNIX_TIMESTAMP(), 'Carte de crédit', 'Payé', 70),
(7, 5, UNIX_TIMESTAMP(), 'PayPal', 'Payé', 300),
(8, 3, UNIX_TIMESTAMP(), 'Virement bancaire', 'Payé', 90),
(9, 1, UNIX_TIMESTAMP(), 'Carte de crédit', 'Payé', 110),
(10, 2, UNIX_TIMESTAMP(), 'PayPal', 'Payé', 180),
(11, 4, UNIX_TIMESTAMP(), 'Virement bancaire', 'Payé', 250);
