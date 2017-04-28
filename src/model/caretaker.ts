import * as DB from './db';

function getCaretakerById(id: Number) {
  return new Promise((resolve, reject) => {
    const q = "SELECT * FROM Caretaker WHERE Id = ?";
    DB.find(q, id, (row) => {
      resolve(row);
    });
  });
}

function getCaretakerByName(name: String) {
  return new Promise((resolve, reject) => {
  const q = "SELECT * FROM Caretaker WHERE UserName = ?";
    DB.find(q, name, (row) => {
      resolve(row);
    });
  });
}

export { getCaretakerById, getCaretakerByName };
