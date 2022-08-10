import React from "react";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const PostItem = ({item}) => {
    if (!item) {
      return <Loading />;
    }



  return (
    <Link to={`/post/${item._id}`}>
      <div className="flex flex-col basis-1/4 flex-grow border-4 bg-gray-400 p-4">
        <div
          className={item.imgUrl ? "flex rounded-sm h-40" : "flex rounded-sm"}
        >
          {item.imgUrl && (
            <img
              src={`http://localhost:1234/${item.imgUrl}`}
              alt="img"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-green font-bold opacity-80">
            {item.username}
          </div>
          <div className="text-xs text-white opacity-80">
            <Moment date={item.createdAt} format="D MMM YYYY" />
          </div>
        </div>
        <div className="text-white text-xl">{item.title}</div>
        <p className="text-white opacity-90 text-2xs pt-4 line-clamp-2">
          {item.text}
        </p>
        <div className="flex gap-3 items-center">
          <button className="flex justify-center items-center gap-2 text-2xs text-white">
            <AiFillEye />
            <span>{item.views}</span>
          </button>
          <button className="flex justify-center items-center gap-2 text-2xs text-white ">
            <AiOutlineMessage />
            <span>{item.comments?.length || 0}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
