import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";
import { Comments } from "../../common/components/Comments";
import { LikeInteraction } from "../../services/posts/posts";
export function ShowPost({ post }) {
  const [commentBoxVisibility, setCommentBoxVisibility] = useState("hidden");
  function commentBoxHandler(event) {
    event.stopPropagation();
    if (commentBoxVisibility === "hidden") {
      setCommentBoxVisibility("block");
    } else {
      setCommentBoxVisibility("hidden");
    }
  }
  const { name, username } = useSelector((state) => state.posts);
  const { postId } = useParams();
  const [postParameters, setPostParameters] = useState(
    postId
      ? {
          singlePost: true,
          postStyle: "p-2 pl-4 mt-8 border-b border-opacity-20 ",
          postText: "text-lg",
        }
      : {
          singlePost: false,
          postStyle:
            "p-2 pl-4   border-b   border-opacity-20 hover:bg-dark-hover cursor-pointer",
          postText: "",
        }
  );
  const [buttonTransition, setButtonTransition] = useState({
    liked: post.liked,
    likes: post.likedBy.length,
  });
  async function likeButtonHandler({ event, postId, action }) {
    event.stopPropagation();
    const data = { postId, action };
    const response = await LikeInteraction(data);
    console.log({ response });
    if (response.status) {
      action === "inc"
        ? setButtonTransition({
            ...buttonTransition,
            liked: true,
            likes: buttonTransition.likes + 1,
          })
        : setButtonTransition({
            ...buttonTransition,
            liked: false,
            likes: buttonTransition.likes - 1,
          });
    }
  }
  const navigate = useNavigate();
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
        // "p-2 pl-4  m-[1px] border-b   border-opacity-20 hover:bg-dark-hover cursor-pointer  "
      >
        <section className="flex justify-between ">
          <div className="flex justify-between">
            <img
              alt="avatar"
              src="https://via.placeholder.com/48"
              className="rounded-3xl w-12 h-12  "
            />
            <div className="pl-1 flex items-center">
              <span className=" ml-2 font-bold">{name}</span>
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
          <div className="flex mr-32">
            {!buttonTransition.liked ? (
              <button
                onClick={(event) =>
                  likeButtonHandler({ event, postId: post._id, action: "inc" })
                }
                className=" w-6 h-6 mr-2 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0H24V24H0z" />
                  <path
                    d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
                    fill="rgba(149,164,166,1)"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={(event) =>
                  likeButtonHandler({ event, postId: post._id, action: "dec" })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0H24V24H0z" />
                  <path
                    d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z"
                    fill="rgba(248,20,20,1)"
                  />
                </svg>
              </button>
            )}
            <p className="self-start">{buttonTransition.likes}</p>
          </div>

          <button onClick={commentBoxHandler} className=" w-6 h-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8zm2 14h2a6 6 0 1 0 0-12h-4a6 6 0 0 0-6 6c0 3.61 2.462 5.966 8 8.48V17z"
                fill="rgba(149,164,166,1)"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`${commentBoxVisibility}  border-b border-opacity-20  p-2 `}
      >
        <Comments
          postId={post._id}
          commentBoxVisibility={commentBoxVisibility}
        />
      </div>
    </main>
  );
}
