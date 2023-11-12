const asyncHandler = require(`express-async-handler`);

//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler((req, res) => {
  res.status(200).json({ message: "Get All contacts", firstName: "Jason" });
});

//@desc create a contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler((req, res) => {
  console.log(`The request body is `, req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }

  res.status(201).json({
    message: `Get the contact for ${req.params.id}`,
    firstName: "Jason",
  });
});

//@desc get a contact
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler((req, res) => {
  res.status(201).json({
    message: `Get the contact for ${req.params.id}`,
    firstName: "Jason",
  });
});

//@desc update a contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler((req, res) => {
  res.status(200).json({
    message: `Update the contact for ${req.params.id}`,
    firstName: "Jason",
  });
});

//@desc delete a contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = async (req, res) => {
  res.status(200).json({
    message: `Delete contact for ${req.params.id}`,
    firstName: "Jason",
  });
};

module.exports = {
  deleteContact,
  updateContact,
  getContacts,
  createContact,
  getContact,
};
