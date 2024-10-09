import express from 'express';
import multer from 'multer';
import { protect, admin } from '../middleware/auth.js';
import { storage } from '../config/cloudinary.js';
import {
  getPublications,
  createPublication,
  updatePublication,
  deletePublication,
} from '../controllers/publicationController.js';
import {
  getMembers,
  createMember,
  updateMember,
  deleteMember,
} from '../controllers/memberController.js';

const router = express.Router();
const upload = multer({ storage });

router.get('/publications', getPublications);
router.post('/publications', protect, admin, upload.single('file'), createPublication);
router.put('/publications/:id', protect, admin, updatePublication);
router.delete('/publications/:id', protect, admin, deletePublication);


router.get('/members', getMembers);
router.post('/members', protect, admin, upload.single('image'), createMember);
router.put('/members/:id', protect, admin, upload.single('image'), updateMember);
router.delete('/members/:id', protect, admin, deleteMember);


export default router;