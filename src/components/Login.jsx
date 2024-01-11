import { useContext, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { googleAuthProvider, auth, db } from '../firebase';
import { UserContext } from '../context';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!!currentUser) {
        setUser(currentUser);

        try {
          const userRef = doc(db, 'users', currentUser.email);
          getDoc(userRef).then((docSnapshot) => {
            if (docSnapshot.exists()) {
              updateDoc(userRef, {
                authorName: currentUser.displayName,
                lastLogin: serverTimestamp(),
                userPhotoURL: currentUser.photoURL,
              })
                .then(() => {})
                .catch((error) => {
                  console.error('Error updating document: ', error);
                });
            } else {
              setDoc(userRef, {
                authorName: currentUser.displayName,
                lastLogin: serverTimestamp(),
                userPhotoURL: currentUser.photoURL,
              })
                .then(() => {})
                .catch((error) => {
                  console.error('Error creating document: ', error);
                });
            }
          });
        } catch (e) {
          console.error('Error accessing document: ', e);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider)
      .then((credentials) => {
        setUser(credentials.user);
      })
      .catch((error) => {
        console.error('Помилка авторизації:', error);
      });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Помилка виходу:', error);
      });
  };

  return (
    <div className="header_login login">
      {user ? (
        <>
          <img
            className="login_user-avatar"
            src={user.photoURL}
            alt="User Avatar"
          />

          <span className="login_user-name">{user.displayName}</span>

          <button className="login_button" onClick={handleSignOut}>
            ВИЙТИ
          </button>
        </>
      ) : (
        <div>
          <button className="login_button" onClick={handleSignInWithGoogle}>
            УВІЙТИ З GOOGLE
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
