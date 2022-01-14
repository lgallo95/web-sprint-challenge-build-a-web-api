// add middlewares here related to projects

const Projects = require("./projects-model");

async function errorFourOFour(req, res, next) {
  try {
    const possibleProject = await Projects.get(req.params.id);
    if (possibleProject) {
      next();
    } else {
      next({ status: 404, message: `This is a 404` });
    }
  } catch (err) {
    next(err);
  }
}

async function errorFourHundo(req, res, next) {
  const { name, description, completed } = req.body;
  try {
    if (!name || !description || typeof completed === "undefined") {
      next({ status: 400, message: `This is a 400` });
    } else {
      req.changes = { name, description, completed };
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  errorFourOFour,
  errorFourHundo
};
