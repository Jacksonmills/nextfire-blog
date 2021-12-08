import ReactMarkdown from 'react-markdown';

function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div className='card'>
      <h1>{post?.title}</h1>
      <span>
        Written by {post.username} on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}

export default PostContent;
