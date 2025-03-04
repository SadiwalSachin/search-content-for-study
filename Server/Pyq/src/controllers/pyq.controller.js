import { prisma } from "../db/dbConfig.js";

const addPyq = async (req, res) => {
    try {

      // data coming from frontend
      const {question,unit,examType,examYear,midSemNumber,topic,subjectCode,repeated,marks,collegeYear,branch} = req.body;
  
      console.log(
        question,
        unit,
        examType,
        examYear,
        midSemNumber,
        topic,
        subjectCode,
        collegeYear,
        repeated,
        marks,
        branch
      );

      // We can apply validation here

      const checkPyq = await prisma.pYQ.findFirst({
        where: {
          question
        }
      })
  
      if (checkPyq) {
        return res.json({ success: false, message: "Question already exists" });
      }

      // local filepath of the file which comefrom the multer middleware
      // const localFilePath = req.file?.path;
  
      // console.log("local file Path : ", localFilePath);
  
      // file uploading on cloudinary
      // const questionImageonCloudinary = await fileUploadOnCloudinary(
      //   localFilePath
      // );
  
      // console.log(questionImageonCloudinary);
  
      // if (!questionImageonCloudinary) {
      //   console.log("image not uploaded on cloudinary");
      // }
  
      // creating question
      const pyq = await prisma.pYQ.create({
        data:{
        question,
        unit,
        examType,
        examYear,
        midSemNumber,
        subjectCode,
        collegeYear,
        topic,
        repeated,
        marks,
        branch,
        image:"",
        }
      });
  
      if (!pyq) {
        return res.json({ success: false, message: "pyq is not stored stored" });
      }
  
      console.log(pyq);
  
      return res.json({ success: true, message: "Question is saved", pyq });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
        message: "some error occureed during question save",
        error: error,
      });
    }
};

const findAllPyq = async (req, res) => {
  try {

    const allPyq = await prisma.pYQ.findMany()

    if (allPyq) {
      console.log("saare pyq aa gaye");
      res.status(201).json({ success: true, message: "All pyq's fetched", data: allPyq });
    }
  } catch (error) {
    console.log("Error occured while fetching all pyq");
    console.log(error);
    res.json({
      success: false,
      message: "Some error occured while fetching all pyq",
    });
  }
};

const deletePyq = async (req, res) => {
  try {

    const {id} = req.body

    console.log("id coming from user to delete pyq: ", id)

    const response = await prisma.pYQ.delete({
      where:{
        id
      }
    })

    if(response){
      res.json({success:true,message:"PYQ Successfully Deleted"})
    }
  } catch (error) {
    console.log("Some thing error occured while deleting PYQ")
    console.log("error :",error)
    res.json({success:false,message:"Error occured while deleting pyq"})
  }
}

export {addPyq , findAllPyq , deletePyq}