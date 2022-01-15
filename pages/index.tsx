import type { NextPage } from 'next';
import Head from 'next/head';
import {getSession} from "next-auth/react";
import styles from '../styles/Home.module.css';
import Sidebar from '../components/sidebar/SideBar';
import Center from '../components/Center/Center';
import Player from "../components/player/Player";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className='sticky bottom-0'>
         <Player />
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(context:any) {
    const session = await getSession(context)
    return {
      props:{
        session
      }
    }
}
