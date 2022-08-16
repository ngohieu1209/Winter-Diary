import { Register } from './../models';
import axios from 'axios';
import { Login } from '../models';

const authApi = {
  signUp: async (register: Register) => {
    return await axios.post('nth/api/v1/auth/signup', register);
  },
  signIn: async (login: Login) =>
    await axios.post('nth/api/v1/auth/signin', login),
  activationEmail: async (activationToken: string) => {
    return await axios.post(
      `${process.env.REACT_APP_CLIENT_URL}/nth/api/v1/auth/activation`,
      { activationToken }
    );
    // do đường dẫn cũ từ email + '/' ra khác đường dẫn api
  },
  forgotPassword: async (email: string) => {
    return await axios.post('nth/api/v1/auth/forgot', { email });
  },
  resetPassword: async (token: string, password: string) => {
    return await axios.post(
      `${process.env.REACT_APP_CLIENT_URL}/nth/api/v1/auth/resetPassword`,
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  logout: async () => {
    await axios.get('nth/api/v1/auth/logout');
    localStorage.removeItem('firstLogin');
    sessionStorage.removeItem('firstLogin');
    window.location.href = '/';
  },
};

export default authApi;
