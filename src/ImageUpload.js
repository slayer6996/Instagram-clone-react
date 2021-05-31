import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import {firebase, storage, db} from './firebase.js'
import './ImageUpload.css'

function ImageUpload(props){

    const [caption, setCaption]=useState('')
    const [image,setImage]=useState(null)
    const [progress, setProgress]=useState(0)

    function handleChange(e){
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    function handleUpload(){
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_change",
            (snapshot) => {
                const progress=Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes)*100
                )
                setProgress(progress)
            },
            (error) => {
                console.log(error);
                alert(error.message)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection("posts").add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageURL: url,
                            username: props.username
                        })
                        setProgress(0)
                        setCaption("")
                        setImage(null)
                    })
            }
        )
    }

    return(
        <div className="imageUpload">
            <progress className="imageUploadProgress" value={progress} max="100" />
            <input type="text" placeholder="caption..." onChange={event => setCaption(event.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload