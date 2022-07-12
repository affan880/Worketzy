export const connectUserStream = async (client, authUser, setLoading) => { 
    setLoading(false);
      client.connectUser(
        {
          id: authUser.uid,
          name: authUser.displayName,
          image: authUser.photoURL,
        },
        client.devToken(authUser.uid),
        console.log("connected")
      );  
}