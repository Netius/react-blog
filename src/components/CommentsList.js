import React from 'react'

const CommentsList = ({ comments }) => {
  return (
    <>
      {comments.length > 0 &&
        <h3>Comments</h3>
      }
      <div class="row">
        {comments.map((comment, index) => {
          return (
            <div class="card m-2 bg-light-subtle text-dark bg-opacity-10" style={{ width: '32%', padding: '50px' }} key={index}>
              <div class="card-body">
                <h5 class="card-title">{comment.postedBy}</h5>
                <p class="card-text">{comment.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default CommentsList