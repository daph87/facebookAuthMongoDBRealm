import Realm from "realm";

const app= new Realm.App({id : "<your Realm app ID here>"});


// Invokes the shared instance of the Realm app.
export default app;
