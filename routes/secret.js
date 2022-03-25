const express = require("express");
const { createSecret, getSecret } = require("../controllers/secret");

const router = express.Router();

router.route("/").post(createSecret);
router.route("/:hash").get(getSecret);

module.exports = router;
