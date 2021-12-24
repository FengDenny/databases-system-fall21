// read me invite link
// https://replit.com/join/finfxdnloh-fengdenny
const { Client, MessageEmbed } = require("discord.js");
const client = new Client();
const mysql = require("mysql");
const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
con.getConnection((err) => {
  if (err) {
    console.log(err);
  } else {
    return console.log(`Connected to ${process.env.DB_NAME}`);
  }
});

// Query
client.on("message", (msg) => {
  switch (msg.content) {
    // For each blood recipient, find blood recipient address that has the same address as the manager
    // WTS: manager.address AS "Manager", recipientRecord.address as "BloodRecipientRecord", address.street as "Address
    // WTF: Address address, BloodRecipientRecord recipientRecord, Manager manager
    case "/same_address":
      con.query(
        `SELECT DISTINCT manager.full_name AS "Manager", recipientRecord.full_name AS "BloodRecipientRecord", address.street AS "Address" 
     FROM Address address 
     JOIN Manager manager ON address.address_id  = manager.address
     JOIN BloodRecipientRecord recipientRecord ON manager.address = recipientRecord.address
     ORDER BY address.street;
`,
        (err, results, fields) => {
          const result = Object.values(JSON.parse(JSON.stringify(results)));
          for (var key in result) {
            var obj = result[key];
            if (err) {
              throw err;
            } else {
              const addressEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Address Detail")
                .addFields({
                  name: `Address: ${obj.Address} `,
                  value: `Manager: ${obj.Manager}
                Blood Recipient Record: ${obj.BloodRecipientRecord}`,
                  inline: true,
                });
              msg.channel.send(addressEmbed);
            }
          }
        }
      );
      break;
    // Find the number of donor record that has donated to the same blood bank
    // WTS: donor.donor_record_id AS "Donor Record Id",  donor.full_name AS "Donor",        bank.name AS "Blood Bank Name"
    // WTF: DonorRecord donor BloodBank bank
    case "/donated":
      con.query(
        `SELECT donor.donor_record_id AS "DonorRecordID",  donor.full_name AS "Donor", bank.name AS "BloodBankName"
      FROM BloodBank bank
      JOIN DonorRecord donor ON bank.blood_bank_id = donor.blood_bank
      ORDER BY donor.full_name`,
        (err, results, field) => {
          const result = Object.values(JSON.parse(JSON.stringify(results)));
          // console.log(result)
          for (var key in result) {
            var obj = result[key];
            if (err) {
              throw err;
            } else {
              const donationEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Blood Bank Details")
                .addFields({
                  name: `Donor Record ID: ${obj.DonorRecordID} `,
                  value: `Donor: ${obj.Donor}
                       Blood Bank Name: ${obj.BloodBankName}`,
                });
              msg.channel.send(donationEmbed);
            }
          }
        }
      );
      break;
    // For each laboratory, find the corresponding hospital that they reside in.
    // WTS: lab.laboratory_id AS "LaboratoryID", lab.name AS "LaboratoryName", hospital.hospital_id AS "HospitalID",  hospital.name AS "HospitalName"
    // WTF: Hospital hospital Laboratory lab
    case "/lab_to_hospital":
      con.query(
        `
    SELECT lab.laboratory_id AS "LaboratoryID", lab.name AS "LaboratoryName", hospital.hospital_id AS "HospitalID",  hospital.name AS "HospitalName"
    FROM Hospital hospital
    JOIN Laboratory lab ON  hospital.address = lab.address
    ORDER BY lab.name;`,
        (err, results, field) => {
          // console.log(results)
          for (var key in results) {
            var obj = results[key];
            if (err) {
              throw err;
            } else {
              const hospitalLabEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Laboratory Hospital Details")
                .addFields({
                  name: `Laboratory ID: ${obj.LaboratoryID} `,
                  value: `Laboratory Name: ${obj.LaboratoryName}
                       Hospital ID: ${obj.HospitalID}
                       Hospital Name: ${obj.HospitalName}
                       `,
                });
              msg.channel.send(hospitalLabEmbed);
            }
          }
        }
      );
      break;
    // Find the monitoring process that each blood bank uses and display the description of the monitoring process.
    // WTS:  bank.id AS "ID", bank.name AS "Name", monitor.description AS "Description",
    // monitor.monitoring_process_id AS "MonitoringID"
    // WTF: MonitoringProcess process, BloodBank bank
    case "/blood_bank_mp":
      con.query(
        `
    SELECT  bank.blood_bank_id AS "ID", bank.name AS "Name", monitor.description AS "Description", monitor.monitoring_process_id AS "MonitoringID"
    FROM MonitoringProcess monitor
    JOIN BloodBank bank ON monitor.monitoring_process_id = monitoring_process;
    `,
        (err, results, field) => {
          console.log(results);
          for (var key in results) {
            var obj = results[key];
            if (err) {
              throw err;
            } else {
              const mpEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`Monitoring Process ID: ${obj.MonitoringID}`)
                .addFields({
                  name: `Blood Bank ID: ${obj.ID} `,
                  value: `Blood Bank Name: ${obj.Name}
                       Monitoring Description: ${obj.Description}`,
                });
              msg.channel.send(mpEmbed);
            }
          }
        }
      );
      break;
    // For each transfusion doctor, find the hospital they work and displaying each of their names
    //  WTS:  hospital.name AS "HospitalName", doctor.full_name AS "DoctorName"
    // WTF: Hospital hospital
    case "/hospital_td_info":
      con.query(
        `
      SELECT doctor.transfusion_doctor_id AS "DoctorID", 
      doctor.full_name AS "DoctorName", 
      hospital.hospital_id AS "HospitalID", 
      hospital.name AS "HospitalName"
      FROM  Hospital hospital
      JOIN TransfusionDoctor doctor ON hospital.hospital_id = hospital`,
        (err, results, fields) => {
          console.log(results);
          for (var key in results) {
            var obj = results[key];
            if (err) {
              throw err;
            } else {
              const doctorEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`Hospital ID: ${obj.HospitalID}`)
                .addFields({
                  name: `Transfusion Doctor ID: ${obj.DoctorID} `,
                  value: `Transfusion Doctor Name: ${obj.DoctorName}
                       Hospital Name: ${obj.HospitalName}`,
                });
              msg.channel.send(doctorEmbed);
            }
          }
        }
      );
      break;
    // For each blood transfusion, find the blood recipients and their blood recipient records
    //WTS: recipient.blood_recipient_id  AS "RecipientID",          recipientRecord.blood_recipient_record_id AS "RecordID",
    // recipientRecord.full_name AS "RecipientName",
    // transfusion.blood_transfusion_id AS "TransfusionID"
    // WTF: BloodTransfusion transfusion
    case "/blood_transfusion_recipients":
      con.query(
        `
    SELECT  recipient.blood_recipient_id  AS "RecipientID", recipientRecord.blood_recipient_record_id AS "RecordID", recipientRecord.full_name AS "RecipientName",
    transfusion.blood_transfusion_id AS "TransfusionID"
    FROM  BloodTransfusion transfusion
    JOIN BloodRecipient recipient ON transfusion.blood_transfusion_id = blood_transfusion
    JOIN BloodRecipientRecord recipientRecord ON  recipient.blood_recipient_id = recipientRecord.blood_recipient
    ORDER BY  transfusion.blood_transfusion_id;`,
        (err, results, field) => {
          for (var key in results) {
            var obj = results[key];
            if (err) {
              throw err;
            } else {
              const btEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`Transfusion ID: ${obj.TransfusionID}`)
                .addFields({
                  name: `Blood Recipient ID: ${obj.RecipientID} `,
                  value: `Blood Recipient Record ID: ${obj.RecordID}
                       Blood Recipient Name: ${obj.RecipientName}`,
                });
              msg.channel.send(btEmbed);
            }
          }
        }
      );
  }
});

// For each blood type find the corresponding donor record and blood recipient record that has those blood types
// WTS: full_name AS "Full Name", o_type_blood_type AS "a blood type",
// a_type_blood_type AS "a blood type", b_type_blood_type AS "a blood type"
// a_b_type_blood_type AS "a blood type"
//WTF: donorrecord, bloodrecipientrecord, bloodtype
client.on("message", (msg) => {
  switch (msg.content) {
    case "/find_blood_type o":
      con.query(
        `SELECT donor.full_name AS "Donor",  recipient.full_name AS "Recipient", blood.o_type_blood_type AS "o blood type "
      FROM BloodType blood
      JOIN DonorRecord donor ON blood.blood_type_id = donor.blood_type
      JOIN BloodRecipientRecord recipient ON blood.blood_type_id = recipient.blood_type
      HAVING o_type_blood_type`,
        (err, results, fields) => {
          const result = Object.values(JSON.parse(JSON.stringify(results)));
          for (var key in result) {
            var obj = result[key];
            if (err) {
              throw err;
            } else {
              const bloodTypeEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Blood Type Detail")
                .addFields({
                  name: `O Blood Type `,
                  value: `Donor: ${obj.Donor}
                Blood Recipient: ${obj.Recipient}`,
                });
              msg.channel.send(bloodTypeEmbed);
            }
          }
        }
      );
      break;
    case "/find_blood_type a":
      con.query(
        `SELECT donor.full_name AS "Donor",  recipient.full_name AS "Recipient", blood.a_type_blood_type AS "a blood type "
      FROM BloodType blood
      JOIN DonorRecord donor ON blood.blood_type_id = donor.blood_type
      JOIN BloodRecipientRecord recipient ON blood.blood_type_id = recipient.blood_type
      HAVING a_type_blood_type`,
        (err, results, fields) => {
          const result = Object.values(JSON.parse(JSON.stringify(results)));
          for (var key in result) {
            var obj = result[key];
            console.log(result);
            if (err) {
              throw err;
            } else {
              const bloodTypeEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Blood Type Detail")
                .addFields({
                  name: `A Blood Type `,
                  value: `Donor: ${obj.Donor}
                Blood Recipient: ${obj.Recipient}`,
                });
              msg.channel.send(bloodTypeEmbed);
            }
          }
        }
      );
      break;
    case "/find_blood_type b":
      con.query(
        `SELECT donor.full_name AS "Donor",  recipient.full_name AS "Recipient", blood.b_type_blood_type AS "b blood type "
      FROM BloodType blood
      JOIN DonorRecord donor ON blood.blood_type_id = donor.blood_type
      JOIN BloodRecipientRecord recipient ON blood.blood_type_id = recipient.blood_type
      HAVING b_type_blood_type`,
        (err, results, fields) => {
          const result = Object.values(JSON.parse(JSON.stringify(results)));
          for (var key in result) {
            var obj = result[key];
            console.log(result);
            if (err) {
              throw err;
            } else {
              const bloodTypeEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Blood Type Detail")
                .addFields({
                  name: `B Blood Type `,
                  value: `Donor: ${obj.Donor}
                Blood Recipient: ${obj.Recipient}`,
                });
              msg.channel.send(bloodTypeEmbed);
            }
          }
        }
      );
      break;
    case "/find_blood_type ab":
      con.query(
        `SELECT donor.full_name AS "Donor",  recipient.full_name AS "Recipient", blood.a_b_type_blood_type AS "ab blood type "
      FROM BloodType blood
      JOIN DonorRecord donor ON blood.blood_type_id = donor.blood_type
      JOIN BloodRecipientRecord recipient ON blood.blood_type_id = recipient.blood_type
      HAVING a_b_type_blood_type`,
        (err, results, fields) => {
          const result = Object.values(JSON.parse(JSON.stringify(results)));
          for (var key in result) {
            var obj = result[key];
            console.log(result);
            if (err) {
              throw err;
            } else {
              const bloodTypeEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle("Blood Type Detail")
                .addFields({
                  name: `AB Blood Type `,
                  value: `Donor: ${obj.Donor}
                Blood Recipient: ${obj.Recipient}`,
                });
              msg.channel.send(bloodTypeEmbed);
            }
          }
        }
      );
      break;
  }
});

// For blood results, find negative or positive results that was tested in the  laboratory
// WTS: result.blood_result_id AS "resultID",
// result.positive_result AS "Positive", resullt.negative_result AS "Negative",
// result.laboratory AS "LaboratoryID", lab.name AS "LabName"
// WTF: BloodResult result

client.on("message", (msg) => {
  switch (msg.content) {
    case "/blood_results negative":
      con.query(
        `
    SELECT result.blood_result_id AS "resultID", result.negative_result AS "Negative", result.laboratory AS "LaboratoryID", lab.name AS "LabName"
    FROM BloodResult result 
    JOIN Laboratory lab ON result.laboratory = lab.laboratory_id
    HAVING result.negative_result
    ORDER BY result.laboratory;
    `,
        (err, results, field) => {
          console.log(results);
          for (var key in results) {
            var obj = results[key];
            if (err) {
              throw err;
            } else {
              const resultEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`Laboratory ID: ${obj.LaboratoryID}`)
                .addFields({
                  name: `Lab Name: ${obj.LabName} `,
                  value: `Blood Result ID: ${obj.resultID}
                    Negative ID: ${obj.Negative}`,
                });
              msg.channel.send(resultEmbed);
            }
          }
        }
      );
      break;
    case "/blood_results positive":
      con.query(
        `
    SELECT result.blood_result_id AS "resultID",  result.positive_result AS "Positive", result.laboratory AS "LaboratoryID", lab.name AS "LabName"
    FROM BloodResult result 
    JOIN Laboratory lab ON result.laboratory = lab.laboratory_id
    HAVING result.positive_result
    ORDER BY result.laboratory;
    `,
        (err, results, field) => {
          console.log(results);
          for (var key in results) {
            var obj = results[key];
            if (err) {
              throw err;
            } else {
              const resultEmbed = new MessageEmbed()
                .setColor("#0099ff")
                .setTitle(`Laboratory ID: ${obj.LaboratoryID}`)
                .addFields({
                  name: `Lab Name: ${obj.LabName} `,
                  value: `Blood Result ID: ${obj.resultID}
                    Positive ID: ${obj.Positive}`,
                });
              msg.channel.send(resultEmbed);
            }
          }
        }
      );
      break;
  }
});

client.login(process.env.DISCORD_TOKEN);
