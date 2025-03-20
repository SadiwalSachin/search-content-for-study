import { prisma } from "../db/dbConfig.js";
import fileUploadOnCloudinary from "../utility/cloudinary.js";

const addPyq = async (req, res) => {
    try {

      // data coming from frontend
      const {question,unit,examType,examYear,midSemNumber,topic,subjectCode,repeated,marks,collegeYear,branch,semester} = req.body;
  
      // console.log(
      //   question,
      //   unit,
      //   examType,
      //   examYear,
      //   midSemNumber,
      //   topic,
      //   subjectCode,
      //   collegeYear,
      //   repeated,
      //   marks,
      //   branch,
      //   semester
      // );

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
        unit:parseInt(unit),
        examType,
        examYear,
        midSemNumber:parseInt(midSemNumber),
        subjectCode,
        collegeYear:parseInt(collegeYear),
        topic,
        repeated,
        marks:parseInt(marks),
        branch,
        image:"",
        semester:parseInt(semester)
        }
      });
  
      if (!pyq) {
        return res.json({ success: false, message: "pyq is not stored stored" });
      }
  
      // console.log(pyq);
  
      return res.json({ success: true, message: "Question is saved", pyq });
    } catch (error) {
      // console.log(error);
      res.json({
        success: false,
        message: "some error occureed during question save",
        error: error,
      });
    }
};

const findAllPyq = async (req, res) => {
  try {

    let {page , limit , branch , semester} = req.query

    // console.log(page,limit,branch,semester);
    
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 6;

    const skip = (page - 1) * limit;

    const whereClause = {}

    if(semester){
      whereClause.semester = parseInt(semester)
    }

    // console.log(whereClause);
    

    const allPyq = await prisma.pYQ.findMany({
      skip,
      take:limit,
      where:whereClause,
      orderBy: {
        createdAt: "desc",
      },
    })

    if (allPyq) {
      // console.log("saare pyq aa gaye");
      res.status(201).json({ success: true, message: "All pyq's fetched", data: allPyq });
    }
  } catch (error) {
    // console.log("Error occured while fetching all pyq");
    // console.log(error);
    res.json({
      success: false,
      message: "Some error occured while fetching all pyq",
    });
  }
};

const deletePyq = async (req, res) => {
  try {

    const {id} = req.body

    // console.log("id coming from user to delete pyq: ", id)

    const response = await prisma.pYQ.delete({
      where:{
        id
      }
    })

    if(response){
      res.json({success:true,message:"PYQ Successfully Deleted"})
    }
  } catch (error) {
    // console.log("Some thing error occured while deleting PYQ")
    // console.log("error :",error)
    res.json({success:false,message:"Error occured while deleting pyq"})
  }
}

const raisePyqForSolution = async (req,res) => {
  try {

    const {pyqId,userId,username} = req.query

    // console.log(`pyq id coming from fronted for rainsing ${pyqId,userId,username}`);
    
    if(!pyqId){
      return res.status(500).json({
        message:"Need pyq id",
        success:false
      })
    }

    // later we have to update it to on enum value in pYQ model for checking wether is is solved in process or not

    // check wether this raised pyq already exist
    const isThisPyqIsAlreadyRaised = await prisma.raisedPyq.findFirst({
      where:{
        pyqId:parseInt(pyqId)
      }
    })

    if(isThisPyqIsAlreadyRaised){
      return res.status(200).json({
        success:false,
        message:`This PYQ is Already raised by the user ${isThisPyqIsAlreadyRaised?.raisedByUser_NAME}`
      })
    }
    

    // update the field in PYQ model to solving 
    await prisma.pYQ.update({
      where:{
        id:parseInt(pyqId)
      },
      data:{
        solved:"SOLVING"
      }
    })    

    // CREATE NEW RAISED PYQ
    const newRaisedPyq = await prisma.raisedPyq.create({
      data:{
        pyqId:parseInt(pyqId),
        raisedByUser_ID:userId,
        raisedByUser_NAME:username        
      }
    })

    return res.status(201).json({
      success:true,
      message:`Question raised for solution! By the user : ${username}`
    })

  } catch (error) {
    // console.log("Some error occured while raising pyq for solution");
    // console.error(error)
    return res.status(500).json({
      success:false,
      message:"Some error occured while raising pyq for solution",
      error
    })
  }
}

const getAllRaisedPyq = async (req,res) => {
  try {

    // fetch the pyq whose status of solved is flase

    const allRaisedPyq = await prisma.raisedPyq.findMany({
      include:{
        pyq:true,
      },
      where:{
        solved:false
      }
    })

    // console.log(`All raised pyq fetched ${allRaisedPyq}`);
    
    if(allRaisedPyq){
      return res.status(200).json({
        success:true,
        message:"All raised pyq fetched",
        data:allRaisedPyq
     })
    }
  } catch (error) {
    // console.log("Some error occurred while fetching the raised pyq");
    console.error(error)
  }
}

const addSolutionForRaisedPyq = async (req,res) => {
  try {
    const {pyqId,username,userId} = req.query
    const  {solutionText} = req.body
    const file = req.file
    // console.log("File path coming from frontend",file);

    // console.log(pyqId,username,userId);
// 
    // console.log(`Data coming from frontend ${pyqId , userId , username , solutionText}`);
    
    // check the this solution exist or not 
    // if exist then send response that this solution already exist
    // then firstly create a solution for that provided details 
    // change the status of the PYQ model to SOLVED
    // change the status of raisedPyq model to true 

    // check for exisitance of solution
    const isSolutionExist = await prisma.solution.findFirst({
      where:{
        pyqId:parseInt(pyqId)
      }
    })

    if(isSolutionExist){
      return res.status(200).json({
        success:false,
        message:`This Solution Already Exist Provided by the user : ${isSolutionExist.solvedByUser_NAME}`
      })
    }

    // If image is provided along with solution then upload it to cloudinary

    let solutionImageURL = ""

    if(file?.path){
      const result = await fileUploadOnCloudinary(file?.path)
      if(result?.url){
        solutionImageURL = result?.url
      }
    }

    // create new solution
    const newSolutionByUser = await prisma.solution.create({
      data:{
       pyqId:parseInt(pyqId),
       solvedByUser_ID:userId,
       solvedByUser_NAME:username ,
       solutionText,
       solutionImage:solutionImageURL
      }
    })

    // update solved field in PYQ model
    const fieldUpdatedInPYQModel = await prisma.pYQ.update({
      where:{
        id:parseInt(pyqId)
      },
      data:{
        solved:"SOLVED"
      }
    })

    // update solved field in raisedPyq model
    const fieldUpdatedInRaisedPYQModel = await prisma.raisedPyq.update({
      where:{
        pyqId:parseInt(pyqId)
      },
      data:{
        solved:true
      }
    })

    if(newSolutionByUser && fieldUpdatedInPYQModel && fieldUpdatedInRaisedPYQModel){
      return res.status(201).json({
        success:true,
        message:`Congratulation!! a solution is added by the user ${username}`
      })
    }

  } catch (error) {
    // console.log(`Error occurred while providing a solution of a question : ${error}`);
    return res.status(500).json({
      success:false,
      message:"Error occurred while providing a solution",
      error
    })
  }
}

const getSolution = async (req,res) => {
  try {
    const {pyqId} = req.query

    const solution = await prisma.solution.findFirst({
      where:{
        pyqId:parseInt(pyqId)
      },
      include:{
        pyq:true
      }
    })

    return res.status(200).json({
      success:true,
      message:"Solution fetched",
      data:solution
    })

  } catch (error) {
    // console.log("Some error occured while fetching solution");
    // console.error(error);
    return res.status(500).json({
      success:false,
      message:"Some error occured while fetching solution",
      error
    })
  }
}

export {addPyq , findAllPyq , deletePyq , raisePyqForSolution , getAllRaisedPyq , addSolutionForRaisedPyq , getSolution}