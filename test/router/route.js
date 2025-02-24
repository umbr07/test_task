const express = require("express");
const router = express.Router();
const appealController = require("../controller/appeal.controller");


router.post("/create", appealController.createAppeal);
router.put("/accept", appealController.acceptAppeal);
router.put("/compleate", appealController.compleateAppeal);
router.put("/cancel", appealController.cancelAppeal);
router.post("/getAppealsByDate", appealController.getAppealsByDate);
router.post("/getAppealsByDateRange", appealController.getAppealsByDateRange);
router.put("/cancelAppealInAcept", appealController.cancelAppealInAcept);

module.exports = router;