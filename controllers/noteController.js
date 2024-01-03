import Note from '../models/noteModel.js';

const getAllNotesController = async (req, res) => {
    try {
        const notes = await Note.find();
        return res.status(200).json({
            success: true,
            notes
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getSpecificNoteController = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findOne({ _id: noteId });
        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found." });
        }
        else {
            return res.status(200).json({
                success: true,
                note
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const createNewNoteController = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(req.body);
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Note title or description is missing."
            });
        }
        else {
            const note = await Note.create(req.body);
            return res.status(200).json({
                success: true,
                note
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const updateNoteController = async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, description } = req.body;
        const note = await Note.findOne({ _id: noteId });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        else if (!title || !description) {
            return res.status(400).json({ message: "Note title or description is missing." });
        }
        else {
            const updatedProduct = await Note.findByIdAndUpdate(noteId, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });
    
            return res.status(200).json({
                success: true,
                updatedProduct
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const deleteNoteController = async (req, res) => {
    try {
        const noteId = req.params.id;
    
        const note = await Note.findOne({ _id: noteId });
        if (!note) {
            return res.status(404).json({ message: "Note not found." });
        }
        else {
            await Note.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: "Note Deleted Successfully" });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export { getAllNotesController, getSpecificNoteController, createNewNoteController, updateNoteController, deleteNoteController };