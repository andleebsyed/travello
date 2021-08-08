import { useState } from "react";
import { PostCreation } from "../../services/posts/posts";

export function CreatePost() {
  const [postContent, setPostContent] = useState({ text: "", image: File });
  const [imageData, setImageData] = useState({
    url: "#",
    showStatus: "hidden",
  });
  async function newPostHandler(e) {
    e.preventDefault();
    const response = await PostCreation(postContent);
    // console.log({ postContent });
  }
  function fileUploadHandler(e) {
    if (e.target.files && e.target.files[0]) {
      setPostContent({ ...postContent, image: e.target.files[0] });
      var reader = new FileReader();
      reader.onload = function (e) {
        setImageData({
          ...imageData,
          showStatus: "block",
          url: e.target.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  return (
    <div className="xsm:col-start-2 xsm:col-end-3 xsm:row-start-1 xsm:row-end-2">
      <form className="p-4  flex flex-col" onSubmit={newPostHandler}>
        <input
          type="text"
          name="newPost"
          placeholder="Write Something..."
          className="h-16 bg-blue outline-none"
          onChange={(e) =>
            setPostContent({ ...postContent, text: e.target.value })
          }
        />
        <img
          alt="selected file"
          src={imageData.url}
          className={`${imageData.showStatus}  self-center mb-4`}
        />
        <section className="flex justify-between">
          <label
            className="w-6 h-6 self-center cursor-pointer"
            title="Add Image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M21 15v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2zm.008-12c.548 0 .992.445.992.993V13h-2V5H4v13.999L14 9l3 3v2.829l-3-3L6.827 19H14v2H2.992A.993.993 0 0 1 2 20.007V3.993A1 1 0 0 1 2.992 3h18.016zM8 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
                fill="rgba(149,164,166,1)"
              />
            </svg>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              className="hidden"
              onChange={fileUploadHandler}
            />
          </label>

          <input
            type="submit"
            value="Post"
            className="bg-blue-light  rounded-2xl cursor-pointer w-16 p-2   "
          />
        </section>
      </form>
    </div>
  );
}
