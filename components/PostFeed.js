import Link from 'next/link';

function PostFeed({ posts, admin }) {
  // return posts
  //   ? posts.map((post) => <PostItem post={post} admin={admin} />)
  //   : null;

  return (
    posts &&
    posts.map((post, idx) => <PostItem key={idx} post={post} admin={admin} />)
  );
}

export default PostFeed;

function PostItem({ post }) {
  return (
    <div className='card'>
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <a>
          <h2>{post.title}</h2>
        </a>
      </Link>

      <footer>
        <span>word count/read time here</span>
        <span>💖 {post.heartCount || 0} Hearts</span>
      </footer>

      {/* if admin show admin UI */}
      {admin && (
        <>
          <Link href={`/admin/${post.slug}`} passHref>
            <h3>
              <button className='btn-blue'>Edit</button>
            </h3>
          </Link>

          {post.published ? (
            <p className='text-success'>Live</p>
          ) : (
            <p className='text-danger'>Unpublished</p>
          )}
        </>
      )}
    </div>
  );
}
