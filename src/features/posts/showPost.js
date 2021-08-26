import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { LikeInteraction } from "../../services/posts/posts";
import { useState } from "react";
import { Comments } from "./Comments";
import { reactionAdded } from "./postSlice";
export function ShowPost({ post, user }) {
  const { name, username, avatar } = post ? post?.author : null;
  const [commentBoxVisibility, setCommentBoxVisibility] = useState("hidden");
  function commentBoxHandler(event) {
    // event.stopPropagation();
    if (commentBoxVisibility === "hidden") {
      setCommentBoxVisibility("block");
    } else {
      setCommentBoxVisibility("hidden");
    }
  }
  const { postId } = useParams();
  const dispatch = useDispatch();
  let postParameters = postId
    ? {
        singlePost: true,
        postStyle: "p-2  mt-8 border-b border-opacity-20 ",
        postText: "text-lg",
      }
    : {
        singlePost: false,
        postStyle:
          "p-2    border-b   border-opacity-20 hover:bg-dark-hover cursor-pointer",
        postText: "",
      };
  // );
  // useEffect(() => {
  //   async function Run() {
  //     // dispatch()
  //     const response = await FetchComments({ postId });
  //     if (response.status) {
  //       dispatch({ type: "refreshComments", comments: response.comments });
  //     }
  //   }
  //   if (post.comments[0].avatar === null) {
  //     Run();
  //   }
  // }, [dispatch, postId, post.comments]);
  async function likeButtonHandler({ event, postId, action }) {
    event.stopPropagation();
    const data = { postId, action };
    const response = await LikeInteraction(data);
    console.log({ response });
    console.log({ postId });
    if (response.status) {
      action === "inc"
        ? dispatch(
            reactionAdded({
              type: "likeAdded",
              postId,
            })
          )
        : dispatch(
            reactionAdded({
              type: "likeRemoved",
              postId,
            })
          );
    }
  }
  const navigate = useNavigate();
  return (
    <main>
      <div
        onClick={(event) => {
          if (!postParameters.singlePost) {
            event.stopPropagation();
            // <SinglePost post = {post} user = {user} />
            navigate(`/post/${post._id}`);
          }
        }}
        id={post?._id}
        className={`${postParameters.postStyle}`}
      >
        <section className="flex justify-between ">
          <div className="flex justify-between">
            <img
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user/${post.author._id}`, {
                  replace: true,
                });
              }}
              alt="avatar"
              src={avatar ? avatar : "https://via.placeholder.com/48"}
              className="rounded-3xl w-12 h-12  "
            />
            <div className="pl-1 flex items-center">
              <span
                className=" ml-2 font-bold hover:underline hover:cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/user/${post.author._id}`, { replace: true });
                }}
              >
                {name}
              </span>
              <span className="ml-2 ">@{username}</span>
            </div>
          </div>
          <span className="self-center ml-auto">
            {moment(post.createdAt).fromNow(true)}
          </span>
          {/* <button className="self-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M7 6V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5zm2-2v2h6V4H9z"
                fill="rgba(149,164,166,1)"
              />
            </svg>
          </button> */}
        </section>
        <p className={postParameters.postText}>{post?.postText}</p>
        {post?.postImage ? (
          <img alt="posted update by user" src={post.postImage} />
        ) : (
          ""
        )}
        <div className="flex justify-start pt-4">
          <div className="flex mr-32 text-grey-outline hover:text-red ">
            {!post.likedBy.includes(localStorage.getItem("userId")) ? (
              <button
                onClick={(event) =>
                  likeButtonHandler({ event, postId: post._id, action: "inc" })
                }
                className="   hover:bg-red hover:bg-opacity-30 rounded-full p-1"
              >
                <AiOutlineHeart size={24} />
              </button>
            ) : (
              <button
                onClick={(event) =>
                  likeButtonHandler({ event, postId: post._id, action: "dec" })
                }
                className=" text-red hover:bg-red hover:bg-opacity-30 rounded-full p-1"
              >
                <AiFillHeart size={24} />
              </button>
            )}
            <p className="self-center ml-2">{post.likedBy.length}</p>
          </div>
          <section className="flex text-grey-outline hover:text-blue-light">
            <button
              onClick={commentBoxHandler}
              className="  hover:bg-blue-light hover:bg-opacity-30 rounded-full p-1"
            >
              <GoComment size={22} />
            </button>
            <span className="ml-2 self-center p-1">{post.comments.length}</span>
          </section>
        </div>
      </div>
      {postId && (
        <div className={`  border-b border-opacity-20  p-2 `}>
          <Comments post={post} />
        </div>
      )}
    </main>
  );
}
