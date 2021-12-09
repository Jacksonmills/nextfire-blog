import Link from 'next/link';

function Custom404() {
  return (
    <main>
      <h1>404 - Poop...</h1>
      <Link href='/' passHref>
        <button className='btn-blue'>Go home</button>
      </Link>
    </main>
  );
}

export default Custom404;
