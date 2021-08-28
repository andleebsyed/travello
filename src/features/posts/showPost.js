import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillDelete, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { LikeInteraction } from "../../services/posts/posts";
import { useState } from "react";
import { Comments } from "./Comments";
import { deletePost, reactionAdded } from "./postSlice";
export function ShowPost({ post, user }) {
  const { name, username, avatar } = post ? post?.author : null;
  const [commentBoxVisibility, setCommentBoxVisibility] = useState("hidden");
  const { profile } = useSelector((state) => state.users);
  function commentBoxHandler(event) {
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
  async function likeButtonHandler({ event, postId, action }) {
    event.stopPropagation();
    const data = { postId, action };
    const response = await LikeInteraction(data);
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
  async function DeletePostHandler({ postId, event }) {
    event.stopPropagation();
    await dispatch(deletePost({ postId }));
    navigate("/home", { replace: true });
  }
  return (
    <main>
      <div
        onClick={(event) => {
          if (!postParameters.singlePost) {
            event.stopPropagation();
            navigate(`/post/${post._id}`);
          }
        }}
        id={post?._id}
        className={`${postParameters.postStyle}`}
      >
        <section className="flex flex-col gridbreak:flex-row  justify-start  gridbreak:justify-between ">
          <div className="flex justify-start  gridbreak:justify-between">
            <img
              onClick={(e) => {
                e.stopPropagation();
                post.author._id === profile._id
                  ? navigate(`/profile`)
                  : navigate(`/user/${post.author._id}`, {
                      replace: true,
                    });
              }}
              alt="avatar"
              src={avatar ? avatar : "https://via.placeholder.com/48"}
              className="rounded-3xl w-12 h-12 ml-1  "
            />
            <div className="pl-1 flex items-center">
              <span
                className=" ml-2 font-bold hover:underline hover:cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  post.author._id === profile._id
                    ? navigate(`/profile`)
                    : navigate(`/user/${post.author._id}`, {
                        replace: true,
                      });
                }}
              >
                {name}
              </span>
              <span className="ml-2 ">@{username}</span>
            </div>
          </div>
          <span className="gridbreak:self-center font-serif text-sm  gridbreak:ml-auto">
            {moment(post.createdAt).fromNow()}
          </span>
        </section>
        <p className={`${postParameters.postText} mt-2 mb-2 pl-1`}>
          {post?.postText}
        </p>
        {post?.postImage ? (
          <img alt="posted update by user pl-1" src={post.postImage} />
        ) : (
          ""
        )}
        <div className="flex justify-start ">
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
          {postId && post?.author?._id === profile?._id && (
            <button
              onClick={(event) =>
                DeletePostHandler({ event, postId: post._id })
              }
              title="Delete Post"
              className="text-grey-outline cursor-pointer hover:text-red hover:bg-red hover:bg-opacity-10 self-center ml-auto rounded-full p-2"
            >
              <AiFillDelete size={24} />
            </button>
          )}
        </div>
      </div>
      {postId && (
        <div className={`  border-b border-opacity-20  p-2 `}>
          <Comments post={post} profile={profile} />
        </div>
      )}
    </main>
  );
}
