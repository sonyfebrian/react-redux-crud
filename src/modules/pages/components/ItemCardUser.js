import React, { useEffect, useMemo } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getLoading,
  allUsersLoading,
  allUsersRecieved,
} from "modules/features/components/user/userSlice";
import Spinner from "modules/common/components/Spinner";
import { useTable } from "react-table";
import UserTable from "./table/UserTable";

export default function ItemCardUser() {
  const allUsers = useSelector(getAllUsers);
  const apiStatus = useSelector(getLoading);
  const dispatch = useDispatch();
  let contentToRender = "";

  useEffect(() => {
    const invokeAllUsersAPI = async () => {
      dispatch(allUsersLoading());
      const apiResponse = await axios.get("http://localhost:4000/users");
      dispatch(allUsersRecieved(apiResponse.data));
    };

    invokeAllUsersAPI();
  }, [dispatch]);

  //tabel
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Status",
        accessor: "published",
        Cell: (props) => {
          return props.value ? "Published" : "Pending";
        },
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: allUsers,
    });
  return (
    <div>
      {allUsers.map((item) => (
        <>
          <li>{item.lastname}</li>
        </>
      ))}
      <UserTable />
      <table
        className="table table-striped table-bordered"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
