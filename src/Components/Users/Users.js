import React, { useState, useEffect } from "react";
import axios from "axios";
import UserInfo from "../UserInfo/UserInfo";
import UsersTable from "../UsersTable/UsersTable";
import CellStyle from "../../Common/CellStyle/CellStyle";
import moment from "moment";

const Users = (props) => {
  const [rowData, setRowData] = useState([]);
  const [pageState, setPageState] = useState({
    isLoading: false,
    total: 16,
    page: 1,
    pageSize: 8,
  });
  const firstSetOfUsersapi = `https://randomuser.me/api?results=8&page=${pageState.page}`;

  const [dataFilters, setDataFilters] = useState({
    nationality: "",
    gender: "",
  });
  const fetchFirstData = () => {
    let tempApi;
    if (dataFilters.nationality === "" && dataFilters.gender === "") {
      tempApi = firstSetOfUsersapi;
    }
    if (dataFilters.nationality !== "") {
      tempApi = firstSetOfUsersapi.concat(`&nat=${dataFilters.nationality}`);
    }
    if (dataFilters.gender !== "") {
      tempApi = firstSetOfUsersapi.concat(`&gender=${dataFilters.gender}`);
    }
    if (dataFilters.nationality !== "" && dataFilters.gender !== "") {
      tempApi = firstSetOfUsersapi.concat(
        `&nat=${dataFilters.nationality}&gender=${dataFilters.gender}`
      );
    }
    setPageState((old) => ({ ...old, isLoading: true }));
    console.log("tempAPi", tempApi);
    axios({
      method: "get",
      withCredentials: false,
      url: tempApi,
    }).then((response) => {
      setRowData(response.data.results);
      setPageState((old) => ({
        ...old,
        isLoading: false,
      }));
    });
  };
  useEffect(() => {
    fetchFirstData();
  }, [dataFilters, pageState.page, pageState.pageSize]);

  const columns = [
    {
      headerName: "User",
      field: "user",
      minWidth: 120,
      flex: 1,
      renderCell: (params) => {
        return (
          <CellStyle
            avatarSrc={params.row.picture.medium}
            firstValueHeader={params.row.name.first}
            secondValueHeader={params.row.name.last}
            firstValueSubHeader={params.row.location.street.number}
            secondValueSubHeader={params.row.location.street.name}
            thirdValueSubHeader={params.row.location.city}
          />
        );
      },
    },

    {
      headerName: "Contact Information",
      field: "Contact Information",
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <CellStyle
            firstValueHeader={params.row.email}
            firstValueSubHeader={params.row.cell}
          />
        );
      },
    },
    {
      headerName: "Registration Date",
      field: "Registration Date",
      flex: 1,
      renderCell: (params) => {
        return (
          <CellStyle
            firstValueHeader={moment(params.row.registered.date).format("LL")}
            firstValueSubHeader={moment(params.row.registered.date).format(
              "LT"
            )}
          />
        );
      },
    },
    {
      headerName: "Country / Post Code",
      field: "country",
      flex: 1,
      renderCell: (params) => {
        return (
          <CellStyle
            firstValueHeader={params.row.location.country}
            firstValueSubHeader={params.row.location.postcode}
          />
        );
      },
    },
  ];
  return (
    <>
      <UsersTable
        rowData={rowData}
        columns={columns}
        dataFilters={dataFilters}
        setDataFilters={setDataFilters}
        setRowData={setRowData}
        firstSetOfUsersapi={firstSetOfUsersapi}
        pageState={pageState}
        setPageState={setPageState}
      />

      {props.isUserDataDisplayed && (
        <UserInfo
          rowData={rowData}
          firstSetOfUsersapi={firstSetOfUsersapi}
          isUserDataDisplayed={props.isUserDataDisplayed}
        />
      )}
    </>
  );
};
export default Users;
