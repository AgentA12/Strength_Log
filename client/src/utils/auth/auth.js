import jwt_decode from "jwt-decode";

class Auth {
  login(token) {
    window.localStorage.setItem("token", token);
    console.log(localStorage.getItem("token"));
    window.location.assign("/");
  }

  isLoggedIn() {
    const token = localStorage.getItem("token");

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

    window.location.assign("/");
  }

  getToken() {
    return window.localStorage.getItem("token");
  }
}

export default new Auth();
