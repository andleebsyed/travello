import { useState } from "react";
import { Modal } from "@material-ui/core";
import { ImCancelCircle } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { BiImageAdd } from "react-icons/bi";
import { UpdateUser } from "../../services/users/users";
import { updateProfile } from "./userSlice";
export function EditProfileModal() {
  const [open, setOpen] = useState(false);
  const { profile } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditTextVisibility((editTextVisibility) => ({
      ...editTextVisibility,
      cover: "hidden",
      avatar: "hidden",
    }));
  };
  const [editTextVisibility, setEditTextVisibility] = useState({
    cover: "hidden",
    avatar: "hidden",
  });
  const [updateData, setUpdateData] = useState({
    coverPic: profile.coverPic,
    avatar: profile.avatar,
    name: profile.name,
    bio: profile.bio,
  });
  const [saveButtonText, setSaveButtonText] = useState("Save");
  function coverHandler(e) {
    setEditTextVisibility((editTextVisibility) => ({
      ...editTextVisibility,
      cover: "block",
    }));
    if (e.target.files && e.target.files[0]) {
      setUpdateData({ ...updateData, coverPic: e.target.files[0] });
    }
  }
  function avatarHandler(e) {
    setEditTextVisibility((editTextVisibility) => ({
      ...editTextVisibility,
      avatar: "block",
    }));
    if (e.target.files && e.target.files[0]) {
      setUpdateData({ ...updateData, avatar: e.target.files[0] });
    }
  }
  async function profileUpdateHandler() {
    setSaveButtonText("Saving...");
    const response = await UpdateUser(updateData);
    if (response.status) {
      dispatch(updateProfile({ profile: response.updatedUser }));
    } else {
      setSaveButtonText("Save");
    }
  }
  const body = (
    <div className="flex  justify-center min-h-screen p-4">
      <div
        className="text-lg flex flex-col bg-blue text-white 
      rounded  p-4 mt-8 mb-12 w-screen md:w-[550px] "
      >
        <div className="flex pt-4 pb-4 items-center">
          <button
            className=" text-white hover:text-blue-light hover:bg-blue-light hover:bg-opacity-20 rounded-full p-2 mr-2"
            onClick={handleClose}
          >
            <ImCancelCircle size={18} />
          </button>
          <h1>Edit Profile</h1>
          <button
            onClick={profileUpdateHandler}
            className="ml-auto rounded-3xl pl-4 pr-4 border border-opacity-20 bg-blue-light text-white"
          >
            {saveButtonText}
          </button>
        </div>
        <div
          style={{
            backgroundImage: `url(${profile.coverPic})`,
            backgroundPosition: "center",
            backgroundSize: "cover",

            backgroundRepeat: "no-repeat",
          }}
          className="h-40 "
        >
          <div className="bg-grey-outline w-full bg-opacity-50 h-40 flex flex-col justify-center items-center">
            <label className=" self-center cursor-pointer" title="Change Cover">
              <BiImageAdd size={30} />
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  coverHandler(e);
                }}
              />
            </label>
            <p className={`${editTextVisibility.cover} font-bold`}>
              Cover choosen
            </p>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${profile.avatar})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="rounded-full w-24 h-24 ml-2 relative bottom-12 "
        >
          <div className="rounded-full w-24 h-24 bg-grey-outline bg-opacity-50  flex flex-col justify-center items-center ">
            <label
              className=" self-center cursor-pointer"
              title="Change Avatar"
            >
              <BiImageAdd size={24} />
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  avatarHandler(e);
                }}
              />
            </label>
            <p className={`${editTextVisibility.avatar} font-bold`}>Selected</p>
          </div>
        </div>
        <input
          onChange={(e) =>
            setUpdateData((updateData) => ({
              ...updateData,
              name: e.target.value,
            }))
          }
          type="text"
          name="name"
          defaultValue={profile.name}
          className="bg-blue text-white text-lg border border-opacity-20 p-2 m-1"
          placeholder="name"
          required
        />
        <input
          onChange={(e) =>
            setUpdateData((updateData) => ({
              ...updateData,
              bio: e.target.value,
            }))
          }
          type="text"
          name="bio"
          defaultValue={profile.bio}
          className="bg-blue text-white  border border-opacity-20 p-2 m-1 mb-4"
          placeholder="bio..."
          required
        />
      </div>
    </div>
  );
  return (
    <div className=" ml-auto mr-4 ">
      <button
        type="button"
        onClick={handleOpen}
        className=" pl-2 pr-2 rounded-3xl h-8 text-blue-light border border-blue-light hover:bg-blue-light hover:bg-opacity-20 "
      >
        Edit Profile
      </button>
      <Modal
        open={open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
