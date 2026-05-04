import Quiz from '../models/quizModel.js';
import {nanoid, customAlphabet} from 'nanoid';

export const addQuiz = async (req, res) => {
    try {
        const { title, description, questions, image, isPrivate, difficulty } = req.body;

        if(!title || !description || !questions ){
            return res.status(401).json("All fields are required. ");
        }

        const nanoid = customAlphabet("0123456789", 6);

        const code = nanoid();
        console.log(code)

        const quiz = await Quiz.create({
            title,
            description,
            questions,
            code: code,
            image,
            isPrivate,
            difficulty
        });

      return res.status(200).json({message: "Quiz created successfully", code: quiz?.code});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllQuiz = async (req, res) => {
    try {
        const quizList = await Quiz.find();

        return res.status(200).json(quizList);
    } catch( error) {
        return res.status(500).json({ message: error.message, text: "Error fetching quizzes" });
    }
};

export const getQuizByCode = async (req, res) => {
  try {
    const { code } = req.query;
    const quiz = await Quiz.findOne({ code }).select('title description questions code');
    if (!quiz) return res.status(404).json(null);
    return res.status(200).json(quiz);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};