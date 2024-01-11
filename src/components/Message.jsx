import { UserContext } from '../context';
import { useContext } from 'react';
import StoredImg from './StoredImg';

const Message = ({
  userPhotoURL,
  text,
  time,
  authorName,
  authorEmail,
  image,
}) => {
  const {
    user: { email: currentUserEmail },
  } = useContext(UserContext);

  const isMyMessage = authorEmail === currentUserEmail;
  const timeString = time
    ? `${String(
        new Date(time.seconds * 1000 + time.nanoseconds / 1000000).getHours()
      ).padStart(2, '0')}:${String(
        new Date(time.seconds * 1000 + time.nanoseconds / 1000000).getMinutes()
      ).padStart(2, '0')}`
    : 'now';
  if (!!image) console.log(image);
  return (
    <>
      <div className={isMyMessage ? 'message message__my-message' : 'message'}>
        <div className="message_content">
          <p className="message_text">{text}</p>
          {!!image && <StoredImg fileRef={image} alt="Stored Image" />}
          <p className="message_time">{timeString}</p>
        </div>
        <img className="message_avatar" src={userPhotoURL} alt="User Avatar" />
      </div>
    </>
  );
};

export default Message;
