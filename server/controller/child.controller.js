import Child from "../models/child.model.js";

// @desc    Add a new child profile
// @route   POST /api/children
export const addChild = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      dateOfBirth, 
      gender, 
      genotype, 
      bloodGroup, 
      allergies, 
      medicalHistory 
    } = req.body;


    // The 'parent' field comes from the logged-in user's ID
    const child = await Child.create({
      parent: req.user._id || req.user.id,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      genotype,
      bloodGroup,
      allergies,
      medicalHistory
    });

    res.status(201).json({
      status: 'success',
      data: child
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'fail',
      message: error.message 
    });
  }
};

// @desc    Get all children for the logged-in parent
// @route   GET /api/children
export const getChildren = async (req, res) => {
  try {
    // Only find children belonging to this parent
    const children = await Child.find({ parent: req.user._id || req.user.id }).sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: children.length,
      data: children
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: "Server error fetching children" 
    });
  }
};