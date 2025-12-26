const catchAsync = require("../utils/catchAsync");
const { success } = require("../utils/apiResponse");
const {
  createAssessment,
  listAssessments,
  submitAssessment,
} = require("../services/assessmentService");
const { ROLES } = require("../utils/constants");

const create = catchAsync(async (req, res) => {
  if (req.user.role !== ROLES.ADMIN) {
    res.status(403);
    throw new Error("Admin only");
  }
  const assessment = await createAssessment(req.body);
  return success(res, { assessment }, "Assessment created", 201);
});

const list = catchAsync(async (req, res) => {
  const assessments = await listAssessments();
  return success(res, { assessments }, "Assessments fetched");
});

const submit = catchAsync(async (req, res) => {
  const { assessmentId, answers } = req.body;
  const result = await submitAssessment(req.user._id, assessmentId, answers);
  return success(res, { result }, "Assessment submitted");
});

module.exports = { create, list, submit };
