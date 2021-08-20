import { useState } from "react";
import { Modal } from "@material-ui/core";
import { ImCancelCircle } from "react-icons/im";
import { useSelector } from "react-redux";
import { BiImageAdd } from "react-icons/bi";
export function EditProfileModal() {
  const [open, setOpen] = useState(false);
  const { profile } = useSelector((state) => state.users);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div className="flex  justify-center min-h-screen">
      <div
        className="text-lg flex flex-col bg-blue text-white 
     border border-opacity-20 rounded  p-4 mt-8 mb-12 md:w-[50vw]"
      >
        <div className="flex pt-4 pb-4 items-center">
          <button
            className=" text-white hover:text-blue-light hover:bg-blue-light hover:bg-opacity-20 rounded-full p-2 mr-2"
            onClick={handleClose}
          >
            <ImCancelCircle size={18} />
          </button>
          <h1>Edit Profile</h1>
          <button className="ml-auto rounded-3xl pl-4 pr-4 border border-opacity-20 bg-blue-light text-white">
            Save
          </button>
        </div>
        <div
          style={{
            backgroundImage: `url(${profile.coverPic})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="h-40 "
        >
          <div className="bg-grey-outline w-full bg-opacity-50 h-40 flex justify-center items-center">
            <label className=" self-center cursor-pointer" title="Change Cover">
              <BiImageAdd size={30} />
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                className="hidden"
                //   onChange={fileUploadHandler}
              />
            </label>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${profile.avatar})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="rounded-full w-20 h-20 ml-2 relative bottom-10 "
        >
          <div className="rounded-full w-20 h-20 bg-grey-outline bg-opacity-50  flex justify-center items-center ">
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
                //   onChange={fileUploadHandler}
              />
            </label>
          </div>
        </div>
        <input
          type="text"
          name="name"
          defaultValue={profile.name}
          className="bg-blue text-white text-lg border border-opacity-20 p-2 m-1"
          placeholder="name"
          required
        />
        <input
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
    <div className="flex justify-center items-center">
      <button type="button" onClick={handleOpen}>
        Open Modal
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
