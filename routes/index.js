const router = require("express").Router();
const userRouter = require("./users");
const articleRouter = require("./article");
const auth = require("../middlewares/auth");

const { createUser, login } = require("../controllers/users");
const NotFoundError = require("../errors/not-found-error");
const {
  validateUser,
  validateLoginBody,
} = require("../middlewares/validation");

router.post("/signup", validateUser, createUser);
router.post("/signin", validateLoginBody, login);

router.use("/users", auth, userRouter);
router.use("/articles", articleRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
