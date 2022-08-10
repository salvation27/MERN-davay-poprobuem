import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "../utils/axios";
import { postUpdate } from "../redux/features/post/postSlice";

const EditPostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImg, setOldImg] = useState("");
  const [newImg, setNewImg] = useState("");

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setOldImg(data.imgUrl);
  }, [params.id]);

  const submitHandel = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append("title", title);
      updatedPost.append("text", text);
      updatedPost.append("id", params.id);
      updatedPost.append("image", newImg);
      dispatch(postUpdate(updatedPost));
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

    const clearHandel = () => {
      setTitle("");
      setText("");
      setOldImg("");
    };

    useEffect(() => {
      fetchPost();
    }, [fetchPost]);

  return (
    <div className="w-1/3 m-auto">
      <div className="text-center pt-11 text-4xl pb-4">Edit Post</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="image_wrap">
          <label className="text-red py-2 bg-gray-300 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
            Прикрепить изображение
            <input
              // value={img}
              onChange={(e) => {
                setNewImg(e.target.files[0]);
                setOldImg("");
              }}
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <div className="image_view_wrap flex object-cover py-2">
          {oldImg && <img src={`http://localhost:1234/${oldImg}`} alt="" />}
          {newImg && <img src={URL.createObjectURL(newImg)} alt="" />}
        </div>
        <div className="line"></div>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="line"></div>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Text"
          variant="outlined"
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-between items-center mt-3">
          <Button onClick={submitHandel} type="submit" variant="contained">
            Edit Post
          </Button>
          <Button onClick={clearHandel} type="submit" variant="contained">
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;
