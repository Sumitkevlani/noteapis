import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title for the note."],
        trim: true,
        minLength: [5, "Title must be of at least 5 characters."],
    },
    description: {
        type: String,
        required: [true, "Please enter description for the note."],
        trim: true,
        minLength: [5, "Description must be of at least 20 characters."],
    },
    // createdBy: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "user",
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model("note", noteSchema);
export default Note;