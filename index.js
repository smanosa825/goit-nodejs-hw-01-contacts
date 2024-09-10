import {
  getContactById,
  listContacts,
  removeContact,
  addContact,
} from "./contacts.js";

import { Command } from "commander";

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: refactor
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactsById = await getContactById(id);
      console.log(contactsById);
      break;

    case "add":
      const addNewContact = await addContact({ name, email, phone });
      console.log(addNewContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
// node index.js --action list
// this would list all the contacts in the console

// node index.js --action get --id 05olLMgyVQdWRwgKfg5J6
// this would  get a specific contact and print it in the console

// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
// this would add a new contact to the contacts.json

// node index.js --action remove --id qdggE76Jtbfd9eWJHrssH
// this would remove a contact from the contacts.json
