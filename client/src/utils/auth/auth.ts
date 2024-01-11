import jwt_decode from "jwt-decode";
import { UserInfo } from "../../contexts/userInfo";

// this class doesn't do routing, if you use any methods from this class you will have
// to handle reloads/assigns/locations yourself after calling said method

class Auth {
  login(token: string) {
    window.localStorage.setItem("token", token);
  }

  isLoggedIn() {
    const token: string | null = localStorage.getItem("token");

    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  logout() {
    window.localStorage.removeItem("token");
  }

  getToken() {
    return window.localStorage.getItem("token");
  }

  getInfo() {
    const token = localStorage.getItem("token");

    if (!token) return null;

    const info: UserInfo = jwt_decode(token);

    return info;
  }
}

export default new Auth();
