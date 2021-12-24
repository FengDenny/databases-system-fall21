-- Script name: inserts.sql
   -- Author:   Denny Feng
   -- Purpose:  insert sample data to test the integrity of this database system

-- the database used to insert the data into.
USE BloodDonationSystemDB;

-- Address table inserts
INSERT INTO `blooddonationsystemdb`.`address`
(`address_id`, `street`, `zip_code`, `state`,`city`)
VALUES
("BR_55121", "45 Holly St", "94154", "CA", "SF"), 
("BR_55122", "46 Mission Organic St", "94112", "CA", "SF"), 
("BR_55123", "460 Excelsior  St", "94112", "CA", "SF"),
("DR_10001", "462 Excelsior  St", "94112", "CA", "SF"),
("DR_10002", "463 Excelsior  St", "94112", "CA", "SF"),
("DR_10003", "464 Excelsior  St", "94112", "CA", "SF"),
("H_92221", "46 Holly St", "94112", "CA", "SF"),
("H_92222", "47 Holly St", "94112", "CA", "SF"),
("H_92223", "48 Holly St", "94112", "CA", "SF"),
("M_13587", "45 Holly St", "94112", "CA", "SF"),
("M_13588", "46 Mission Organic St", "94112", "CA", "SF"),
("M_13589", "45 Holly St", "94112", "CA", "SF");

 -- Blood Bank table inserts
INSERT INTO `blooddonationsystemdb`.`bloodbank`
(`blood_bank_id`, `monitoring_process`, `manager`, `address`, `donor_record`, `donor`, `hospital`,  `name`, `total_donations`)
VALUES
(15878, 12585, 13587,"Blood_Bank_15878", "10001", "11001", "90005", "Blood Bank World", 0), 
(15879, 12586, 13588,"Blood_Bank_15879", "10002", "11002", "90003", "Red Donator", 0),
(15880, 12587, 13589,"Blood_Bank_15880", "10003", "11003", "90002", "Good O Blood ", 0);

-- Blood type table insert
-- o
INSERT INTO `blooddonationsystemdb`.`bloodtype`
(`blood_type_id`,`o_type_blood_type`) 
VALUES
(20510, 1);
-- a
INSERT INTO `blooddonationsystemdb`.`bloodtype`
(`blood_type_id`,`a_type_blood_type`) 
VALUES
(20511, 1);
-- b
INSERT INTO `blooddonationsystemdb`.`bloodtype`
(`blood_type_id`,`b_type_blood_type`) 
VALUES
(20512, 1);
-- a_b
INSERT INTO `blooddonationsystemdb`.`bloodtype`
(`blood_type_id`,`a_b_type_blood_type`) 
VALUES
(20513, 1);

-- Blood Result table insert
-- negative results
INSERT INTO `blooddonationsystemdb`.`bloodresult`
(`blood_result_id`, `negative_result`, `transfusion_doctor`, `laboratory`)
VALUES
(21221, 31001, 72144,16652), 
(21223, 31002, 72146,16654),
(21224, 31004, 72146,16654);
-- positive results
INSERT INTO `blooddonationsystemdb`.`bloodresult`
(`blood_result_id`, `positive_result`, `transfusion_doctor`, `laboratory`)
VALUES
(21222, 30101, 72145,16653), 
(21226, 30102, 72145,16653),
(21227, 30103, 72145,16653);

-- Blood Recipient table insert
INSERT INTO `blooddonationsystemdb`.`bloodrecipient`
(`blood_recipient_id`, `blood_recipient_record`, `blood_transfusion`, `transfusion_doctor`)
VALUES
(81215, 55121, 66125, 72141), (81216, 55122, 66126, 72142), (81217, 55123, 66127, 72143);

-- Blood Recipient Record table insert
INSERT INTO `blooddonationsystemdb`.`bloodrecipientrecord`
(`blood_recipient_record_id`, `address`, `blood_type`, `blood_recipient`, `full_name`, `blood_result`)
VALUES
(55121, "BR_55121", "20510", 81215, "Denise Ju", 21221), (55122, "BR_55122", "20511", 81216, "Ray Hernandez", 21222), (55123, "BR_55123", "20512", 81217, "Sumo Henny", 21223);


-- Blood transfusion table insert 
INSERT INTO `blooddonationsystemdb`.`bloodtransfusion`
(`blood_transfusion_id`,
`transfusion_doctor`,
`hospital`,
`blood_recipient`)
VALUES
(66125, 72144, 92221, 81215), 
(66126, 72145, 92222, 81216), 
(66127, 72146, 92223, 81217);

-- Donor table insert
INSERT INTO `blooddonationsystemdb`.`donor`
(`donor_id`, `blood_bank`, `notification_blood_bank`, `blood_result`, `donor_record`)
VALUES
(11001, 15878, 15878, 21221,10001),
(11002, 15879, 15879, 21222,10002),
(11003, 15878, 15878, 21223,10003);

-- Disease Verification table insert
INSERT INTO `blooddonationsystemdb`.`diseaseverification`
(`disease_verification_id`, `laboratory`, `donor_record`,`disease_description`, `disease_result`)
VALUES
(32221, 16652, 10001, "HIV", 1), 
(32222, 16653, 10002, "Hepatitis b", 1),  
(32223, 16654, 10003, "Hepatitis A", 1);

-- Donor Record table insert
INSERT INTO `blooddonationsystemdb`.`donorrecord`
(`donor_record_id`, `donor`, `blood_type`, `blood_bank`, `address`,`disease_verification`, `full_name`,`blood_result`)
VALUES
(10001, 11001, 20510, 15878, "DR_10001", 32221, "Henny Ting", 21221), 
(10002, 11002, 20510, 15878, "DR_10002", 32222, "Shane Ong", 21222), 
(10003, 11003, 20512, 15878, "DR_10003", 32223, "Nelson Mendela", 21223);


-- Hospital table insert
INSERT INTO `blooddonationsystemdb`.`hospital`
(`hospital_id`, `address`, `laboratory`, `donor_record`, `transfusion_doctor`, `blood_recipient_record`, `name`)
VALUES
(92221,"H_92221", 16653,10001, 72144, 55121, "California Will"), 
(92222,"H_92222", 16654,10002, 72145, 55122, "CPMC"),  
(92223,"H_92221", 16653,10003, 72146, 55123, "AMMC");

-- Laboratory table insert
INSERT INTO `blooddonationsystemdb`.`laboratory`
(`laboratory_id`, `donor_record`, `blood_bank_notification`, `address`, `hospital`, `disease_verification`, `notification_sent`, `notification_received`, `name`)
VALUES
(16653, 10001, 50001,"H_92221", 92221, 32221, 50001, 50001,"CaliLab"), 
(16654, 10002, 50002,"H_92222", 92222, 32221, 50002, 50002,"LabOfCPMC"), 
(16652, 10003, 50003,"H_92223", 92223, 32221, 50003, 50003,"LabWork");

-- Monitoring Process table inserts
INSERT INTO `blooddonationsystemdb`.`monitoringprocess`
(`monitoring_process_id`, `description`)
VALUES 
(12585, "Use relational DB to CRUD records. "), 
(12586, "Use NoSQL with MySQL to CRUD record"), 
(12587, "Use MySQL to read, NOSQL to CRUD");

INSERT INTO `blooddonationsystemdb`.`notifications`
(`notification_id`,`notifications_blood_bank_id`, `notifications_hospital_id`, `notifications_donor_id`, `notifications_laboratory_id`,
`disease_verification_description`,`sent_description`,`received_description`)
VALUES
(50001, 15878, 92221, 11001, 16653, "HIV","disease results", ""), 
(50002, 15879, 92222, 11002, 16654, "none","", ""),
(50003, 15879, 92223, 11002, 16652, "none","", "");


-- Manager table insert
INSERT INTO `blooddonationsystemdb`.`manager`
(`manager_id`, `blood_bank`, `monitoring_process`, `address`, `donor_record`, `full_name`, `total_notifications_received`,
`laboratory_notifications`, `notifications_received`,`notifications_sent`)
VALUES
(13587, 15878, 12585, "M_13587",10001, "Mike Lawrence", 0, 50001, 50001,50001),
(13588, 15879, 12586, "M_13588",10002, "Thao Li", 1, 50002, 50002,50002),
(13589, 15880, 12587, "M_13589",10003, "Allan Kao", 1, 50003, 50003,50003);

-- Negative Result table insert
INSERT INTO `blooddonationsystemdb`.`negativeresult`
(`negative_result_id`, `negative_result`, `blood_result`)
VALUES
(31001, 1, 21221), 
(31002, 1, 21222), 
(31004, 1, 21224);

-- Positive  Result table insert
INSERT INTO `blooddonationsystemdb`.`positiveresult`
(`positive_result_id`,`positive_result`, `blood_result`)
VALUES
(30101, 1, 21222), 
(30102, 1, 21226), 
(30103, 1, 21227);

-- Transfusion Doctor table insert
INSERT INTO `blooddonationsystemdb`.`transfusiondoctor`
(`transfusion_doctor_id`, `hospital`, `blood_recipient_record`, `donor_record`, `blood_transfusion`, `blood_result`, `full_name`)
VALUES
(72144, 92221, 55121, 10001, 66125, 21221,"Tim Burk"), 
(72145, 92222, 55122, 10002, 66126, 21222,"Denise Tow"), 
(72146, 92223, 55123, 10003, 66127, 21223,"Collin Hardwell");




