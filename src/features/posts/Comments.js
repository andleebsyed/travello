import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { AddComment, RemoveComment } from "../../services/posts/posts";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { reactionAdded } from "./postSlice";
import { useNavigate } from "react-router-dom";
export function Comments({ commentBoxVisibility, post }) {
  const postId = post?._id;

  const [postButtonData, setPostButtonData] = useState({
    text: "Post",
    color: "bg-blue-xlight",
    disabled: true,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState({
    commentText: "",
    color: "bg-blue-xlight",
    disabled: true,
  });
  const commentBoxRef = useRef(null);
  let sortedComments = [...post?.comments];
  sortedComments.sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
  async function commentBoxSubmitHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    setPostButtonData((postButtonData) => ({
      ...postButtonData,
      text: "Posting...",
    }));
    const response = await AddComment({
      content: commentContent.commentText,
      postId,
    });
    if (response.status) {
      commentBoxRef.current.value = "";
      dispatch(
        reactionAdded({
          type: "refreshComments",
          postId,
          comments: response.comments,
        })
      );
      setPostButtonData((postButtonData) => ({
        ...postButtonData,
        text: "Post",
      }));
    }
  }
  async function DeleteCommentHandler({ event, postId, commentId }) {
    event.stopPropagation();
    const response = await RemoveComment({ postId, commentId });
    if (response.status) {
      dispatch(
        reactionAdded({
          type: "refreshComments",
          postId,
          comments: response.comments,
        })
      );
    }
  }
  useEffect(() => {
    if (commentContent?.commentText?.length > 0) {
      setPostButtonData((postButtonData) => ({
        ...postButtonData,
        color: "bg-blue-light",
        disabled: false,
      }));
    } else {
      setPostButtonData((postButtonData) => ({
        ...postButtonData,
        color: "bg-blue-xlight",
        disabled: true,
      }));
    }
  }, [commentContent.commentText]);

  return (
    <section>
      <form
        className="flex justify-between  mt-4 "
        onSubmit={(e) => commentBoxSubmitHandler(e)}
      >
        <input
          onChange={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setCommentContent({
              ...commentContent,
              commentText: e.target.value,
            });
          }}
          onKeyPress={(e) =>
            e.key === "Enter" &&
            !postButtonData.disabled &&
            commentBoxSubmitHandler(e)
          }
          type="text"
          ref={commentBoxRef}
          placeholder="Comment here..."
          className="p-1 mr-4 w-screen bg-blue rounded border border-gray-400 outline-none focus:ring-2 focus:ring-blue-light focus:ring-opacity-100 focus:border-blue-light"
        />
        <button
          className={` pl-4 pr-4 rounded-2xl ${postButtonData.color}`}
          disabled={postButtonData.disabled}
        >
          {postButtonData.text}
        </button>
      </form>
      {post.comments && post.comments.length > 0 && (
        <ul className="">
          {sortedComments.map((comment) => (
            <li key={comment._id} className="flex mt-4 mb-4">
              <img
                onClick={() =>
                  navigate(`/user/${comment.author._id}`, { replace: true })
                }
                className="rounded-3xl w-12 h-12 mr-4 cursor-pointer  "
                alt="avatar"
                src={
                  comment.author.avatar
                    ? comment.author.avatar
                    : "https://via.placeholder.com/48"
                }
              />
              <div className="">
                <div className="">
                  <span
                    className="font-bold mr-2 mb-4 hover:underline cursor-pointer"
                    onClick={() =>
                      navigate(`/user/${comment.author._id}`, { replace: true })
                    }
                  >
                    {comment.author.name}
                  </span>
                  <span className="mr-2 font-light ">
                    @{comment.author.username}
                  </span>
                  <span className="font-light italic">
                    {moment(comment.createdAt).fromNow()}
                  </span>
                </div>
                <p className=" break-all overflow-hidden whitespace-pre-line">
                  {comment.content}
                </p>
              </div>
              {localStorage.getItem("userId") === comment.author._id && (
                <button
                  onClick={(event) =>
                    DeleteCommentHandler({
                      event,
                      postId,
                      commentId: comment._id,
                    })
                  }
                  title="Delete Comment"
                  className="text-grey-outline cursor-pointer hover:text-red hover:bg-red hover:bg-opacity-10 self-center ml-auto rounded-full p-2"
                >
                  <AiFillDelete size={18} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
