export const connectUserStream = async (client, authUser, setLoading) => { 
  setLoading(false);
  authUser.displayName !== null ? (
    client.connectUser(
      {
        id: authUser.uid,
          name: authUser.displayName,
          image: authUser.photoURL,
        },
        client.devToken(authUser.uid),
        )
        ): null;  
      }