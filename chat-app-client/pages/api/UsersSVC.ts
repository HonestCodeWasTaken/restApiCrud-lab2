import axios from "axios";

export default class UsersSVC {
  public static uploadUser = async (username: string, email: string, url: string) => {
    axios.post(`${url}/users`, {
      "username": username,
      "email": email
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
  public static postJob = async (title: string, description: string, type: string, howLongItLasts: string, creatorId: number, url: string) => {
    axios.post(`${url}/users`, {
      "title": title,
      "description": description,
      "type": type,
      "howLongItLasts": howLongItLasts,
      "creatorId": creatorId
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  public static deleteJob = async (id: number, url: string) => {
    axios.delete(`${url}/jobs/${id}`).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
  public static putJob = async (title: string, description: string, type: string, howLongItLasts: string, creatorId: number, url: string) => {
    axios.put(`${url}/users`, {
      "title": title,
      "description": description,
      "type": type,
      "howLongItLasts": howLongItLasts,
      "creatorId": creatorId
    }).then(function (response) {
      console.log(response);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
}
