const Habit = require("../models/Habit");
const HabitLog = require("../models/HabitLog");

const createHabit = async (userId, data) => {
  return Habit.create({ user: userId, ...data });
};

const getHabits = async (userId) => {
  return Habit.find({ user: userId, isActive: true });
};

const logHabit = async (habitId, date, completed) => {
  const log = await HabitLog.findOneAndUpdate(
    { habit: habitId, date },
    { completed },
    { new: true, upsert: true }
  );
  return log;
};

const getHabitLogs = async (habitId) => {
  return HabitLog.find({ habit: habitId }).sort({ date: 1 });
};

module.exports = {
  createHabit,
  getHabits,
  logHabit,
  getHabitLogs,
};
