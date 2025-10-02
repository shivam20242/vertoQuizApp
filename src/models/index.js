import mongoose from "mongoose";

//Quiz Schema
const quizSchema = new mongoose.Schema({
    title:{type:String, required:true}
})

//Question Schema
const questionSchema = new mongoose.Schema({
    quiz:{type:mongoose.Schema.Types.ObjectId, ref:'Quiz', required:true},
    text:{type:String, required:true},
    type:{type:String, default:'single_choice'}
})

//option Schema
const optionSchema = new mongoose.Schema({
    question:{type:mongoose.Schema.Types.ObjectId, ref:'Question', required:true},
    text:{type:String, required:true},
    isCorrect:{type:Boolean, default:false}
})

//models
const Quiz = mongoose.model('Quiz', quizSchema);
const Question  = mongoose.model('Question', questionSchema);
const Option = mongoose.model('Option', optionSchema);

export {Quiz, Question, Option};