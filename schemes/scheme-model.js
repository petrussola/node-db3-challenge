const db = require("../data/db-config");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
  addStep
};

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes").where({ id }).first();
}

function findSteps(id) {
  return db
    .select("st.id", "sc.scheme_name", "st.step_number", "st.instructions")
    .from("steps as st")
    .join("schemes as sc", "st.scheme_id", "sc.id")
    .orderBy(["sc.scheme_name", "st.step_number"]);
}

function add(scheme) {
  return db("schemes")
    .insert(scheme)
    .then(id => {
      return findById(id[0]);
    });
}

function update(changes, id) {
  return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db("schemes")
    .where({ id })
    .del();
}

function findStepById(id) {
  return db("steps").where({ id });
}

function addStep(step, scheme_id) {
  return db("steps")
    .insert({
      ...step,
      scheme_id
    })
    .then(ids => {
      return findStepById(ids[0]);
    });
}
