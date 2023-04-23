
import { initializeApp } from "firebase/app";
import { getAuth, getMultiFactorResolver, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";
import {addDoc, doc, updateDoc, collection, query, where, getDocs} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyB8R1qz_JlJCqb32MYaJPc3ouysHyunNuk",
  authDomain: "lahacks2023-6ebec.firebaseapp.com",
  databaseURL: "https://lahacks2023-6ebec-default-rtdb.firebaseio.com",
  projectId: "lahacks2023-6ebec",
  storageBucket: "lahacks2023-6ebec.appspot.com",
  messagingSenderId: "885937801610",
  appId: "1:885937801610:web:2976dff83a58d4a0ab6073",
  measurementId: "G-1ZH77VKSEQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async (usersCollectionRef) => {
    
    const result = await signInWithPopup(auth, provider).then(async (result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const photo = result.user.photoURL;
        const id = result.user.uid;
        const userid = auth.currentUser.uid;
        console.log("Querying where userid == ", userid)
        const q = query(usersCollectionRef, where("userid", "==", userid));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty){
            console.log("user already in database")
            console.log(q);
            await querySnapshot.forEach((doc) => {
                console.log(doc.id)
                result = doc.id;
            })
            return result;
        } else {
            result = await addDoc(usersCollectionRef, {
                name: name, 
                email: email,
                photo: photo,
                id: id,
                userid: userid,
                company: ""
              }).then( async (docRef) => {
                console.log("User added with ", docRef.id)
                console.log("User id ", userid)
                await updateDoc(doc(db, "users", docRef.id), {
                    id: docRef.id
                     });
                return docRef.id
              })
              console.log(result)
              return result;
        }
    }).catch((error) => {
        console.log(error);
    })
    console.log("Final return")
    console.log(result)
    return result;
}