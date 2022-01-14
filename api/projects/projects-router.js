// Write your "projects" router here!
const express = require("express");
const { errorFourOFour, errorFourHundo } = require("./projects-middleware");
const Projects = require("./projects-model");
const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then((pjk) => {
      res.json(pjk);
    })
    .catch((error) => {
      res.status(500).json({});
    });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const projects = await Projects.get(id);
  if (!projects) {
    res.status(404).json({ message: "It 404" });
  } else {
    res.json(projects);
  }
});

router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: "It 400" });
  } else {
    Projects.insert(req.body).then((pjk) => {
      res.json(pjk);
    });
  }
});

router.put("/:id", errorFourOFour, errorFourHundo, async (req, res, next) => {
  try {
    const projects = await Projects.update(req.params.id, req.changes);
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", errorFourOFour, async (req, res, next) => {
  try {
    const projectDeleteo = await Projects.remove(req.params.id);
    res.status(200).json(projectDeleteo);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", errorFourOFour, async (req, res, next) => {
  try {
    const projectActs = await Projects.getProjectActions(req.params.id);
    res.status(200).json(projectActs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
