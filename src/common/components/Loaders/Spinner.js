// import { Spinner } from "@chakra-ui/react";
import { CircularProgress, makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  custom: {
    color: "#1DA1F2",
  },
});
export function SpinnerLoader() {
  const classes = useStyles();
  return (
    <div className="flex justify-center items-center mt-4  ">
      <CircularProgress classes={{ root: classes.custom }} />
    </div>
  );
}
