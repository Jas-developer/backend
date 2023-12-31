const asyncHandler = require(`express-async-handler`);
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@desc create a contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log(`The request body is `, req.body);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // create a contact
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

//@desc get a contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(201).json(contact);
});

//@desc update a contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permetions to update other contacts");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updateContact);
});

//@desc delete a contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permetions to delete other contacts");
  }

  await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json(contact);
});

module.exports = {
  deleteContact,
  updateContact,
  getContacts,
  createContact,
  getContact,
};
