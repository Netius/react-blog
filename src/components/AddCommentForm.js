import axios from 'axios';
import React, { useState } from 'react'
import useUser from '../hooks/useUser';

const AddCommentForm = ({articleName , onArticleUpdated}) => {
  const [name, setName] = useState("");
  const [commmentText, setCommmentText] = useState("");
  const {user} = useUser();

  const addComment = async () => {
    const token = user && await user.getIdToken();
    const headers = token ? {authtoken: token } : {};
    const res = await axios.post(`/api/articles/${articleName}/comments`, {postedBy: name, text: commmentText },{ headers });
    const updatedArticle = res.data;
    onArticleUpdated(updatedArticle);
    setName("");
    setCommmentText("");
  } 

  return (
    <>
      <div className='add-comment-form'>
        <h3>Add a comment</h3>
        <p>Posting as <b>{user?.email}</b></p>
        <textarea value={commmentText} onChange={e => setCommmentText(e.target.value)} rows="4" cols="50" />
        <button type='button' onClick={addComment}>Add comment</button>
      </div>
    </>
  )
}

export default AddCommentForm;