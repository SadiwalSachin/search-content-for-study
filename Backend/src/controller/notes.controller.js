import { Notes } from "../model/notes.model.js";
import { fileUploadOnCloudinary } from "../utility/cloudinary.js";

const createNotes = async (req, res) => {
  try {
    // userId of user coming from auth middleware
    const userId = req.user._id;
    // Data coming from user in req.body
    const { unit, branch, subject } = req.body;

    if ([unit, branch, subject].some((item) => item === "")) {
      console.log("Data coming from user is empty");
      return res.json({ success: false, message: "Fileds are required" });
    }

    console.log(
      "Data coming from user for notes upload :",
      unit,
      branch,
      subject
    );

    console.log(req.file);
    const notesLocalFilePath = req.file?.path;

    if (!notesLocalFilePath) {
      console.log("Error occured while file uploading from frontend");
      return res.json({ success: false, message: "File is required" });
    }

    const notesFileOnCloudinary = await fileUploadOnCloudinary(
      notesLocalFilePath
    );

    console.log("Notes on cloudinary");

    if (!notesFileOnCloudinary) {
      console.log("Some error occured while file uploading on cloudinary");
      return res.json({
        success: false,
        message: "File not uploaded on cloudinary",
      });
    }

    let secureUrl = notesFileOnCloudinary?.url || "";
    if (secureUrl.startsWith('http://')) {
      secureUrl = 'https://' + secureUrl.slice(7);
    }

    const notes = await Notes.create({
      unit: unit,
      branch: branch,
      subject: subject,
      fileLink: secureUrl,
      uploadedBy: userId,
      expirationDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
    });

    if (notes) {
      console.log("Notes successfully created :-", notes);
    }

    if (!notes) {
      console.log("Some error occured while creating notes in db");
      return res.json({ success: false, message: "Notes not created" });
    }

    return res.status(200).json({
      success: true,
      message: "Notes successfully created",
      data: notes,
    });
  } catch (error) {
    console.log("Error occured : ", error);
    console.log(error);
    return res.json({ success: false, message: "Error occured", error: error });
  }
};

const findNotesForApproval = async (req, res) => {
  try {
    //  userId coming from frontend
    const userId = req.user._id;

    const notes = await Notes.find();

    if (!notes) {
      console.log("Notes not found for approval");
      return res.json({
        success: false,
        message: "Notes not found for approval",
      });
    }

    const notesForApproval = notes.filter(
      (item) => !item.approvals.includes(userId)
    );

    if (notesForApproval.length > 0) {
      return res.json({
        success: true,
        message: "Notes for approval found",
        notes: notesForApproval,
      });
    } else {
      console.log("Notes array is empty");
      return res.json({ success: false, message: "Notes array is empty" });
    }
  } catch (error) {
    console.log("Error occured : ", error);
    console.log(error);
    return res.json({ success: false, message: "Error occured", error: error });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const allNotes = await Notes.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "uploadedBy",
          foreignField: "_id",
          as: "user_details",
        },
      },
      {
        $addFields: {
          user_details: {
            $first: "$user_details",
          },
        },
      },
      {
        $project: {
          "user_details.fullName": 1,
          "user_details.section": 1,
          "user_details._id": 1,
          _id: 1,
          branch: 1,
          fileLink: 1,
          subject: 1,
          status: 1,
          unit: 1,
          approvals: 1,
        },
      },
    ]);

    if (allNotes) {
      console.log("All notes finded");
      return res.json({
        success: true,
        notes: allNotes,
        message: "All notes founded",
      });
    }

    if (!allNotes) {
      console.log("Notes not founded");
      return res.json({
        success: false,
        message: "Notes not founded due to some error",
      });
    }
  } catch (error) {
    console.log("Some error occured while founding Notes");
    console.log(error);
    return res.json({
      success: false,
      message: "Error occured while finding all notes",
      error: error,
    });
  }
};

const getIndividualNotes = async (req, res) => {
  try {
    console.log("Data coming from frontend for viewing individual notes");
    const { noteid } = req.body;
    console.log("User viewing individual Notes with notesId : ", noteid);

    const notes = await Notes.findById(noteid);

    console.log(notes);

    if (notes) {
      console.log("Notes founded");
      return res.status(200).json({
        success: true,
        message: "Individual Notes Found",
        notes: notes,
      });
    }

    if (!notes) {
      console.log("Invalid credentials No such notes exist");
      return res.json({
        success: false,
        message: "Notes not founde invalid notesId",
      });
    }
  } catch (error) {
    console.log("Some error occured while trying to find individual notes");
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Some error occured while trying to find individual notes",
      error: error,
    });
  }
};

const approvalByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { noteid } = req.body;

    const notes = await Notes.findById(noteid);

    if (!notes) {
      console.log("No such notes exist invalid noteid");
      return res.json({ success: false, message: "Invalid noteid" });
    }

    if (!notes.approvals.includes(userId)) {
      console.log("This user is now approving this notes");
      notes.approvals.push(userId);
      await notes.save();
      return res.json({ success: true, message: "Notes approved by you" });
    } else {
      console.log("You have already approved this notes");
      return res.json({ success: false, message: "you have already approved" });
    }
  } catch (error) {
    console.log("Some error occured while approving Notes");
    console.log(error);
    return res.json({
      success: false,
      message: "Some error occured while approving Notes",
      error: error,
    });
  }
};

const getNotesByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const notes = await Notes.aggregate([
      {
        $match: {
          uploadedBy: userId,
        },
      },
    ]);

    if (!notes) {
      console.log("Notes has not uploaded by this user yet");
      return res.json({
        success: false,
        message: "User has note uploaded any notes yet",
      });
    }

    console.log("Notes uploadede by users");
    return res.json({
      success: true,
      message: "Notes uploaded by user",
      notes: notes,
    });
  } catch (error) {
    console.log("Some error occured by finding notes uploaded by user");
    console.log(error);
    return res.json({
      success: false,
      message: "Some error occured by finding notes uploaded by user",
      error: error,
    });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const {noteid} = req.body

    const response =  await Notes.findByIdAndDelete(noteid)

    if(!response){
      console.log("Note id not found");
      return res.json({success:false,message:"Invalid noteid"})
    }else{
      console.log("Note deleted");
      return res.json({success:true,message:"Note deleted"})
      
    }
  } catch (error) {
    console.log("Some rror occured while deleting notes");
    return res.json({success:false,message:"Some rror occured while deleting notes",error:error})
  }
}

export {
  createNotes,
  findNotesForApproval,
  getAllNotes,
  getIndividualNotes,
  approvalByUser,
  getNotesByUser,
  deleteNotes
};
