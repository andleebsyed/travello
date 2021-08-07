import axios from "axios";
import { BASE_URL } from "../url";

export function SignIn() {
    
}

export async function UserSignUp({username, password, email}) {
    try {
        const userDetails = { userDetails: { username, password, email } }
        console.log("signup info from user", {userDetails})
        const response = await axios.post(BASE_URL + 'users/signup', userDetails)
        console.log("response in api call", { response })
        if (response.status === 200) {
              return response.data
        }
      

    }
    catch (error) {
        console.log("errror occured while signining in ", error?.message)
    }
   
}