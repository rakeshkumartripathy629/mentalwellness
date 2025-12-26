const Assessment = require("../models/Assesment");
const AssessmentResult = require("../models/AssessmentResult");

const createAssessment = async (data) => {
  return Assessment.create(data);
};

const listAssessments = async () => {
  return Assessment.find();
};

const submitAssessment = async (userId, assessmentId, answers) => {
  const assessment = await Assessment.findById(assessmentId);
  if (!assessment) throw new Error("Assessment not found");

  let score = 0;
  assessment.questions.forEach((q, idx) => {
    const answerIndex = answers[idx];
    const option = q.options[answerIndex];
    if (option) score += option.value;
  });

  let label = "Unknown";
  let details = "";

  assessment.resultRanges.forEach((r) => {
    if (score >= r.minScore && score <= r.maxScore) {
      label = r.label;
      details = r.description;
    }
  });

  const result = await AssessmentResult.create({
    user: userId,
    assessment: assessmentId,
    score,
    label,
    details,
  });

  return result;
};

module.exports = {
  createAssessment,
  listAssessments,
  submitAssessment,
};
