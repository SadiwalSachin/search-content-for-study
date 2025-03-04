import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { approvalByUser, createNotes, deleteNotes, findNotesForApproval, getAllNotes, getIndividualNotes, getNotesByUser } from "../controller/notes.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const notesRoute = Router()

notesRoute.route("/addnotes").post(verifyJWT,upload.single("fileLink"),createNotes)
notesRoute.route("/getallnotes").post(verifyJWT,getAllNotes)
notesRoute.route("/notesforapproval").post(verifyJWT,findNotesForApproval)
notesRoute.route("/getindividualnotes").post(verifyJWT,getIndividualNotes)
notesRoute.route("/approval").post(verifyJWT,approvalByUser)
notesRoute.route("/getnotesbyuser").post(verifyJWT , getNotesByUser)
notesRoute.route("/deletenotes").post(verifyJWT,deleteNotes)

export {notesRoute}