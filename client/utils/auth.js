/* IMPORT MODULES */
import decode from 'jwt-decode';

class AuthService {
    getProfile() {
        return decode(this.getToken());
    }

    loggedIn() {
        const token = this.getToken();
        if (token && !this.isTokenExpired(token)) {
            return false;
        } else {
            return true;
        }
    }
}