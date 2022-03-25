const { addNewSecret, findSingleSecret } = require("../services/secret");

const createSecret = async (req, res) => {
  try {
    const secret = await addNewSecret(req.body);
    res.status(201).json(secret);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const getSecret = async (req, res) => {
  try {
    const { hash } = req.params;
    const { secret, decryptedText } = await findSingleSecret(hash);
    const data = { ...secret._doc };
    data.secretText = decryptedText;
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createSecret,
  getSecret,
};
