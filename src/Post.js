import React from 'react'
import './post.css'
import Avatar from '@material-ui/core/Avatar';

function Post(props){
    return(
        <div className="post">
            <div className="postHeader">
                <Avatar className="postAvatar" alt="Slayer"/>
                <h3>{props.username}</h3>
            </div>
            <img className="postImage" src={props.imageURL}/>
            <h4 className="postText"> <strong>{props.username}</strong> {props.caption}</h4>
        </div>
    )
}

export default Post