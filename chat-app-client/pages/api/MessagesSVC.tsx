import axios from "axios";

export default class UsersSVC {
    public static uploadUser = async (message:string, whoSent_ID:number, receiver_ID: number, url: string) => {
        axios.post(`${url}/users`,{
            "message": message,
            "whoSent_ID": whoSent_ID,
            "receiver_ID": receiver_ID
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
