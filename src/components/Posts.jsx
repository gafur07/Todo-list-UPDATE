import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePosts,
  fetchPosts,
  upDatePost,
} from "../store/reducers/postsSlice";

const Posts = () => {
  const postsStore = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const [inputTitle, setInputTitle] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [editTodo, setEditTodo] = useState("");

  // get axios api
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log(res);
        dispatch(fetchPosts(res.data));
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  // create function
  function createPost(e) {
    e.preventDefault();
    if (inputTitle !== "") {
      const newPost = { id: Date.now(), title: inputTitle };
      dispatch(fetchPosts([...postsStore.posts, newPost]));
    }
    setInputTitle("");
  }
  // delete funcion
  function deletePostItem(id) {
    dispatch(deletePosts(id));
  }
  // Bul function up date tarepke aparadi
  const handeleEditClick = (item) => {
    setEditForm(true);
    setEditTodo(item);
    setEditInput(item.title);
  };
  // Qaytadan add task tarepke aparadi
  const cancelUpdate = () => {
    setEditForm(false);
  };

  // SetEdit onChange bolgan waqitta baqlap turadi
  useEffect(() => {
    setEditInput(editTodo.todo);
  }, [editTodo]);

  // Update function
  const editSubmit = (e) => {
    e.preventDefault();
    let editedObj = {
      id: editTodo.id,
      title: editInput,
    };
    cancelUpdate();
    setEditInput("");
    dispatch(upDatePost(editedObj));
  };

  return (
    <>
      {/*editForm false bolsa (Add task betke otedi) al true bolsa (Update betke otedii) */}
      {editForm === false ? (
        <form
          onSubmit={createPost}
          className="flex justify-center flex-col items-center bg-slate-300 w-[80%] mx-auto gap-2 rounded-md p-6 my-4"
        >
          <label className="text-2xl text-gray-700 font-bold">
            Add New Task
          </label>
          <span className="flex w-full gap-2">
            <input
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              className="w-full rounded-md outline-none py-2 px-4"
              type="text"
              placeholder="Add task ..."
            />
            <button className="px-6 py-2 rounded-md bg-blue-500 text-white outline-none">
              Add
            </button>
          </span>
        </form>
      ) : (
        <form
          onSubmit={editSubmit}
          className="flex justify-center flex-col items-center bg-slate-300 w-[80%] mx-auto gap-2 rounded-md p-6 my-4"
        >
          <label className="text-2xl text-gray-700 font-bold">
            Update Task
          </label>
          <span className="flex w-full gap-2">
            <input
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              className="w-full rounded-md outline-none py-2 px-4"
              type="text"
              placeholder="Update task ..."
            />
            <button className="px-6 py-2 rounded-md bg-blue-500 text-white">
              Update
            </button>
            <button
              className="px-6 py-2 rounded-md bg-green-500 text-white"
              onClick={cancelUpdate}
            >
              Back
            </button>
          </span>
        </form>
      )}

      <ul className="w-[80%] mx-auto my-8 p-6 rounded-md bg-slate-300 shadow-md flex flex-col-reverse">
        {postsStore.posts?.map((item) => (
          <li
            key={item?.id}
            className="px-6 py-4 bg-white rounded-md mb-3
                 shadow-sm flex justify-between items-center"
          >
            {item.title}
            <span className="flex gap-2">
              <button
                onClick={() => handeleEditClick(item)}
                className="px-4 py-1 rounded-md bg-blue-500 text-white outline-none"
              >
                Update
              </button>
              <button
                onClick={() => deletePostItem(item.id)}
                className="px-4 py-1 rounded-md bg-red-500 text-white outline-none"
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Posts;
