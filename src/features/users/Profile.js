import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerLoader } from "../../common/components/Loaders/Spinner";
import { setUpAuthHeaderForServiceCalls } from "../../services/users/users";
import { getUserProfile } from "./userSlice";

export function Profile() {
  const { profileStatus, profile } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log({ profile }, { profileStatus });
  useEffect(() => {
    setUpAuthHeaderForServiceCalls(localStorage.getItem("token"));
    console.log("mai chalai jaaraha hu");
    if (profileStatus === "idle" || profile == null) {
      dispatch(getUserProfile());
    }
  }, []);
  return !profile ? (
    <SpinnerLoader />
  ) : (
    <div className="border border-opacity-20 min-h-screen"></div>
  );
}
