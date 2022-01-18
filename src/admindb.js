const { connect } = require("./db-connection");
const mongoose = require("mongoose");
// const url = "mongodb+srv://user:pwd@wedlock-cluster.da3ng.mongodb.net/admindb";
const url =
  "mongodb+srv://iamrithi:iamrithi333@cluster0.gdtlt.mongodb.net/USER?retryWrites=true&w=majority";
let db;
const tenantSchema = new mongoose.Schema(
  {
    tenantName: String,
  },
  { timestamps: true }
);

const tenantModel = mongoose.model("tenants", tenantSchema);

const getDb = async () => {
  return db ? db : await connect(url);
};

const getTenantModel = async () => {
  const adminDb = await getDb();
  return adminDb.model("tenants", tenantSchema);
};

module.exports = {
  getTenantModel,
};
