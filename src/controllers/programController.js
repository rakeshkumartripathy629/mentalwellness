const catchAsync = require("../Utils/catchAsync");
const { success } = require("../Utils/apiResponse");
const Program = require("../models/Program");

const createProgram = catchAsync(async (req, res) => {
  const program = await Program.create(req.body);
  return success(res, { program }, "Program created", 201);
});

const getPrograms = catchAsync(async (req, res) => {
  const { category } = req.query;
  const filter = {};
  if (category) filter.category = category;
  const programs = await Program.find(filter).populate("days.activities");
  return success(res, { programs }, "Programs fetched");
});

module.exports = { createProgram, getPrograms };
