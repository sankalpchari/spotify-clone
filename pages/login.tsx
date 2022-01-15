import type { NextPage, } from 'next'
import { NextAuthClientConfig } from 'next-auth/client/_utils'
import {getProviders,signIn} from "next-auth/react"
import Image from 'next/image'
import Img from "../public/fPuEa9V.png";

const Login:NextPage = ({providers}:any) =>{
    return <>
        <div className='flex flex-col items-center bg-black min-h-screen w-full justify-center'>
            <Image src={Img} alt="spotify logo" width={200} height={200} className='p-6 m-5' />
            <br/>
            {Object.values(providers).map((provider:any,index:number)=>{
                   return <div key={index}>
                                <button 
                                    className="text-white p-5 rounded-full bg-green-500"
                                    onClick={()=>signIn(provider.id,{callbackUrl:"/"})}
                                >
                                    Login with {provider.name}
                                </button>
                        </div>
            })}
        </div>
    </>
} 

export default Login

export async function getServerSideProps() {
    const providers = await getProviders() 

    return {
        props:{
            providers,
        }
    }

 }