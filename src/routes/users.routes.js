const { Router } = require("express");
const { getUsuarios } = require("../controllers/users.ctrl");

const router = Router();
// router.get('/',getUsuarios)
router.get ("/", getUsuarios);

router.post("/", (req, res) => {
  return res.json({
    msg: "post",
  });
});

router.put("/", (req, res) => {
  return res.json({
    msg: "put",
  });
});

router.delete("/", (req, res) => {
  return res.json({
    msg: "delete",
  });
});

module.exports = router;
