"use client";
import { IssuesFilterList } from "@/lib/utils/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "react-bootstrap";

const FilterIssuesStatus = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    params.set("status", e.target.value);
    params.delete("page");
    router.push("?" + params.toString());
  };
  return (
    <Form.Select className="w-auto" size="sm" onChange={handleChange}>
      {IssuesFilterList.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default FilterIssuesStatus;
