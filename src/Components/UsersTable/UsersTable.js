import React, { useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import FilterLine from "../FilterLine/FilterLine";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import { Pagination } from "@material-ui/lab";
import { DataGrid } from "@mui/x-data-grid";
import { PeopleSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  tableroot: {
    "&.MuiPaper-root": {
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75);",
      width: "80%",
      height: "84%",
      margin: "100px 30px 30px 270px",
      [theme.breakpoints.down("sm")]: {
        margin: "20px 20px 20px 20px",
        width: "90%",
        height: "90%",
      },
      boxShadow: "none",
      color: theme.pallette.secondary.main,
    },
    "& .MuiDataGrid-iconSeparator": {
      display: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      borderBottom: `2px solid ${theme.pallette.secondary.light}`,
      color: theme.pallette.secondary.main,
    },
    "& .MuiDataGrid-root": {
      border: `3px solid ${theme.pallette.secondary.light}`,
      "& .MuiDataGrid-row:hover": {
        backgroundColor: theme.mainLayout.light,
      },
      "& .MuiDataGrid-row.Mui-selected": {
        backgroundColor: theme.mainLayout.light,
      },
      "& .MuiTablePagination-caption": {
        color: theme.pallette.secondary.main,
        fontSize: "calc(8px + .39063vw)",
      },

      "& .MuiTablePagination-select": {
        color: theme.pallette.secondary.main,
      },
    },
    "& .MuiDataGrid-root .MuiDataGrid-cell": {
      borderBottom: `2px solid ${theme.pallette.secondary.light}`,
    },
    "& .MuiDataGrid-footerContainer ": {
      borderTop: `2px solid ${theme.pallette.secondary.light}`,
      justifyContent: "flex-end",
      "& .MuiDataGrid-selectedRowCount": {
        flexGrow: 1,
        display: "none",
        color: "red",
      },
    },
  },
}));
const UsersTable = (props) => {
  const styles = useStyles();
  const navigate = useNavigate();

  const rowClicked = (params, e) => {
    navigate(`${params.row.login.uuid}`, {
      state: { rowData: params.row },
    });
  };
  console.log(props.rowData);
  const handleNextButtonClick = (newPage) => {
    props.pageState.page = newPage + 1;
    props.setPageState({ ...props.pageState });
  };

  return (
    <Paper className={styles.tableroot}>
      <DataGrid
        headerHeight={40}
        rowHeight={90}
        rows={props.rowData}
        columns={props.columns.map((column) => ({
          ...column,
          sortable: false,
        }))}
        rowCount={props.pageState.total}
        loading={props.pageState.isLoading}
        rowsPerPageOptions={[5, 8]}
        pagination
        page={props.pageState.page - 1}
        pageSize={props.pageState.pageSize}
        paginationMode="server"
        onPageSizeChange={(newPageSize) => {
          props.pageState.pageSize = newPageSize;
          props.setPageState({ ...props.pageState });
        }}
        onPageChange={handleNextButtonClick}
        disableColumnMenu={true}
        disableColumnFilter={true}
        getRowId={(row) => row.login.uuid}
        onRowClick={rowClicked}
        components={{
          Toolbar: FilterLine,
        }}
        componentsProps={{
          toolbar: {
            setDataFilters: props.setDataFilters,
            dataFilters: props.dataFilters,
          },
        }}
      />
      <Outlet />
    </Paper>
  );
};
export default UsersTable;
