import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <>
      <div className='card'>
        <h1>{post.title}</h1>
        <span>
          Written by{' '}
          <Link href={`/${post.username}/`}>
            <a style={{ color: 'red' }}>@{post.username}</a>
          </Link>{' '}
          on {createdAt.toISOString()}
        </span>
        <ReactMarkdown>{post?.content}</ReactMarkdown>
      </div>
      <div className='card'>
        <div>heartCount: {post.heartCount || 0} 💖</div>
      </div>
    </>
  );
}

export default PostContent;
