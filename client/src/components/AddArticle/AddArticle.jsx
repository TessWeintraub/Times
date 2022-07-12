import React, { useEffect, useState } from "react";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AddArticleClasses from "./AddArticle.module.css";
import axios from "axios";

const AddArticle = () => {
  const navigate = useNavigate();
  const [isDisableBth, setIsDisableBth] = useState(false);
  const [newImage, setNewImage] = useState();
  const [inputValue, setInputValue] = useState({
    title: "",
    subtitle: ""
  });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => window.scrollTo(0, 0), []);

  const handleEditorChange = (state) => {
    setEditorState(state);
    console.log(editorState)
  };

  const clickSubmitBth = async () => {

    const newArticle = {
        title: inputValue.title,
        tags: inputValue.subtitle.split(',').map(tag => tag.trim()),
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        userId: 1
    };
    console.log(JSON.stringify(newArticle))

    const formData = new  FormData()
    formData.append('file', newImage)
    formData.append('body', JSON.stringify(newArticle))
    await axios.post('http://localhost:5000/posts', formData)
    .then(res => console.log(res.data))

    navigate("/", { replace: true });
  };



  return (
    <>
      <Header />
      <main className={AddArticleClasses[`editor__section`]}>
        <h1 className={AddArticleClasses.title}>Add Article</h1>
        <Input
          text=""
          name="title"
          placeholder="Enter a title"
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <Input
          text=""
          name="subtitle"
          placeholder="Enter the category name..."
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <div className={AddArticleClasses.editor}>
          <Editor
            onEditorStateChange={handleEditorChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            placeholder="Enter the text..."
            editorState={editorState}
          />
        </div>
        <div className={AddArticleClasses.buttons}>
          <Button
            name="Publish an article"
            variant="contained__header"
            onClick={() => {
              clickSubmitBth();
            }}
            isDisable={isDisableBth}
          />
          <div className={AddArticleClasses[`upload__button`]}>
            <Button variant="upload" name="Upload image" />
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              className={AddArticleClasses[`upload`]}
              onChange={(e) => setNewImage(e.target.files[0])}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default AddArticle;
