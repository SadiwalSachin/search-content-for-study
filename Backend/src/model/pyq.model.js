import mongoose from "mongoose";

const PYQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    unit: {
      type: Number,
      enum:[1,2,3,4,5],
      required: true,
    },
    examType: {
      type: String,
      enum: ["PYQ", "MidSem"],
      required: true,
    },
    examYear: {
      type: String,
      required: function () {
        return this.examType === "PYQ";
      },
    },
    midSemNumber: {
      type: Number,
      enum: [1, 2, 3],
      required: function () {
        return this.examType === "MidSem";
      },
    },
    subjectCode:{
      type:String,
      required:true
    },
    topic: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    repeated:{
      type:Number,
      required:true,
      default:0
    },
    marks:{
      type:Number,
      required:true
    },
    collegeYear:{
      type:String,
      enum:[1,2,3,4],
      required:true
    },
    branch:{
      type:String,
      enum:["ECE","EX","CSE","ME","AU","PCT","IT"],
      required:function(){
        return this.collegeYear !== 1
      }
    }
  },
  { timestamps: true }
);

PYQSchema.index({
  question:"text",
  chapter:"text",
  topic:"text",
  subject:"text"
})

export const PYQ = mongoose.model("PYQ", PYQSchema);
