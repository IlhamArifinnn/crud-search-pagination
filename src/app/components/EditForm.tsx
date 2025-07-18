"use client";

import { UpdateContact } from "../lib/actions";
import { useActionState } from "react";
import { SubmitButton } from "./Buttons";

// Define the Contact type manually (matching database schema)
type Contact = {
  id: string;
  name: string | null;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

const UpdateForm = ({ contact }: { contact: Contact }) => {
  const UpdateContactWithId = UpdateContact.bind(null, contact.id);
  const [state, formAction] = useActionState(UpdateContactWithId, null);

  return (
    <form action={formAction}>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Full Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          placeholder="Full Name..."
          defaultValue={contact.name || ""}
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.Error?.name}</p>
        </div>
      </div>

      <div className="mb-5">
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-800 mb-1"
        >
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
          placeholder="Phone Number..."
          defaultValue={contact.phone}
        />
        <div id="phone-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state?.Error?.phone}</p>
        </div>
      </div>

      <div id="message-error" aria-live="polite" aria-atomic="true">
        <p className="mt-2 text-sm text-red-500">{state?.message}</p>
      </div>

      <SubmitButton label="Update" />
    </form>
  );
};

export default UpdateForm;
