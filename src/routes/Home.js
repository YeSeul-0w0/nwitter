import {useEffect, useState} from "react";
import {dbService} from "../firebase";
import { collection, onSnapshot } from "firebase/firestore"
import Nweet from "../components/Nweet";
import NweetFactory from "../components/NweetFactory";


const Home = ({ userObj }) => {
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

  return(
    <div className="container">
      <NweetFactory userObj={userObj}/>
      <div style={{ marginTop: 30 }}>
        {nweets.map((data) =>(
          <Nweet
            key={data.id}
            nweetObj={data}
            isOwner = {data.createdId === userObj.uid}
          />
        ))}
      </div>
    </div>
  )
}

export default Home;