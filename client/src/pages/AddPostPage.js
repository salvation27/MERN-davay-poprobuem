import React, {useState} from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch} from "react-redux";
import { createPost } from '../redux/features/post/postSlice';
import {useNavigate} from 'react-router-dom'

const AddPostPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title,setTitle] = useState('')
  const [text,setText] = useState('')
  const [img, setImg] = useState("");


  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title',title)
      data.append('text',text)
      data.append('img',img)
      dispatch(createPost(data));
      navigate('/posts')
      setTitle("")
      setText("");
      setImg("");
    } catch (error) {
      console.log(error);
    }
  }


    const clearHandler = () => {
        setTitle("");
        setText("");
        setImg("");
    };

  //  useEffect(() => {
  //    if (status) {
  //      toast(`${status}`);
  //    }
  //  }, [status, navigate]);


  return (
    <div className="w-1/3 m-auto">
      <div className="text-center pt-11 text-4xl pb-4">AddPost</div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="image_wrap">
          <label className="text-red py-2 bg-gray-300 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
            Прикрепить изображение
            <input
              // value={img}
              onChange={(e) => setImg(e.target.files[0])}
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <div className="image_view_wrap flex object-cover py-2">
          {img && <img src={URL.createObjectURL(img)} alt="" />}
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
          <Button onClick={submitHandler} type="submit" variant="contained">
            Add Post
          </Button>
          <Button onClick={clearHandler} type="submit" variant="contained">
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddPostPage