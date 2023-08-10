"use client";
import React from "react";
import { usePathname } from "next/navigation";

const page = () => {
  const boardURL = usePathname();
  const parts = boardURL.split("/");
  const boardId = parts[parts.length-1]

  return <div>{boardId}</div>;
};

export default page;
