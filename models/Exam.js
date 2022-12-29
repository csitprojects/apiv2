const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subjects: [
    {
      name: {
        type: String,
        required: true,
      },
      chapters: [
        {
          name: {
            type: String,
            required: true,
          },
          mockTests: [
            {
              name: {
                type: String,
                required: true,
              },
              author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
              },
              price: {
                type: Number,
                required: true,
              },
              questions: [
                {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Question",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

const Exam = mongoose.model("Exam", ExamSchema);
module.exports = Exam;
