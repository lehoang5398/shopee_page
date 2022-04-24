import axiosClient from './ApiAxiosClient';
import history from '../utils/history';
import { HOME_PAGE } from '../configs';

const login = {
  loginUser: (params) => {
    const resource = '/auth/login';
    return axiosClient.post(resource, params).then((res) => {
      if (res) {
        localStorage.setItem('USER', JSON.stringify(res.user));
        localStorage.setItem('TOKEN', res.tokens.access.token);
        history.push(HOME_PAGE);
        return res && res.user;
      }
    });
  },
};

export default login;
