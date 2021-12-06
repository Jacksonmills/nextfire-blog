import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <main>
      <button onClick={() => toast.success('toasted...')}>Toast me!</button>
      <Loader show />
    </main>
  );
}
