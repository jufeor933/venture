import { http } from './http.service';
import constans from '../common/constans';

export class UserService {
  static user = null;

  /** user login */
  static async login({ email, password }) {
    const result = await http.post('/users/login', { email, password });
    return result;
  }

  /** user close session */
  static async closeSession() {
    UserService.user = null;
    localStorage.removeItem(constans.USER_LOCAL_KEY);
  }

  /** create new user */
  static async create(values) {
    const { data } = await http.post('/users', values);
    return data;
  }

  static async getTickets() {
    const id = UserService.user.id;
    const { data } = await http.get(`/users/tickets/${id}`);
    return data;
  }

  static async autologin(id) {
    try {
      const { data } = await http.get(`/users/${id}`);
      UserService.user = data;
      return true;
    } catch (error) {
      return false;
    }
  }

  static isLogged() {
    return !!UserService.user;
  }

  static isUser() {
    return UserService.user.role === 'USER';
  }

  static isAdmin() {
    return UserService.user.role === 'ADMIN';
  }
}
