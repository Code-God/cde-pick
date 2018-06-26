/*查询drug_disease_dict表*/
const querCdeInformation = {
  queryByCtrId: 'SELECT dict.state FROM drug_disease_dict dict WHERE dict.ctr_id = ?'
};

/*插入drug_disease_dict表数据*/
const addCdeInformation = {
    insertOne: 'INSERT INTO drug_disease_dict (ctr_id, dic_disease_name, dic_disease_introduction,dic_disease_profile, publish_date, adaptation, general_title,dic_medicine_name, dic_medicine_type, design_purpose, design_stage, design_type, randomize, blind_method, subject_conditionIn, subject_conditionout, groupcompared_medicine, sponsorinfo, state) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
};

/*更新drug_disease_dict表*/
const updateCdeInformation = {
  updateByCtrId: 'UPDATE drug_disease_dict dict SET dict.state = ? WHERE dict.ctr_id = ?'
};

/*查询drug_research_center表*/
const querDrugInformation = {
  queryByCtrId: 'SELECT drug.resercher FROM drug_research_center drug WHERE drug.ctr_id = ?'
};

/*插入drug_research_center表*/
const addDrugInformation = {
  insertOne: 'INSERT INTO  drug_research_center (ctr_id, institution_name, resercher, ct_contry, ct_province, ct_city) VALUES (?,?,?,?,?,?)'
};

/*exports*/
module.exports = {
  querCdeInformation: querCdeInformation,
  addCdeInformation: addCdeInformation,
  updateCdeInformation: updateCdeInformation,
  querDrugInformation: querDrugInformation,
  addDrugInformation: addDrugInformation
};
