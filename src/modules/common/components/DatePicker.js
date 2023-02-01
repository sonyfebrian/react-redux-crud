import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerCustom() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div>
      {" "}
      <DatePicker value={startDate} onChange={(date) => setStartDate(date)} />
    </div>
  );
}
