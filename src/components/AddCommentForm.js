import axios from 'axios';
import React, { useState } from 'react'

const AddCommentForm = ({articleName , onArticleUpdated}) => {
  const [name, setName] = useState("");
  const [commmentText, setCommmentText] = useState("");

  const addComment = async () => {
    const res = await axios.post(`/api/articles/${articleName}/comments`, {postedBy: name, text: commmentText });
    const updatedArticle = res.data;
    onArticleUpdated(updatedArticle);
    setName("");
    setCommmentText("");
  } 

  return (
    <>
      <div className='add-comment-form'>
        <h3>Add a comment</h3>
        <label>
          Name:
          <input value={name} onChange={e => setName(e.target.value)} type='text' />
        </label>
        <label>
          Comment:
          <textarea value={commmentText} onChange={e => setCommmentText(e.target.value)} rows="4" cols="50" />
        </label>
        <button type='button' onClick={addComment}>Add comment</button>
      </div>
    </>
  )
}

export default AddCommentForm;