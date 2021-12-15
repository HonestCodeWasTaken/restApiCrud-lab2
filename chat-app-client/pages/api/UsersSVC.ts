import axios from "axios";
import { IUser } from "../../interfaces/IUser";

export default class UsersSVC {
  public static uploadUser = async (username: string, email: string, url: string) => {
    axios.post(`${url}/users`, {
      "username": username,
      "email": email,
      "certifiedToPost":"yes",
      "role":"User",
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  public static fetchUrl = async (url: string) => {
    return fetch(url).then(r => r.json())
  }
  public static postJob = async (title: string, description: string, type: string, howLongItLasts: string, creatorId: number | undefined, url: string, imageUrl: string) => {
    axios.post(`${url}/jobs`, {
      "title": title,
      "description": description,
      "type": type,
      "howLongItLasts": howLongItLasts,
      "creatorId": creatorId,
      "counter": 0,
      "imageUrl": imageUrl
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  public static deleteJob = async (id: number | undefined, url: string) => {
    axios.delete(`${url}/jobs/${id}`).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  public static putUser = async (user: IUser, url: string) => {
    axios.put(`${url}/users/${user.id}`, {
      "username":user.username,
      "email":user.email,
      "certifiedToPost":"yes",
      "role":user.role
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  public static putJob = async (title: string, description: string, type: string, howLongItLasts: string, creatorId: number | undefined, url: string, counter: number, imageUrl: string) => {
    axios.post(`${url}/jobs`, {
      "title": title,
      "description": description,
      "type": type,
      "howLongItLasts": howLongItLasts,
      "creatorId": creatorId,
      "counter": counter,
      "imageUrl": imageUrl
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
}
