import cron from "node-cron";
import { Notes } from "./model/notes.model.js";

const deleteNotesAfter3Days = () => {
  cron.schedule("0 0 * * *", async () => {
    // This runs every day at midnight
    try {
      const expiredNotes = await Notes.deleteMany({
        status: "pending",
        expirationDate: { $lt: Date.now() }, // Delete notes past their expiration date
      });
      console.log(expiredNotes);
      console.log(`${expiredNotes.deletedCount} expired notes deleted`);
    } catch (error) {
      console.error("Error deleting expired notes:", error);
    }
  });
};

export default deleteNotesAfter3Days


