import {useEffect, useState} from "react";
import {dbService} from "../firebase";
import {addDoc, collection, onSnapshot} from "firebase/firestore"
import Nweet from "../components/Nweet";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

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
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createAt: Date.now(),
      createdId: userObj.uid,
    });
    setNweet("");
  }

  const onChange = (event) => {
    event.preventDefault();

    const {
      target: {value},
    } = event;
    setNweet(value);
  }

  return(
    <>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
        <input type="submit" value="Nweet"/>
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