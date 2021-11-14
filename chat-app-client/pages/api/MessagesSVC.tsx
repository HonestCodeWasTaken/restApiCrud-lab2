import axios from "axios";

export default class UsersSVC {
    public static sendMessage = async (message:string, whoSent_ID:any, receiver_ID: number | undefined, checkbox :boolean, url: string) => {
      console.log(message, whoSent_ID, receiver_ID, url)
        axios.post(`${url}/messages`,{
            "message": message,
            "whoSent_ID": whoSent_ID,
            "receiver_ID": receiver_ID,
            "XDDD": "test",
            "checkbox": `${checkbox}`
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
