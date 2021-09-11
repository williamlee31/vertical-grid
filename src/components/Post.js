import React from 'react';

function Post(props) {
  return (
    <div className="post">
      <div className="content">
        <img alt={props.title} src={props.img} ></img>
        <h5>{props.date}</h5>
        <h2>{props.title}</h2>
      </div>
    </div>
  )
  
}

export default Post;