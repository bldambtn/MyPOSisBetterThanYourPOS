import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return sessionStorage.getItem("id_token");
  }

  login(idToken) {
    sessionStorage.setItem("id_token", idToken);
  }

  logout() {
    sessionStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
