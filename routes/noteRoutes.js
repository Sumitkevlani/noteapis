import express from 'express';
import Note from '../models/noteModel.js';
import isAuthenticatedUser from '../middleware/authentication.js';
import { getAllNotesController, getSpecificNoteController, createNewNoteController, updateNoteController, deleteNoteController } from '../controllers/noteController.js';
const router = express.Router();


router.get('/get-notes', getAllNotesController);

router.get('/get-note/:id', getSpecificNoteController);

router.post('/create-note', isAuthenticatedUser, createNewNoteController);

router.put('/update-note/:id', isAuthenticatedUser, updateNoteController);

router.delete('/delete-note/:id', isAuthenticatedUser, deleteNoteController);

export default router;