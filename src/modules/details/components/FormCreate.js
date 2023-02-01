import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoading,
  saveNewUser,
} from "modules/features/components/user/userSlice";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "modules/features/components/formSchema";
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
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
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
    resolver: yupResolver(registerSchema),
  });

  const disptach = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(getLoading);

  const createNewUser = (data) => {
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

  return (
    <>
      <form onSubmit={handleSubmit(createNewUser)}>
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold mb-6 text-xl text-gray-600">
                Create User
              </h2>

              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">Personal Details</p>
                    <p>Please fill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-3">
                        <label htmlFor="fName">First Name</label>
                        <Controller
                          control={control}
                          name="firstname"
                          render={({ field }) => (
                            <input
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              type="text"
                              placeholder="First Name"
                              {...field}
                              {...register("firstname")}
                            />
                          )}
                        />
                        {errors.firstname ? (
                          <span className="text-red-900">
                            {errors.firstname.message}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="lName">Last Name</label>
                        <Controller
                          control={control}
                          name="lastname"
                          render={({ field }) => (
                            <input
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              type="text"
                              placeholder="Last Name"
                              {...field}
                              {...register("lastname")}
                            />
                          )}
                        />
                        {errors.lastname ? (
                          <span className="text-red-900">
                            {errors.lastname.message}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="username">Username</label>
                        <Controller
                          control={control}
                          name="username"
                          render={({ field }) => (
                            <input
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              type="text"
                              placeholder="Username"
                              {...field}
                              {...register("username")}
                            />
                          )}
                        />
                        {errors.username ? (
                          <span className="text-red-900">
                            {errors.username.message}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">Email Address</label>

                        <Controller
                          control={control}
                          name="email"
                          render={({ field }) => (
                            <input
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              type="text"
                              placeholder="email@domain.com"
                              {...field}
                              {...register("email")}
                            />
                          )}
                        />
                        {errors.email ? (
                          <span className="text-red-900">
                            {errors.email.message}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="password">Password</label>

                        <Controller
                          control={control}
                          name="password"
                          render={({ field }) => (
                            <input
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              type="text"
                              {...register("password")}
                              placeholder="Password"
                              {...field}
                            />
                          )}
                        />
                        {errors.password ? (
                          <span className="text-red-900">
                            {errors.password.message}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="currentPassword">
                          Confirm Password
                        </label>

                        <Controller
                          control={control}
                          name="currentPassword"
                          render={({ field }) => (
                            <input
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              type="text"
                              {...register("currentPassword")}
                              placeholder="Confirm Password"
                              {...field}
                            />
                          )}
                        />
                        {errors.currentPassword ? (
                          <span className="text-red-900">
                            {errors.currentPassword.message}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="date"> Expired Date</label>
                        <Controller
                          control={control}
                          name="expiredDate"
                          render={({ field }) => (
                            <input
                              className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                              type="date"
                              placeholder="Confirm"
                              {...register("expiredDate")}
                              {...field}
                            />
                          )}
                        />
                        {errors.expiredDate ? (
                          <span className="text-red-900">
                            {errors.expiredDate.message}
                          </span>
                        ) : (
                          <></>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label>Group Access</label>
                        <div className="h-10 border mt-1 rounded  w-full bg-gray-50">
                          <Controller
                            control={control}
                            name="groupAccess"
                            {...register("groupAccess")}
                            render={({ field }) => (
                              <Select
                                {...field}
                                isClearable={true}
                                closeMenuOnSelect={true}
                                options={userAccessOptions}
                              />
                            )}
                          />
                          {errors.groupAccess ? (
                            <span className="text-red-900">
                              {errors.groupAccess.message}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            disabled={apiStatus === "pending"}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            {apiStatus === "pending"
                              ? "Loading........."
                              : "Save"}
                          </button>
                        </div>
                        <div className="inline-flex items-end">
                          <button
                            onClick={() => {
                              navigate("/");
                            }}
                            className="bg-blue-500 ml-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Back
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
