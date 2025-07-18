import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-1 mt-2 w-50 mx-auto">
      <h1 className="text-2xl text-red-400 text-center font-medium">
        Home page
      </h1>
      <Link
        href="/contacts"
        className="bg-gray-200 mt-2 p-3 rounded text-center"
      >
        Go to Contact
      </Link>
    </div>
  );
}
