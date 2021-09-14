import React, { useState} from "react"
import { Form, Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import firebase from "firebase/app"
import "firebase/auth";

// const updateProfile = firebase.updateProfile();

// import GetName from './Getname'
export default function Dashboard() {
  const [error, setError] = useState("")
  const [name,setName] =useState("")
  const [phone,setPhone] =useState(0)
  const { currentUser, logout } = useAuth()
  const history = useHistory()


  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  function refreshPage() {
		window.location.reload(false);
	}
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setError("");
      currentUser.updateProfile({
        displayName: name,
        phoneNumber: phone
      }).then(()=>history.push("/"))
    }catch {
      setError("Failed to update Profile")
    }
  }

  if(currentUser.displayName===null&&currentUser.phoneNumber===null)
  {
    return(
      <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Details</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange ={(e)=>setName(e.target.value)}  required />
            </Form.Group>
            <Form.Group id="Phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="number" value={phone} onChange ={(e)=>setPhone(e.target.value)} required />
            </Form.Group>
            <Button className="w-100" type="submit">
              Add Detail
            </Button>
            <Button variant="link" onClick={handleLogout}>
              Log Out
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </>
    )
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {console.log(currentUser)}
          <strong>Name:</strong> {currentUser.displayName}
          <br/>
          <strong>Phone:</strong> {currentUser.phoneNumber}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  )
}
