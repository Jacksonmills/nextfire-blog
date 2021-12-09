import PostContent from '../../components/PostContent';
import { firestore, getUserWithUsername, postToJSON } from '../../lib/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';

function UserPostPage(props) {
  const postRef = firestore.doc(props.path);
  console.log(postRef.doc);
  const [realtimePost] = useDocumentData(postRef);
  const post = props.post;

  return (
    <main>
      <PostContent post={post} />
    </main>
  );
}

export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { username, slug } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let user;
  let post;
  let path;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('slug', '==', slug)
      .limit(1);
    const posts = (await postsQuery.get()).docs.map(postToJSON);
    post = posts[0];

    const postRef = userDoc.ref.collection('posts').doc(slug);
    path = postRef.path;
  } else {
    console.log('No Document Found...');
  }

  return {
    props: { user, post, path },
    revalidate: 5000,
  };
}

export default UserPostPage;
