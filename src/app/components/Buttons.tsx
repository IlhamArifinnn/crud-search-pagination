"use client";

import Link from "next/link";
import { IoAddSharp, IoPencil, IoTrashOutline } from "react-icons/io5";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { DeleteContact } from "../lib/actions";
import Swal from "sweetalert2";

export const CreateButton = () => {
  return (
    <Link
      href="/contacts/create"
      className="inline-flex items-center space-x-1 text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded text-sm"
    >
      <IoAddSharp size={20} />
      Create
    </Link>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/contacts/edit/${id}`}
      className="rounded border p-1 hover:bg-yellow-200"
    >
      <IoPencil size={20} />
    </Link>
  );
};

export const DeleteButton = ({ id }: { id: string }) => {
  const DeleteContactWithId = DeleteContact.bind(null, id);

  return (
    <form action={DeleteContactWithId} onSubmit={(e) => e.preventDefault()}>
      <button
        type="button" // penting! jangan biarkan default submit
        className="rounded border p-1 hover:bg-red-200"
        onClick={() => {
          Swal.fire({
            title: "Apakah kamu yakin menghapus data ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus!",
            cancelButtonText: "Batal!",
          }).then((result) => {
            if (result.isConfirmed) {
              // jalankan aksi delete manual
              DeleteContactWithId();
              Swal.fire({
                title: "Hapus!",
                text: "Data berhasil dihapus.",
                icon: "success",
              });
            }
          });
        }}
      >
        <IoTrashOutline size={20} />
      </button>
    </form>
  );
};

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  const className = clsx(
    "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded text-sm w-full px-5 py-3 text-center",
    {
      "opacity-50 cursor-progress": pending,
    }
  );

  return (
    <button type="submit" className={className} disabled={pending}>
      {label === "Save" ? (
        <span>{pending ? "Saving..." : "Save"}</span>
      ) : (
        <span>{pending ? "Updating..." : "Update"}</span>
      )}
    </button>
  );
};
