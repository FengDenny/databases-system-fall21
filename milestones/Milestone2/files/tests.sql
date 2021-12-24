-- Script name: tests.sql
-- Author:      Denny Feng
-- Purpose:     test the integrity of this database system
       
-- the database used to insert the data into.
USE BloodDonationSystemDB;

-- Truncate Statements
-- I used SET FOREIGN_KEY_CHECKS = 0 because there will be error when truncating tables with FK
SET FOREIGN_KEY_CHECKS = 0; 
TRUNCATE TABLE manager;
TRUNCATE TABLE  donorrecord; 
TRUNCATE TABLE  donor; 
TRUNCATE TABLE  BloodBank; 
TRUNCATE TABLE  monitoringprocess; 
TRUNCATE TABLE  address; 
TRUNCATE TABLE  bloodrecipient; 
TRUNCATE TABLE  bloodrecipientrecord; 
TRUNCATE TABLE bloodtype; 
TRUNCATE TABLE bloodresult; 
TRUNCATE TABLE bloodtransfusion; 
TRUNCATE TABLE diseaseverification; 
TRUNCATE TABLE hospital;
TRUNCATE TABLE notifications;
TRUNCATE TABLE laboratory;
TRUNCATE TABLE transfusiondoctor;
TRUNCATE TABLE negativeresult;
TRUNCATE TABLE positiveresult;

-- disble safe mode.
SET SQL_SAFE_UPDATES = 0;

-- Address table testing
DELETE FROM Address WHERE address_id = 'Blood_Bank_15878';
UPDATE Address SET street= '42 Mission Organic St' WHERE address_id = 'Blood_Bank_15879';

-- Blood Bank table testing
DELETE FROM BloodBank WHERE blood_bank_id = 15878;
UPDATE BloodBank SET manager= 13590 WHERE blood_bank_id = 15879;

-- Monitoring Process table testing
DELETE FROM monitoringprocess  WHERE monitoring_process_id = 12585;
UPDATE monitoringprocess SET description = "Use MySQL with noSQL to CRUD record" WHERE monitoring_process_id = 12586;

-- Blood Recipient table testing
DELETE FROM bloodrecipient  WHERE blood_recipient_id = 81215;
UPDATE bloodrecipient SET transfusion_doctor = 72140  WHERE blood_recipient_id = 81216;

-- Blood Recipient Record table testing
DELETE FROM bloodrecipientrecord  WHERE blood_recipient = 81216;
-- Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails (`blooddonationsystemdb`.`bloodrecipientrecord`, CONSTRAINT `BLOOD_RECIPIENT_RECORD_BLOOD_TYPE_FK` FOREIGN KEY (`blood_type`) REFERENCES `bloodtype` (`blood_type_id`) ON DELETE CASCADE ON UPDAT)
-- UPDATE bloodrecipientrecord SET blood_type = 20514  WHERE blood_recipient_record_id = 55123;

-- Blood Type table testing
DELETE FROM bloodtype  WHERE blood_type_id = 20510;
UPDATE bloodtype SET blood_type_id  = 20514  WHERE blood_type_id = 20511;

-- Blood Result table testing
DELETE FROM bloodresult  WHERE blood_result_id = 21221;
UPDATE bloodresult SET negative_result  = 31002  WHERE blood_result_id = 21223;

-- Blood Transfusion table testing
DELETE FROM bloodtransfusion  WHERE blood_recipient = 81216;
-- Error Code: 1062. Duplicate entry '81217' for key 'bloodtransfusion.blood_recipient_UNIQUE'
-- UPDATE bloodtransfusion SET blood_recipient  = 81217  WHERE blood_transfusion_id = 66125;

-- Donor table testing
DELETE FROM donor  WHERE donor_id = 11001;
UPDATE donor SET donor_record  = 10004  WHERE donor_id = 11002;

-- Donor Record Table testing
-- Error Code: 1054. Unknown column 'donor_id' in 'where clause'
-- DELETE FROM donorrecord  WHERE donor_id = 11001;
--  Error Code: 1054. Unknown column 'donor__record_id' in 'where clause'
-- UPDATE donorrecord SET donor_id  = 11001  WHERE donor__record_id = 10004;

-- Disease Verification Table Testing
-- Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.
-- DELETE FROM diseaseverification  WHERE donor_record = 10001;
UPDATE diseaseverification SET disease_description = "None"  WHERE donor_record = 10001;

-- Hospital table testing
DELETE FROM hospital  WHERE donor_record = 10001;
UPDATE hospital SET donor_record  = 10004  WHERE hospital_id = 92223;

-- Manager Table testing
DELETE FROM manager  WHERE notifications_received = 50002;
-- Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails
-- UPDATE manager SET donor_record  = 10004  WHERE manager_id = 13589;

-- Notifications Table Testing
DELETE FROM notifications  WHERE notifications_donor_id = 11001;
UPDATE notifications SET notifications_donor_id  = 11003  WHERE notification_id = 5002;

-- Laboratory Table Testing
DELETE FROM laboratory  WHERE donor_record = 10003;
UPDATE laboratory SET donor_record  = 10002  WHERE laboratory_id = 16652;

-- Transfusion Doctor Table Testing
DELETE FROM transfusiondoctor  WHERE donor_record = 10003;
UPDATE transfusiondoctor SET full_name = "Tommy Menez "  WHERE transfusion_doctor_id = 72144;

-- Negative Result Table Testing

DELETE FROM negativeresult  WHERE blood_result = 21222;
-- Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails 
-- UPDATE negativeresult SET blood_result = 21225  WHERE negative_result_id = 31004;
-- Negative Result Table Testing

-- Positive Result
DELETE FROM positiveresult  WHERE blood_result = 21226;
UPDATE positiveresult SET blood_result = 21226  WHERE positive_result_id = 30103;



