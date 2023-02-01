import React from "react";
import { useNavigate } from "react-router-dom";

export default function Button() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => {
          navigate("/create");
        }}
        className="bg-blue-500 ml-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create
      </button>
    </>
  );
}
