// add middlewares here related to actions
const Actions = require("./actions-model");

async function errorFourOFour(req, res, next) {
  try {
    const possibleActions = await Actions.get(req.params.id);
    if (possibleActions) {
      next();
    } else {
      next({ status: 404, message: `This is a 404` });
    }
  } catch (err) {
    next(err);
  }
}

async function errorFourHundo(req, res, next) {
  const { description, notes, completed } = req.body;
  try {
    if (!description || !notes || typeof completed === "undefined") {
      next({ status: 400, message: `This is a 400` });
    } else {
      req.changes = { description, notes, completed };
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
