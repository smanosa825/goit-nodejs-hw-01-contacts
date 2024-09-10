import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

// contactsPath constructs the path to the contacts.json file where the contact data is stored.
const contactsPath = path.join("db", "contacts.json");
console.log(contactsPath);

// This function reads the contacts from the contacts.json file.
// It uses fs.readFile to read the file asynchronously.
// The content is parsed from JSON format to a JavaScript object.
const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.error("Error reading contacts:", error.message);
  }
};

// This function retrieves a contact by its id.
// It first fetches all contacts using listContacts.
// It then searches for a contact with the specified id.
// If found, it returns the contact; otherwise, it returns null.
const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    return result || null;
  } catch (error) {
    console.error("Error reading contacts by id:", error.message);
  }
};

// This function removes a contact by its id.
// It fetches all contacts and finds the index of the contact to be deleted.
// If the contact is not found, it returns null.
// Otherwise, it removes the contact from the array using splice and writes the updated list back to the file.
const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const deletedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
  } catch (error) {
    console.error("Error removing contact:", error.message);
  }
};

// It generates a new unique ID for the contact using nanoid.
// It creates a new contact object and adds it to the existing list.
// The updated list is then written back to the contacts.json file.
// The new contact is returned.
const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const allContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error adding new contact:", error.message);
  }
};

export { listContacts, getContactById, removeContact, addContact };
