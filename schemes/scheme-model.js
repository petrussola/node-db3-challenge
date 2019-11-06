const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps
  // add,
  // update,
  // remove
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id });
}

function findSteps(id) {
  return db
    .select("st.id", "sc.scheme_name", "st.step_number", "st.instructions")
    .from("steps as st")
    .join("schemes as sc", "st.scheme_id", "sc.id")
    .orderBy(["sc.scheme_name", "st.step_number"]);
}
