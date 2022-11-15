exports.checkBody = (req, res, next) => {
  const { word } = req.body;

  if (!word || word.trim().length === 0) {
    return res.status(400).send({
      error: "Word not empty",
    });
  }
  next();
};
