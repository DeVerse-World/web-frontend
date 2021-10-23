import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styles.css';
import axios from 'axios'
import Querystring from "query-string"
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
function Contact(props) {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [open, setOpen] = React.useState(false);
  const [statusMessage, setStatusMessage] = useState("")
  const [missing, setMissing] = useState("")

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  function submitMessage(){
    setMissing("")
    setStatusMessage("")
    if (name === "") {
      setMissing("Name required")
      return setOpen(true)
    }
    else if (email === "") {
      setMissing("Email required")
      return setOpen(true)
    }
    else if (message === "") {
      setMissing("Message required")
      return setOpen(true)
    }

    axios.post("/api/contact", Querystring.stringify({name: name, email: email, message: message}))
    .then(res => {
      setName("")
      setEmail("")
      setMessage("")
      setStatusMessage("Sent!")
      setOpen(true)
    })
    .catch(err => {
      setStatusMessage("An unknown error occured")
      setOpen(true)
    })
  }

  return (
    <>
      <div className="container" id="contact">
        <h1 className="heading">Reach out</h1>
          <br/>
          <form method="post">
            <div className="form-group">
              <label for="title-text-area">Name</label>
              <input value={name} onChange={e => {setName(e.target.value)}} type="text" className="form-control" id="name-text-area" name="name" />
            </div>

            <div className="form-group">
              <label for="title-text-area">Email</label>
              <input value={email} onChange={e => {setEmail(e.target.value)}} type="email" className="form-control" id="email-text-area" name="email" />
            </div>

            <div className="form-group">
              <label for="body-text-area">Message</label>
              <textarea value={message} onChange={e => {setMessage(e.target.value)}} className="form-control rounded-0" id="body-text-area" rows="5" name="message"></textarea>
            </div>

            <Button onClick={submitMessage} variant="contained" color="primary" >Submit</Button>
          </form>
      </div>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={missing !== "" ? missing : statusMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default Contact;
