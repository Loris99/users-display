import { Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  cellContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 5,
  },
  cellHeader: {
    fontSize: 14,
    color: theme.pallette.primary.main,
    fontWeight: "bold",
  },
  cellSubHeader: {
    fontSize: 13,
    color: theme.pallette.primary.light,
  },
}));
const CellStyle = (props) => {
  const styles = useStyles();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        columnGap: "20px",
        alignItems: "center",
      }}
    >
      {props.avatarSrc && <Avatar src={props.avatarSrc} />}

      <div className={styles.cellContainer}>
        <Typography className={styles.cellHeader}>
          {props.firstValueHeader} {props.secondValueHeader}
        </Typography>
        <Typography className={styles.cellSubHeader}>
          {props.firstValueSubHeader} {props.secondValueSubHeader}
          {props.thirdValueSubHeader ? ", " : ""}
          {props.thirdValueSubHeader}
        </Typography>
      </div>
    </div>
  );
};
export default CellStyle;
