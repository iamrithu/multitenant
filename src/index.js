const express = require("express");
const app = express();
const port = 3000;

const { getTenantModel } = require("./admindb");
const { getCustomerModel } = require("./tenantdb");

// app.use(require("body-parser"));
app.use(express.json());
app.post("/tenant", async (req, res) => {
  var data = {
    tenantName: req.body.tenantName,
  };

  let tenantModel = await getTenantModel();
  const tenant = new tenantModel({ id: data.tenantName });
  let doc = await tenantModel.create(data);
  if (!doc) {
    tenant.save(function (err) {
      // if (err) return handleError(err);
      // saved!
    });
  }
  res.send(JSON.stringify(tenant));
});

app.post("/customer", async (req, res) => {
  var data = {
    customerName: req.body.customerName,
    age: req.body.age,
  };
  let tenantId = req.query.tenantId;
  // let customerName = req.query.customer;
  let tenantModel = await getTenantModel();
  let tenant = await tenantModel.findOne({ id: tenantId });
  if (!tenant) res.sendStatus(404); // tenant not found. Register tenant
  let customerModel = await getCustomerModel(tenantId);
  const customer = new customerModel(data);
  let doc = await customerModel.create(customer);
  if (!doc) {
    customer.save(function (err) {
      // if (err) return handleError(err);
      // saved!
    });
  }

  res.send(JSON.stringify(customer));
});

app.listen(port, () => {
  console.log(`listening ${port}`);
});

//I am going to add/register two tenants.
//Now I am goint to add customer for each tenant.
