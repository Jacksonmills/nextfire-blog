function UserProfile({ user }) {
  return (
    <div className='box-center'>
      <img
        className='card-img-center'
        src={user.photoURL}
        alt={`${user.username} avatar`}
      />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName}</h1>
    </div>
  );
}

export default UserProfile;
