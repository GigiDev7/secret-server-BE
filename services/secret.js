const Secret = require("../models/secret");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const generateHash = async (secretText) => {
  const salt = await bcrypt.genSalt(12);
  let hash = await bcrypt.hash(secretText, salt);
  if (hash.includes("/")) {
    hash = hash.replace(/\//g, ".");
  }
  return hash;
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
  const hash = await generateHash(secretData.secretText);
  const { iv, encryptedSecretText } = encrypt(secretData.secretText);
  const secret = await Secret.create({
    hash: `${hash}-${iv}`,
    secretText: encryptedSecretText,
    expiresAt: secretData.expiresAt,
  });
  return secret;
};

const findSingleSecret = async (hash) => {
  const secret = await Secret.findOne({ hash });
  const decryptedText = decrypt(secret.iv, secret.secretText);
  return { secret, decryptedText };
};

module.exports = {
  addNewSecret,
  findSingleSecret,
};
