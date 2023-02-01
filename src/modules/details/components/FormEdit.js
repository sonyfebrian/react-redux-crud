import React from "react";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import {
  getUserById,
  getLoading,
  updateUser,
} from "modules/features/components/user/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

export default function FormEdit() {
  const { id } = useParams();
  const itemToEdit = useSelector(getUserById(Number(id)));
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      firstname: itemToEdit.firstname,
      lastname: itemToEdit.lastname,
      username: itemToEdit.username,
      email: itemToEdit.email,
      password: itemToEdit.password,
      currentPassword: itemToEdit.currentPassword,
      expiredDate: itemToEdit.expiredDate,
      groupAccess: itemToEdit.groupAccess,
    },
  });

  const disptach = useDispatch();
  const navigate = useNavigate();
  const apiStatus = useSelector(getLoading);

  const updateUserForm = (data) => {
    let payload = {
      id: Number(id),
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
      currentPassword: data.currentPassword,
      expiredDate: data.expiredDate,
      groupAccess: data.groupAccess.label,
    };
    disptach(updateUser(payload))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(updateUserForm)}>
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold mb-6 text-xl text-gray-600">
                Update User
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
                              {...register("firstname")}
                              {...field}
                            />
                          )}
                        />
                      </div>
                      {errors.firstname ? (
                        <span className="text-red-900">
                          {errors.firstname.message}
                        </span>
                      ) : (
                        <></>
                      )}
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
                              {...register("lastname")}
                              {...field}
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
                            render={({ field, value }) => (
                              <>
                                <Select
                                  {...field}
                                  value={field.value}
                                  isClearable={true}
                                  closeMenuOnSelect={true}
                                  options={userAccessOptions}
                                />
                              </>
                            )}
                          />
                        </div>
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            disabled={apiStatus === "pending"}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            {apiStatus === "pending"
                              ? "Updating........."
                              : "Update"}
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
      {/* <h1 className="flex items-center justify-center ">Update A New User</h1>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <legend>* All field are required.</legend>
          <form onSubmit={handleSubmit(updateUserForm)}>
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
              <button
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                disabled={apiStatus === "pending"}
              >
                {apiStatus === "pending" ? "Updating........." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
}
