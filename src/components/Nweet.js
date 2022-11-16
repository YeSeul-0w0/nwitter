import {dbService} from "../firebase";
import {doc, deleteDoc} from "firebase/firestore"

const Nweet = ({ nweetObj, isOwner }) => {

  const onDeleteClick = () => {
    const ok = window.confirm("삭제하시겠습니까?")
    if (ok) {
      const data = deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
      console.log(data)
    }
  }
  return (
    <div>
      <h4>{nweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button>Edit Nweet</button>
        </>
      )}
    </div>
  )
}

export default Nweet;