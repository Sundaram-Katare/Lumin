import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: {
        type: [String],
        validate: {
            validator: function(arr) {
                return arr.length === 4;
            },
            message: "Exactly 4 Options are required",
        },
        required: true,
    },
    correctAnswerIndex: {
        type: Number,
        min: 0,
        max: 3,
        required: true
    },
});

const quizSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: {
        type: [questionSchema],
        validate: {
            validator: function(arr) {
                  return arr.length > 0;
            }
        },
    },
    live: { type: String, default: "Yes" },
    code: { type: String },
    image: { type: String, default: "images/room.png" },
    difficulty: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
}, { collection: "quiz"});

export default mongoose.model("Quiz", quizSchema);