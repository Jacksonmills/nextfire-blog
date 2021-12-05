import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <div className='navbar'>
      <ul>
        <li>
          <Link href='/' passHref>
            <button className='btn-logo'>MEME</button>
          </Link>
        </li>
        {/* user is signed in and has username */}
        {username && (
          <>
            <li className='push-left'>
              <Link href='/admin' passHref>
                <button className='btn-blue'>Write posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <img src={user?.photoURL} alt={`${username} profile image`} />
              </Link>
            </li>
          </>
        )}
        {/* user is not signed in OR has no username */}
        {!username && (
          <li>
            <Link href='/enter' passHref>
              <button className='btn-blue'>Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
