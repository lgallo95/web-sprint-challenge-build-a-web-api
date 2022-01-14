// Write your "actions" router here!
const express = require("express");
const { errorFourOFour, errorFourHundo } = require("./actions-middlware");
const Actions = require("./actions-model");
const router = express.Router();

router.get("/", (req, res) => {
    Actions.get()
      .then((pjk) => {
        res.json(pjk);
      })
      .catch((error) => {
        res.status(500).json({});
      });
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const actions = await Actions.get(id);
    if (!actions) {
      res.status(404).json({ message: "It 404" });
    } else {
      res.json(actions);
    }
  });

  router.post("/", (req, res) => {
    const { notes, description, project_id } = req.body;
    if (!notes || !description || !project_id) {
      res.status(400).json({ message: "It 400" });
    } else {
      Actions.insert(req.body).then((pjk) => {
        res.json(pjk);
      });
    }
  });

  router.put("/:id", errorFourOFour, errorFourHundo, async (req, res, next) => {
    try {
      const projects = await Actions.update(req.params.id, req.changes);
      res.status(200).json(projects);
    } catch (err) {
      next(err);
    }
  });


  
module.exports = router;