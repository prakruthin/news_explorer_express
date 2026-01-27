const Article = require("../models/article");

const NotFoundError = require("../errors/not-found-error");
const BadRequestError = require("../errors/bad-request-error");
const ForbiddenError = require("../errors/forbidden-error");
// const ConflictError = require("../errors/conflict-error");
// const UnauthorizedError = require("../errors/unauthorized-error");

const getArticles = (req, res, next) => {
  const userId = req.user._id;
  Article.find({ owner: userId })
    .then((articles) => {
      res.status(200).send({ data: articles });
    })
    .catch((err) => {
      next(err);
    });
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((articles) => {
      res.status(201).send({ data: articles });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .select("+owner") // include owner for comparison
    .orFail()
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        return next(new ForbiddenError("You can only delete your own items"));
      }

      return Article.findByIdAndDelete(articleId)
        .orFail()
        .then((deletedItem) => {
          res.status(200).send({ data: deletedItem });
        });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Requested resource not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid data provided"));
      }
      return next(err);
    });
};

module.exports = { getArticles, createArticle, deleteArticle };
