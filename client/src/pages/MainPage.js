import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "../components/PostItem";
import { getAllPosts } from "../redux/features/post/postSlice";
import PopularPost from "../components/PopularPost";

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);
  useEffect(() => {
   dispatch(getAllPosts());
  }, [dispatch]);

    useEffect(() => {
      dispatch(getAllPosts());
    }, []);
    
  if(!posts.length) {
    return (
      <div>Нет постов</div>
    )
  }
  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          { 
            posts?.map((item,i)=><PostItem key={i} item={item} />)
          }
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-black">Popular:</div>
          {
            popularPosts?.map((item,i)=><PopularPost key={i} item={item} />)
          }
          {/* <PopularPost />
          <PopularPost />
          <PopularPost /> */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
