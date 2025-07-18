import UpdateForm from "@/app/components/EditForm";
import { getContactById } from "../../../lib/data";
import { notFound } from "next/navigation";

// Define the Contact type to match your database schema
type Contact = {
  id: string;
  name: string | null;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
};

const UpdateContactPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const contact: Contact | null = await getContactById(id);

  if (!contact) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Contact</h1>
      <UpdateForm contact={contact} />
    </div>
  );
};

export default UpdateContactPage;
