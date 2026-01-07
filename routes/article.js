const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require("../controllers/article");
const {
  validateArticles,
  validateIdParam,
} = require("../middlewares/validation");

router.get("/", auth, getArticles);
router.post("/", auth, validateArticles, createArticle);
router.delete("/:articleId", auth, validateIdParam, deleteArticle);

module.exports = router;
