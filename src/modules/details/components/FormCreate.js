import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoading,
  saveNewUser,
} from "modules/features/components/user/userSlice";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

const userAccessOptions = [
  {
    label: "Administrators",
    value: "4e4cf51f-b406-413a-ae46-2cf06c7aabff",
  },
  {
    label: "AppTesters",
    value: "edad97c7-f2dc-4198-91a9-8f20c7bc67b2",
  },
  {
    label: "AdminChannelUsers",
    value: "57d3578a-3583-4290-8bae-596a4da81a8d",
  },
];

export default function FormCreate() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      currentPassword: "",
      expiredDate: "",
      groupAccess: "",
    },
  });

  const disptach = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(getLoading);
  const [selectedOptions, setSelectedOptions] = useState([]);

  console.log(selectedOptions, "value select");
  const createNewUser = (data) => {
    console.log(data, "cek data");
    let payload = {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
      currentPassword: data.currentPassword,
      expiredDate: data.expiredDate,
      groupAccess: data.groupAccess.label,
    };
    disptach(saveNewUser(payload))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  const [startDate, setStartDate] = useState(new Date());
  const handleChange = (options) => {
    console.log(options, "option");
    setSelectedOptions(options);
  };
  return (
    <>
      <h1 className="flex items-center justify-center ">Create A New User</h1>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <legend>* All field are required.</legend>
          <form onSubmit={handleSubmit(createNewUser)}>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    for="fName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First Name
                  </label>
                  <Controller
                    control={control}
                    name="firstname"
                    render={({ field }) => (
                      <input
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        type="text"
                        placeholder="First Name"
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    for="lName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Last Name
                  </label>
                  <Controller
                    control={control}
                    name="lastname"
                    render={({ field }) => (
                      <input
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        type="text"
                        placeholder="Last Name"
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                for="guest"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Username
              </label>
              <Controller
                control={control}
                name="username"
                render={({ field }) => (
                  <input
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    type="text"
                    placeholder="Username"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mb-5">
              <label
                for="guest"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Email
              </label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <input
                    className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    type="text"
                    placeholder="email"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    for="fName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Password
                  </label>
                  <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                      <input
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        type="text"
                        placeholder="Password"
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    for="lName"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Confirm
                  </label>
                  <Controller
                    control={control}
                    name="currentPassword"
                    render={({ field }) => (
                      <input
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        type="text"
                        placeholder="Confirm"
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    for="date"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Expired Date
                  </label>
                  <Controller
                    control={control}
                    name="expiredDate"
                    render={({ field }) => (
                      <input
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        type="date"
                        placeholder="Confirm"
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                Group Access
              </label>

              <Controller
                control={control}
                name="groupAccess"
                render={({ field }) => (
                  <Select
                    {...field}
                    closeMenuOnSelect={false}
                    options={userAccessOptions}
                  />
                )}
              />
            </div>

            <div>
              <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
