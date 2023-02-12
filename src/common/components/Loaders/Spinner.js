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
    <div className="flex justify-center items-center  min-h-screen w-[100vw]  md:w-[60vw] lg:w-[50vw] ">
      <CircularProgress classes={{ root: classes.custom }} />
    </div>
  );
}

export function SpinnerLoaderTop() {
  const classes = useStyles();
  return (
    <div className="flex justify-center items-center w-[100vw]  md:w-[60vw] lg:w-[50vw] ">
      <CircularProgress classes={{ root: classes.custom }} />
    </div>
  );
}
