import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography, TextField } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  tableToolbar: {
    height: 60,
    display: "flex",
    flexDirection: "row",
    marginBottom: "30px",
    margin: "20px",
    "& .MuiOutlinedInput-root": {
      width: "calc(80% + 20px)",
      height: "40px",
      margin: "20px 20px 20px 0px",
    },

    "& .MuiInputLabel-outlined": {
      transform: "translate(14px, 32px) scale(1)",
      color: theme.pallette.secondary.main,
      fontSize: "calc(11px + .39063vw)",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(15px, 12px) scale(0.75)",
    },
  },
  title: {
    flexGrow: 1,
    color: theme.pallette.primary.main,
    margin: "30px",
    fontSize: "calc(15px + .39063vw)",

    fontWeight: "700",
  },
}));

const FilterLine = (props) => {
  const styles = useStyles();
  const { dataFilter, setDataFilters } = props;

  const [tempNationality, setTempNationality] = useState();
  const [tempGender, setTempGender] = useState();

  const searchNationality = (e) => {
    if (e.key === "Enter") {
      props.dataFilters.nationality = e.target.value.trim();
      props.dataFilters.gender = tempGender;
      props.setDataFilters({ ...props.dataFilters });
    }
  };

  const searchGender = (e) => {
    if (e.key === "Enter") {
      props.dataFilters.gender = e.target.value.trim();
      props.dataFilters.nationality = tempNationality;
      props.setDataFilters({ ...props.dataFilters });
    }
  };

  return (
    <div className={styles.tableToolbar}>
      <Typography className={styles.title}>All Users</Typography>
      <TextField
        id="Nationality"
        label="Nationality"
        variant="outlined"
        onKeyDown={searchNationality}
        onChange={(e) => setTempNationality(e.target.value)}
      />
      <TextField
        id="Gender"
        label="Gender"
        variant="outlined"
        onKeyDown={searchGender}
        onChange={(e) => setTempGender(e.target.value)}
      />
    </div>
  );
};

export default FilterLine;
