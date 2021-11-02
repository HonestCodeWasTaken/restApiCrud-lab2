import axios from "axios";

export default class UsersSVC {
    public static uploadUser = async (username:string, email:string, url: string) => {
        axios.post(`${url}/users`,{
            "username": username,
            "email": email
         }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    public static fetchUrl = async (url:string) => {
        return fetch(url).then(r => r.json())
    }
}
