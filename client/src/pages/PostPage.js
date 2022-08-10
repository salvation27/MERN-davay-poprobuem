import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import axios from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { postDelete } from "../redux/features/post/postSlice";
import {
  createComment,
  getAllPostComments,
} from "../redux/features/comment/commentSlice";
import { useNavigate } from "react-router-dom";
import CommentItem from '../components/Comment'

const PostPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState([]);

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  const handelDelete = () => {
    try {
      dispatch(postDelete(params.id));
      navigate("/posts");
    } catch (error) {}
  };

  const handleCommitSubmit = () => {
    try {
      const postId = params.id;
      dispatch(createComment({ postId, comment }));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getAllPostComments(params.id));
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  
  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Загрузка...</div>
    );
  }
  return (
    <div>
      <Link className="flex" to={"/"}>
        <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
          Назад
        </button>
      </Link>

      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rouded-sm h-80" : "flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://localhost:1234/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-black opacity-50">{post.username}</div>
            <div className="text-xs text-black opacity-50">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>
          <div className="text-black text-xl">{post.title}</div>
          <p className="text-black opacity-60 text-xs pt-4">{post.text}</p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-xs text-black opacity-50">
                <AiFillEye /> <span>{post.views + 1}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-black opacity-50">
                <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
              </button>
            </div>
            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-black opacity-50">
                  <Link to={`/post/edit/${params.id}`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={handelDelete}
                  className="flex items-center justify-center gap-2  text-black opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment"
              className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
            />
            <button
              type="submit"
              onClick={handleCommitSubmit}
              className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
            >
              Отправить
            </button>
          </form>

          {comments?.map((cmt) => (
            <CommentItem key={cmt._id} cmt={cmt} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
