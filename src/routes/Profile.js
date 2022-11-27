import {authService} from "../firebase";
import {useNavigate } from "react-router-dom";
import {useState} from "react";


const Profile = ({userObj}) => {
  const history = useNavigate ();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history("/");
  }

  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewDisplayName(value);
  }

  const onSubmit = (event) => {
    event.preventDefault();
  }

  return(
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          defaultValue={newDisplayName}
        />
        <input type="text" defaultValue="Update Profile"/>
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}

export default Profile;