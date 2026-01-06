const router = require("express").Router();
const validate = require("../middlewares/validate.middleware");
const verifyToken = require("../middlewares/auth.middleware");
const requireRole = require("../middlewares/role.middleware");

const {
  createArticleSchema,
  updateArticleSchema,
  listArticlesSchema,
} = require("../utils/articles.validation");

const {
  listArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles.controller");

// ========== Public list ==========
router.get("/", validate(listArticlesSchema), listArticles);

// ========== Protected create (user/admin) ==========
router.post(
  "/",
  verifyToken,
  requireRole("user", "admin"),
  validate(createArticleSchema),
  createArticle
);

// ========== Protected update (owner/admin) ==========
router.put("/:id", verifyToken, validate(updateArticleSchema), updateArticle);

// ========== Admin only delete ==========
router.delete("/:id", verifyToken, requireRole("admin"), deleteArticle);

module.exports = router;
