import React from 'react'

const CommentsList = ({ comments }) => {
  return (
    <>
      {comments &&
        <h3>Comments:</h3>
      }
      <ul class="list-group">
        {comments.map((comment, index) => {
          return (
            <li class="list-group-item py-3" key={index}>
              <h2 className='h4'>{comment.postedBy}</h2>
              <p>{comment.text}</p>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default CommentsList