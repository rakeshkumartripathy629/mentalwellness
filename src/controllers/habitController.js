const catchAsync = require("../utils/catchAsync");
const { success } = require("../utils/apiResponse");
const {
  createHabit,
  getHabits,
  logHabit,
  getHabitLogs,
} = require("../services/habitService");

const createMyHabit = catchAsync(async (req, res) => {
  const habit = await createHabit(req.user._id, req.body);
  return success(res, { habit }, "Habit created", 201);
});

const getMyHabits = catchAsync(async (req, res) => {
  const habits = await getHabits(req.user._id);
  return success(res, { habits }, "Habits fetched");
});

const logMyHabit = catchAsync(async (req, res) => {
  const { habitId, date, completed } = req.body;
  const log = await logHabit(habitId, date, completed);
  return success(res, { log }, "Habit logged");
});

const getMyHabitLogs = catchAsync(async (req, res) => {
  const { habitId } = req.params;
  const logs = await getHabitLogs(habitId);
  return success(res, { logs }, "Habit logs fetched");
});

module.exports = {
  createMyHabit,
  getMyHabits,
  logMyHabit,
  getMyHabitLogs,
};
