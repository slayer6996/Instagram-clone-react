import React, { useEffect, useState } from 'react'
import './post.css'
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';


function Post(props){
    const [comments, setComments] = useState([])
    const [comment, setComment]=useState('')
    useEffect(() => {
        let unsubscribe
        if(props.postId){
            unsubscribe= db
            .collection("posts")
            .doc(props.postId)
            .collection("comments")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            })
        }

        return () => {
            unsubscribe()
        }
    }, [props.postId])

    function postComment(event){

    }

    return(
        <div className="post">
            <div className="postHeader">
                <Avatar className="postAvatar" alt="Slayer"/>
                <h3>{props.username}</h3>
            </div>
            <img className="postImage" src={props.imageURL}/>
            <h4 className="postText"> <strong>{props.username}</strong> {props.caption}</h4>

            <div className="postComments">
                {
                    comments.map(comment => {
                       return <p>
                            <strong>{comment.username}</strong> {comment.comment}
                        </p>
                    })
                }
            </div>

            <form className="commentBox" >
                <input 
                className="commentInput" 
                type="text" 
                placeholder="Add a comment..." 
                value={comment} 
                onChange={((e) => setComment(e.target.value))} />
                <button 
                className="commentButton" 
                disabled={!comment} 
                type="submit" 
                onClick={postComment} >
                    Post
                </button>
            </form>
        </div>
    )
}

export default Post