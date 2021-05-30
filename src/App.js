import React, { useState, useEffect } from 'react'
import Post from './Post.js'
import {db, auth} from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import './App.css';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [posts, setPosts]=useState([])
  const [open, setOpen]=useState(false)
  const [openSignIn, setOpenSignIn]=useState(false)

  const [username, setUsername]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [user, setUser]=useState(null)

  useEffect(() => {
    const unsubscribe= auth.onAuthStateChanged((authUser) => {
      if(authUser){
        //if user logged in
        console.log(authUser)
        setUser(authUser)

      } else{
        //if user logged out
        setUser(null)
      }
    })

    return () =>{
      //performs cleanup 
      unsubscribe()
    }

  }, [user, username])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  function signUp(event){
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch(error => alert(error.message))
    event.preventDefault()
  }  

  function signIn(event){
    auth.signInWithEmailAndPassword(email, password)
    .catch(error => alert(error.message))

    setOpenSignIn(false)

    event.preventDefault()
  }

  return (
    <div className="App">
    <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="appSignup">
          <center>
          <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" />
          </center>
            <Input 
            placeholder="Username"
            type="text"
            className="signupInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
            
            <Input 
            placeholder="Email"
            type="text"
            className="signupInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

            <Input 
            placeholder="password"
            type="password"
            className="signupInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={signUp} >Sign up</Button>
            
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <form className="appSignup">
          <center>
          <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" />
          </center>

            <Input 
            placeholder="Email"
            type="text"
            className="signupInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

            <Input 
            placeholder="password"
            type="password"
            className="signupInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={signIn} >Sign in</Button>
            
          </form>
        </div>
      </Modal>

     <div className="appHeader">
     <img className="app__headerImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" />
     </div>

    {user? (<Button onClick={() => auth.signOut()} >Logout</Button>)
    :(<div className="loginContainer">
      <Button onClick={() => setOpenSignIn(true)} >Sign in</Button>
      <Button onClick={() => setOpen(true)} >Sign up</Button>
    </div>
    )}

     {posts.map(post => {
       return <Post key={post.id} username={post.username} caption={post.caption} imageURL={post.imageURL} />
     })}
    </div>
  );
}

export default App;