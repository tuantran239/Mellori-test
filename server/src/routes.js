const express = require("express");
const { readCorpus, mostSimilar, appendToCorpus } = require("./search.service");
const { checkBody } = require("./middleware");

const METRIC_SIMILAR = 0.5;

const router = express.Router();

router.get("/", checkBody, async (req, res) => {
  try {
    const data = await readCorpus();
    res.status(200).send({ data: [...new Set(data.split(" "))].length });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/w", checkBody, async (req, res) => {
  try {
    const { word } = req.body;
    const data = await readCorpus();
    const wordsUnique = [...new Set(data.split(" "))];
    const arr = [];
    for (let i = 0; i < wordsUnique.length; i++) {
      const w = wordsUnique[i];
      const m = mostSimilar(w, word);
      if (m >= METRIC_SIMILAR) {
        arr.push(w);
      }
    }
    res.status(200).send({ data: arr.splice(0, 3) });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/x", checkBody, async (req, res) => {
  try {
    const { word } = req.body;
    await appendToCorpus(word);
    res.status(200).send({ data: [word] });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/y", async (req, res) => {
  try {
    const { word } = req.body;
    const data = await readCorpus();
    const wordsUnique = [...new Set(data.split(" "))];
    const arr = wordsUnique.filter((w) => {
      const m = mostSimilar(w, word);
      if (m < METRIC_SIMILAR) {
        return w;
      }
    });
    res.status(200).send({ data: arr });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = router;
