import debounce from 'lodash.debounce';
import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../lib/context';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';

function EnterPage(props) {
  const { user, username } = useContext(UserContext);

  // user states
  // 1. signed out <SignInButton />
  // 2. signed in, no username <UserNameForm />
  // 3. signed in, has username <SignOutButton />
  return (
    <main>
      {user ? (
        !username ? (
          <UserNameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

export default EnterPage;

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button className='btn-google' onClick={signInWithGoogle}>
      <img src='/google.png' alt='Google logo' /> Sign in with Google
    </button>
  );
}

function SignOutButton() {
  return (
    <button className='btn btn-blue' onClick={() => auth.signOut()}>
      Sign out
    </button>
  );
}

function UserNameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // commit both docs together as a batch write(or transaction)
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const reg = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }
    if (reg.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <div>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={formValue}
            onChange={onChange}
          />

          <UsernameMessage
            username={formValue}
            loading={loading}
            isValid={isValid}
          />

          <button className='btn-green' type='submit' disabled={!isValid}>
            Choose Username
          </button>

          <h4>Debug state</h4>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username valid: {isValid.toString()}
          </div>
        </form>
      </div>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className='text-success'>{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className='text-danger'>{username} is taken...</p>;
  } else {
    return <p></p>;
  }
}
