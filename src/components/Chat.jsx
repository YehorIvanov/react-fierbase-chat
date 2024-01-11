import { useContext, useState, useEffect, useRef } from 'react';
import { UserContext } from '../context';
import Message from './Message';
import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  limit,
  setDoc,
  doc,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';

const Chat = () => {
  const { user } = useContext(UserContext);
  const chatContainerRef = useRef(null);
  const [myMessage, setMyMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlerOnSend = async (event) => {
    event.preventDefault();
    const timestamp = new Date().getTime().toString();
    try {
      await setDoc(doc(collection(db, 'messages'), timestamp), {
        text: myMessage,
        authorName: user.displayName,
        authorEmail: user.email,
        time: serverTimestamp(),
        userPhotoURL: user.photoURL,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setMyMessage('');
  };
  const handlerOnFileSelect = (event) => {
    const uploadFilePath = `test/${event.target.files[0].name}`;
    const uploadFileRef = ref(storage, uploadFilePath);
    const uploadTask = uploadBytesResumable(
      uploadFileRef,
      event.target.files[0]
    );
    console.log(uploadTask);
    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.log(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          const timestamp = new Date().getTime().toString();
          try {
            setDoc(doc(collection(db, 'messages'), timestamp), {
              text: myMessage,
              authorName: user.displayName,
              authorEmail: user.email,
              time: serverTimestamp(),
              userPhotoURL: user.photoURL,
              image: uploadFilePath,
            });
          } catch (e) {
            console.error('Error adding document: ', e);
          }
        });
      }
    );
  };
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'messages'), orderBy('time', 'desc'), limit(50)),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setMessages(data);
        setLoading(false);
        setTimeout(() => {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }, 1000);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="chat" ref={chatContainerRef}>
        {loading ? (
          <hr></hr>
        ) : (
          messages
            .sort((a, b) => a.time - b.time)
            .map((message) => {
              return <Message key={message.time} {...message} />;
            })
        )}
      </div>
      <hr className="hr" />
      <footer className="footer">
        <form className="footer_form" onSubmit={handlerOnSend}>
          <input
            className="footer_input"
            type="text"
            value={myMessage}
            onChange={(event) => {
              setMyMessage(event.target.value);
            }}
          />

          <div className="button footer_input-button ">
            <div className="footer_input-file-container">
              <input
                className="footer_input-file"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handlerOnFileSelect}
                value=""
                placeholder="*"
              ></input>
            </div>
          </div>

          <button
            className="footer_button"
            footertype="submite"
            onClick={handlerOnSend}
          >
            Send
          </button>
        </form>
      </footer>
    </>
  );
};

export default Chat;
