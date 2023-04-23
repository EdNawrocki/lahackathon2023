import {db} from '../Firebase'
import {updateDoc, doc } from 'firebase/firestore'


export const Question = async (currentDoc, currentText, field, setInput) =>  {
    console.log(currentText, " ", currentDoc, " ", field)
    if (currentText) {
        console.log("updating ", field)
        await updateDoc(doc(db, "users", currentDoc), {
            [field]: currentText
        });
        setInput('')
    } else {
        console.log(field, "was empty")
    }
}