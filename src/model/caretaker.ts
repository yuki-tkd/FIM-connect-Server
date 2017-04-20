import * as DB from './db';

function getCaretakerById(id) {
  return new Promise((resolve, reject) => {
    const q = "SELECT * FROM Caretaker WHERE Id = ?";
    DB.find(q, id, (row) => {
      resolve(row);
    });
  });
}

function getCaretakerByName(name) {
  return new Promise((resolve, reject) => {
  const q = "SELECT * FROM Caretaker WHERE UserName = ?";
    DB.find(q, name, (row) => {
      resolve(row);
    });
  });
}

export { getCaretakerById, getCaretakerByName };
