import {useEffect, useState} from "react";
import {dbService, storageService} from "../firebase";
import { v4 as uuidv4 } from "uuid";
import {addDoc, collection, onSnapshot} from "firebase/firestore"
import {ref, uploadString, getDownloadURL } from "firebase/storage"
import Nweet from "../components/Nweet";


const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(()=>{
    onSnapshot(collection(dbService, "nweets"), (snapshot => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(newArray);
    }));
  }, [])


  const onSubmit = async (event) => {
    event.preventDefault();

    let attachmentUrl = "";
    if (attachment !== ""){
      const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }

    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createAt: Date.now(),
      createdId: userObj.uid,
      attachmentUrl,
    });

    setNweet("")
    setAttachment("")
  }

  const onChange = (event) => {
    event.preventDefault();

    const {
      target: {value},
    } = event;
    setNweet(value);
  }

  const onFileChange = (event) => {
    const {
      target: { files }
    } = event;
    const theFile = files[0]
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result }
      } = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }

  const onClearAttachment = () => setAttachment("");

  return(
    <>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet"/>
        {attachment &&
          <>
            <div>
              <img src={attachment} width="100px" height="100px" alt="user upload"/>
              <button onClick={onClearAttachment}> clear </button>
            </div>
          </>
        }
      </form>
      <div>
        {nweets.map((data) =>(
          <Nweet
            key={data.id}
            nweetObj={data}
            isOwner = {data.createdId === userObj.uid}
          />
        ))}
      </div>
    </>
  )
}

export default Home;