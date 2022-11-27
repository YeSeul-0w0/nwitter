import {authService} from "../firebase";
import {useNavigate } from "react-router-dom";
import {useState} from "react";
import { updateProfile } from "@firebase/auth";


const Profile = ({userObj, refreshUser}) => {
  const history = useNavigate ();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history("/nwitter");
  }

  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewDisplayName(value);
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName ){
      await updateProfile(authService.currentUser, { displayName: newDisplayName });
      refreshUser();
    }
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
        <input type="submit" value="Update Profile"/>
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  )
}

export default Profile;