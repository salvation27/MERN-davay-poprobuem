import React from 'react'
import { Link } from 'react-router-dom';

const PopularPost = ({item}) => {
  console.log("items", item);
  return (
    <Link to={`/post/${item._id}`}>
      <div className="bg-gray-600 my-1">
        <div className="flex p-2 text-xs text-gray-300 hover:bg-gray-800 hover:text-white cursor-pointer">
          {item.title}
        </div>
      </div>
    </Link>
  );
}

export default PopularPost