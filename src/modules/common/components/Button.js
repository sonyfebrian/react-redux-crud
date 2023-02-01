import React from "react";
import { useNavigate } from "react-router-dom";

export default function Button() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="mt-4 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white py-2 rounded-md text-lg font-semibold"
        type="button"
        onClick={() => {
          navigate("/create");
        }}
      >
        Create
      </button>
    </div>
  );
}
