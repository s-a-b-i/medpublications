// controllers/memberController.js
import Member from '../models/Member.js';

export const getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members' });
  }
};

export const createMember = async (req, res) => {
  try {
    const { name, role, description, twitter, linkedin } = req.body;
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    const newMember = new Member({
      name,
      role,
      description,
      imageUrl,
      social: { twitter, linkedin },
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating member' });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, description, twitter, linkedin } = req.body;
    const updateData = { name, role, description, social: { twitter, linkedin } };

    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const member = await Member.findByIdAndUpdate(id, updateData, { new: true });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error updating member' });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndDelete(id);

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member' });
  }
};