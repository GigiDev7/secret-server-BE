const express = require("express");

const router = express.Router();

router.route("/").post();
router.route("/:hash").get();

module.exports = router;
