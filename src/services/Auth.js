import axios from 'axios';

const API_URL = "http://localhost:8080/auth";

    const register = (name, password) => {
      console.log('hello world');
        return axios.post(API_URL + "/", {
          name,
          password
        });
      };
      
      const login = (name, password) => {
        return axios
          .post(API_URL, {
            name,
            password,
          })
          .then((response) => {
            console.log('print response  ',response)
            if (response.data.token) {
              // console.log('this is auth service')
              // localStorage["user"] = JSON.stringify(response.data)
              
              localStorage.setItem("user", JSON.stringify(response.data));
              console.log('to get user info ',localStorage.getItem("user"))
              // window.location.reload()
            }
            return response.data;
          });
      };
      
      const logout = () => {
        localStorage.removeItem("user");
      };
      
      const getCurrentUser = () => {
        console.log('no parse data: ',localStorage.getItem("user"))
            return JSON.parse(localStorage.getItem("user"));
      };
      
      export default {
        register,
        login,
        logout,
        getCurrentUser,
      }
    
