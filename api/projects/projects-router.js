// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    res.json(projects);
  } catch {
    res.json({});
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const projects = await Projects.get(id);
  console.log(projects)
  if (id === null) {
      res.status(404)
  }
  else {
      res.json(projects)
  }
});




module.exports = router;
