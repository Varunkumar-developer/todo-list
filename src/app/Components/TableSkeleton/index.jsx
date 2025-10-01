"use client";
import React from "react";

const TableSkeleton = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full border-collapse">
        <thead>
          <tr className="border-b-0">
            <th className="w-[20px] p-[6px_12px] border-b-0">
              <div className="h-5 w-5 bg-[#e8e6ff] rounded animate-pulse"></div>
            </th>
            <th className="p-[6px_12px] text-left border-b-0">
              <div className="h-4 w-24 bg-[#e8e6ff] rounded animate-pulse"></div>
            </th>
            <th className="w-[70px] p-[6px_12px] text-left border-b-0">
              <div className="h-4 w-12 bg-[#e8e6ff] rounded animate-pulse"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(4)].map((_, i) => (
            <tr className="border-b-0" key={i}>
              <td className="p-[6px_12px] border-b-0">
                <div className="h-5 w-5 bg-[#e8e6ff] rounded animate-pulse"></div>
              </td>
              <td className="p-[6px_12px] border-b-0">
                <div className="h-4 w-40 bg-[#e8e6ff] rounded animate-pulse"></div>
              </td>
              <td className="p-[6px_12px] border-b-0">
                <div className="flex gap-2 justify-end">
                  <div className="h-5 w-5 bg-[#e8e6ff] rounded-full animate-pulse"></div>
                  <div className="h-5 w-5 bg-[#e8e6ff] rounded-full animate-pulse"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
