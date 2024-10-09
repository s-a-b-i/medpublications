import Publication from '../models/Publication.js';

export const getPublications = async (req, res) => {
  try {
    const publications = await Publication.find().sort({ createdAt: -1 });
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching publications' });
  }
};

export const createPublication = async (req, res) => {
    try {
      console.log(req.file); // Check if the file is properly uploaded
      const { title, description } = req.body;
      const fileUrl = req.file?.path;  // Check if file exists
      const fileType = req.file?.mimetype;
      
      if (!fileUrl || !fileType) {
        return res.status(400).json({ message: 'File upload failed' });
      }

      const isPdf = fileType === 'application/pdf';
  
      const newPublication = new Publication({
        title,
        description,
        fileUrl,
        fileType: isPdf ? 'PDF' : 'image',
      });
  
      await newPublication.save();
      res.status(201).json(newPublication);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating publication' });
    }
  };
  

export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const publication = await Publication.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    res.json(publication);
  } catch (error) {
    res.status(500).json({ message: 'Error updating publication' });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findByIdAndDelete(id);

    if (!publication) {
      return res.status(404).json({ message: 'Publication not found' });
    }

    res.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting publication' });
  }
};