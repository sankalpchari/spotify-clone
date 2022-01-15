import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import {spotifyApi,LOGIN_URL} from "../../../lib/spotify"

async function refreshAccessTokenOfSpotify(token:any){

  try{
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const { body:refreshedToken } = await spotifyApi.refreshAccessToken();

    return {
      ...token,
      accessToken:refreshedToken.access_token,
      accessTokenExpries: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken  : refreshedToken.refresh_token ?? token.refreshToken
    }

  }catch(e){
    // console.log(e)
    return {
      ...token,
      error:"refreshAccessTokenError"
    }
  }
} 


export default NextAuth({
  // Configure one or more authentication provider
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRATE!,
      authorization:LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret:process.env.JWT_SECRATE!,
  pages:{
    signIn:"/login"
  },
  theme:{
      colorScheme:"dark",
      logo: "http://localhost:300/public/fPuEa9V.png" // Absolute URL to image
  },

  callbacks:{
      async jwt({token, account, user}){
        if (account && token){
          const exp = account.expires_at ? account.expires_at * 1000 : 3600
           return {
             ...token,
             accessToken:account.access_token,
             refreshToken:account.refresh_token,
             userName:account.providerAccountId,
             accessTokenExpries: exp
           }
         }
        //  console.log(token)
        if(Date.now() < token?.accessTokenExpries){
          return token;
        }

        return await refreshAccessTokenOfSpotify(token)
      },

      async session({session,token}){
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken;
        session.username = token.username
        return session;
    }
  }
})

