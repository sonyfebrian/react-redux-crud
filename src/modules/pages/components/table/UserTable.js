import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getLoading,
  deleteUser,
  fetchALLUsers,
} from "modules/features/components/user/userSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "modules/common/components/Spinner";
import "./table.css";
import Button from "modules/common/components/Button";
import ModalDeleteConfirmation from "modules/common/components/ModalDeleteConfirmation";
import Pagination from "modules/common/components/Pagination";

export default function UserTable() {
  const allUsers = useSelector(getAllUsers);
  const apiStatus = useSelector(getLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(0);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = allUsers.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Modal Delete
  const openDeleteModalHandler = (id) => {
    setShowModal(true);
    setItemToDeleteId(id);
  };
  const hideDeleteModalHandler = () => {
    setShowModal(false);
    setItemToDeleteId(0);
  };
  const confirmDeleteModalHandler = () => {
    dispatch(deleteUser(itemToDeleteId))
      .unwrap()
      .then(() => {
        setShowModal(false);
        setItemToDeleteId(0);
      });
  };

  useEffect(() => {
    dispatch(fetchALLUsers());
  }, [dispatch]);

  //Search Input
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = currentPost.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(currentPost);
    }
  };
  return (
    <>
      {apiStatus === "pending" ? (
        <Spinner />
      ) : (
        <>
          {showModal ? (
            <ModalDeleteConfirmation
              title="Are you sure you want to delete this account?"
              content="Are you sure you want to delete this account?"
              showModal={showModal}
              apiStatus={apiStatus}
              hideDeleteModalHandler={hideDeleteModalHandler}
              confirmDeleteModalHandler={confirmDeleteModalHandler}
            />
          ) : null}

          <div class="flex justify-center mt-5 ">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => searchItems(e.target.value)}
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
            <div className="ml-80">
              <Button />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="col-span-12">
              <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                <thead className="text-white">
                  {currentPost.map((index) => (
                    <>
                      <tr
                        key={index}
                        className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
                      >
                        <th className="p-3 text-left">First Name</th>
                        <th className="p-3 text-left">Last Name</th>
                        <th className="p-3 text-left">Username</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Expired Date</th>
                        <th className="p-3 text-left">Group Access</th>
                        <th className="p-3 text-left">Action</th>
                      </tr>
                    </>
                  ))}
                </thead>
                <tbody className="flex-1 sm:flex-none">
                  {searchInput.length > 1 ? (
                    filteredResults.map((item, i) => (
                      <>
                        <tr
                          key={i}
                          className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                        >
                          <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                            {item.firstname}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                            {item.lastname}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                            {item.username}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                            {item.email}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                            {item.expiredDate}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                            {item.groupAccess}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-100 p-3">
                            <div class="flex item-center justify-between">
                              <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <button
                                  onClick={() => {
                                    navigate(`/edit-user/${item.id}`);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                  </svg>
                                </button>
                              </div>
                              <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <span
                                  onClick={() => {
                                    openDeleteModalHandler(item.id);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))
                  ) : (
                    <>
                      {currentPost.map((item, i) => (
                        <>
                          <tr
                            key={i}
                            className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                          >
                            <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                              {item.firstname}
                            </td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                              {item.lastname}
                            </td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                              {item.username}
                            </td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                              {item.email}
                            </td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                              {item.expiredDate}
                            </td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                              {item.groupAccess}
                            </td>
                            <td className="border-grey-light border hover:bg-gray-100 p-3">
                              <div class="flex item-center justify-between">
                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <span
                                    onClick={() => {
                                      navigate(`/edit-user/${item.id}`);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                      />
                                    </svg>
                                  </span>
                                </div>
                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                  <span
                                    onClick={() => {
                                      openDeleteModalHandler(item.id);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex item-center justify-center">
            <Pagination
              postPerPage={postPerPage}
              totalPosts={allUsers.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </>
  );
}
