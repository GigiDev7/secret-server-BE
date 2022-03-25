const Secret = require("../models/secret");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const secretHash = async () => {
  const salt = await bcrypt.genSalt(10);
  return salt;
};

const algorithm = process.env.CRYPTO_ALGORITHM;
const key = process.env.CRYPTO_KEY;
const iv = crypto.randomBytes(16);

const encrypt = (secret) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  const encrypted = Buffer.concat([cipher.update(secret), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    encryptedSecretText: encrypted.toString("hex"),
  };
};

const decrypt = (iv, encryptedData) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, "hex")
  );
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, "hex")),
    decipher.final(),
  ]);
  return decrpyted.toString();
};

const addNewSecret = async (secretData) => {
  const hash = await secretHash(secretData.secretText);
  const { iv, encryptedSecretText } = encrypt(secretData.secretText);
  const secret = await Secret.create({
    hash: `${hash}-${iv}`,
    secretText: encryptedSecretText,
    expiresAt: secretData.expiresAt,
  });
  return secret;
};

module.exports = {
  addNewSecret,
};
