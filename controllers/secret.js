const { addNewSecret } = require("../services/secret");

const createSecret = async (req, res) => {
  try {
    const secret = await addNewSecret(req.body);
    res.status(201).json(secret);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getSecret = async (req, res) => {
  res.send("secret");
};

module.exports = {
  createSecret,
  getSecret,
};
