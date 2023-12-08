"use client";

import { pageSize } from "@/lib/utils/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pagination, Stack } from "react-bootstrap";

const IssuesPagination = ({ issueCount, currentPage = 1 }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const pageCount = Math.ceil(issueCount / pageSize);
  currentPage = currentPage > pageCount ? 1 : currentPage;

  if (pageCount <= 1) return null;
  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(pathname + "?" + params.toString());
    router.refresh();
  };
  return (
    <Stack direction="horizontal">
      <Pagination className="d-flex gap-2 align-items-center ms-auto">
        <span>
          Page {currentPage} of {pageCount}
        </span>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        />
        <Pagination.Next
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        />
        <Pagination.Last
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        />
      </Pagination>
    </Stack>
  );
};

export default IssuesPagination;
