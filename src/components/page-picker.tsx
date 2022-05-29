import React from "react";
import Pagination from "rc-pagination";
import "../styles/pagination.css";

export default function PagePicker({ numPages, currentPage }: Props) {
  return (
    <Pagination
      current={currentPage}
      total={numPages}
      pageSize={1}
      onChange={(page) => {
        const href = "/pages/" + page;
        location.href = href;
      }}
    />
  );
}

interface Props {
  numPages: number;
  currentPage: number;
}
