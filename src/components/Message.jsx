import { Avatar } from '@mui/material';
import { UserContext } from '../context';
import { useContext } from 'react';

const Message = ({ userPhotoURL, text, time, authorName, authorEmail }) => {
  const {
    user: { email: currentUserEmail },
  } = useContext(UserContext);

  const isMyMessage = authorEmail == currentUserEmail;
  const timeString = time
    ? `${String(
        new Date(time.seconds * 1000 + time.nanoseconds / 1000000).getHours()
      ).padStart(2, '0')}:${String(
        new Date(time.seconds * 1000 + time.nanoseconds / 1000000).getMinutes()
      ).padStart(2, '0')}`
    : 'now';
  return (
    <>
      <div
        className={isMyMessage ? 'message message__my-message' : 'message'}

        // style={{
        //   alignSelf: isMyMessage ? 'end' : 'start',
        //   flexDirection: isMyMessage ? 'row-reverse' : 'row',
        //   justifySelf: 'end',
        //   display: 'flex',
        //   padding: '5px',
        //   borderRadius: '20px',
        //   margin: '5px',
        //   backgroundColor: 'lightgrey',
        // }}
      >
        <div>
          <p className="message_text">{text}</p>
          <p className="message_time">{timeString}</p>
        </div>
        <img className="message_avatar" src={userPhotoURL} alt="User Avatar" />
      </div>
    </>
  );
};

export default Message;
