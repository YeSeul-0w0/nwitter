import {useState} from "react";
import { dbService, storageService } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {addDoc, collection} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

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
        if (Boolean(theFile)){
            reader.readAsDataURL(theFile);
        }
    }

    const onClearAttachment = () => setAttachment("");


    const onSubmit = async (event) => {
        event.preventDefault();

        if (nweet === ""){
            return;
        }

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

    return(
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input className="factoryInput__input" value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{ opacity: 0, }} />
            {attachment && (
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    )
}

export default NweetFactory;