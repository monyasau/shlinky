import firebaseApp from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseApp);

const signIn = async(email, password)=> {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
        error = e;
    }

    return { result, error };
}
export default signIn;