import { PYQ } from "../model/pyq.model.js";
import { fileUploadOnCloudinary } from "../utility/cloudinary.js";

const searchPYQ = async (req, res) => {
  const { query } = req.body;
  console.log("query from user is : ", query);

  try {
    const results = await PYQ.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    console.log("results after sorting : ", results);

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "An error occurred during search" });
  }
};

const addPyq = async (req, res) => {
  try {
    // data coming from frontend
    const {
      question,
      unit,
      examType,
      examYear,
      midSemNumber,
      topic,
      subjectCode,
      repeated,
      marks,
      collegeYear,
      branch
    } = req.body;

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

    // validation for empty field
    if (
      [
        question,
        unit,
        examType,
        subjectCode,
        topic,
        repeated,
        marks,
        collegeYear,
      ].some((item) => !item || item.trim() === "")
    ) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const checkPyq = await PYQ.find({ question });

    if (checkPyq) {
    }
    // local filepath of the file which comefrom the multer middleware
    const localFilePath = req.file?.path;

    console.log("local file Path : ", localFilePath);

    // file uploading on cloudinary
    const questionImageonCloudinary = await fileUploadOnCloudinary(
      localFilePath
    );

    console.log(questionImageonCloudinary);

    if (!questionImageonCloudinary) {
      console.log("image not uploaded on cloudinary");
    }

    // creating question
    const pyq = await PYQ.create({
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
      image: questionImageonCloudinary ? questionImageonCloudinary.url : "",
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
    const allPyq = await PYQ.find();

    if (allPyq) {
      console.log("saare pyq aa gaye");
      res.json({ success: true, message: "All pyq are there", data: allPyq });
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

const findEditingPyq = async (req, res) => {
  try {
    const { id } = req.body;

    console.log("id coming from user", id);

    if (!id) {
      res.json({ success: false, message: "Id is not there for editing pyq" });
    }

    const editingPyq = await PYQ.findById(id).select(
      "-createdAt -updatedAt -__v -_id"
    );

    console.log(editingPyq);

    if (editingPyq) {
      res.json({
        success: true,
        message: "Pyq finded for editing",
        data: editingPyq,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Some error occured while fetching pyq for editing",
      error: error,
    });
  }
};

const editPyq = async (req, res) => {
  try {
    const {
      question,
      unit,
      examType,
      examYear,
      midSemNumber,
      topic,
      subjectCode,
      repeated,
      marks,
      collegeYear,
      id,
    } = req.body;

    if (!id) {
      return res.json({ success: false, message: "ID is required" });
    }

    // Build the update object dynamically
    const updateFields = {};

    if (question) updateFields.question = question;
    if (unit) updateFields.unit = unit;
    if (examType) updateFields.examType = examType;
    if (examYear) updateFields.examYear = examYear;

    // Ensure midSemNumber is a valid number before adding it to updateFields
    if (midSemNumber !== undefined && midSemNumber !== null && !isNaN(Number(midSemNumber))) {
      updateFields.midSemNumber = Number(midSemNumber);
    }

    if (topic) updateFields.topic = topic;
    if (subjectCode) updateFields.subjectCode = subjectCode;
    if (repeated) updateFields.repeated = repeated;
    if (marks) updateFields.marks = marks;
    if (collegeYear) updateFields.collegeYear = collegeYear;

    // If an image is uploaded, handle the upload
    if (req.file) {
      const localFilePath = req.file.path;
      const uploadedImage = await fileUploadOnCloudinary(localFilePath);
      const imageUrl = uploadedImage ? uploadedImage.url : "";
      if (imageUrl) updateFields.image = imageUrl;
    }

    // Update the question details in the database
    const updatedPyq = await PYQ.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedPyq) {
      return res.json({ success: false, message: "Failed to update the question" });
    }

    return res.json({ success: true, message: "Question updated successfully", pyq: updatedPyq });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occurred during question update", error });
  }
};

const deletePyq = async (req, res) => {
  const {id} = req.body

  console.log("id coming from user to delete pyq: ", id)

  try {
    const response = await PYQ.findByIdAndDelete(id)
    if(response){
      res.json({success:true,message:"PYQ Successfully Deleted"})
    }
  } catch (error) {
    console.log("Some thing error occured while deleting PYQ")
    console.log("error :",error)
    res.json({success:false,message:"Error occured while deleting pyq"})
  }
}

export { searchPYQ, addPyq, findAllPyq, findEditingPyq, editPyq , deletePyq };
