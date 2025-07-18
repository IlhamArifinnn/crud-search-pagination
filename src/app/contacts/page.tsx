import { getContactPages } from "../lib/data";
import { CreateButton } from "../components/Buttons";
import ContactTable from "../components/ContactTable";
import Paginations from "../components/Paginations";
import Search from "../components/Search";
import { Suspense } from "react";
import { TableSkeleton } from "../components/Skeleton";

const Contacts = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getContactPages(query);

  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex items-center justify-between gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <ContactTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Paginations totalPages={totalPages} />
      </div>
    </div>
  );
};

export default Contacts;
