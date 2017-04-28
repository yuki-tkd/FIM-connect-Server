import * as DB from './db';

function getAllIncidentsByResidentId(rid: Number) {
  return new Promise((resolve, reject) => {
    const q = "SELECT * FROM Incident WHERE ResidentId = ?";
    DB.findAll(q, [rid], (rows) => {
      resolve(rows)
    });
  });
}

function addIncident(id: Number, type: String) {
  return new Promise((resolve, reject) => {
    let data = {id: id, type: type};
    DB.insert("Incident", data, (result) => {
      console.log("Added " + result);
      resolve(result);
    });
  });
}

export { getAllIncidentsByResidentId, addIncident };
