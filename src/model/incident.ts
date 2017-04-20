import * as DB from './db';

function getAllIncidentsByResidentId(rid) {
  const q = "SELECT * FROM Incident WHERE ResidentId = ?";
  DB.findAll(q, [rid], (rows) => {
    console.log(rows);
    return rows;
  });
}

export { getAllIncidentsByResidentId };
