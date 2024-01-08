import { useContext, useState, useEffect } from 'react';
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

const Chat = () => {
  const { user } = useContext(UserContext);
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
      console.log('Document written with ID: ', timestamp);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setMyMessage('');
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'messages'), orderBy('time', 'desc'), limit(50)),
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setMessages(data);

        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="chat">
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
