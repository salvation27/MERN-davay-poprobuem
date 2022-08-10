import React, { useEffect, useState } from "react";
import axios from '../utils/axios'
import PostItem from '../components/PostItem'

const PostsPage = () => {
  const [myPosts,setMyPosts] = useState([])
  const fetchMyPosts = async () => {
    try {
      const {data} = await axios.get(`/posts/user/me`);
      setMyPosts(data);
    } catch (error) {
       console.log(error)
    }
  }

  // useEffect(() => {
  //   fetchMyPosts();
  // }, []);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  if (myPosts.length < 1) {
    return <div>Постов еще нет,создайте</div>;
  }
  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {myPosts && myPosts.map((item,id) => <PostItem key={id} item={item} />).reverse()}
    </div>
  );
}

export default PostsPage