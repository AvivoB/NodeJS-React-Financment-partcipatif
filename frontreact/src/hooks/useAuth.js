import { hookstate, useHookstate } from '@hookstate/core';

// Créez un état initial pour l'utilisateur authentifié
const storedUserData = JSON.parse(localStorage.getItem('authenticatedUser'));

const initialUserState = hookstate({
  authenticated: storedUserData ? true : false,
  token: storedUserData ? storedUserData.token : null,
  user: storedUserData ? storedUserData.user : [],
});

export const useAuthState = () => {
  const state = useHookstate(initialUserState);

  return {
    isAuthenticated: () => state.authenticated.value,
    getUser: (valueOfUser) => state.user.value[valueOfUser],
    // getUser: (valueOfUser) => console.log(state.value.user),
    checkToken: async () => {
      try {

        var formdata = new FormData();

        formdata.append('token', state.token.value);

        const response = await fetch('https://laboutiquedutraceur-16-to-8.test:8443/modules/reactconnector/api/auth/VerifyToken.php', {
          method: 'POST',
          body: formdata
        });

        if(response.ok) {
          const data = await response.json();
          if(data.success) {
            return true;
          }
          state.set({
            authenticated: false,
            token: null,
            user: []
          });
          localStorage.removeItem('authenticatedUser');
          return false;
        }
      } catch (error) {
        state.set({
          authenticated: false,
          token: null,
          user: []
        });
        localStorage.removeItem('authenticatedUser');
        return false;
      }
    },
    login: async (email, password) => {
      try {

        var formdata = new FormData();

        formdata.append('email', email);
        formdata.append('password', password);

        const response = await fetch('https://laboutiquedutraceur-16-to-8.test:8443/modules/reactconnector/api/auth/login.php', {
          method: 'POST',
          body: formdata
        });

        if(response.ok) {
          const data = await response.json();
          if(data.success) {
            state.set({
              authenticated: true,
              token: data.token,
              user: data.user[0]
            });
            // Stockez les données de l'utilisateur dans le stockage local
            localStorage.setItem('authenticatedUser', JSON.stringify(data));

            return true;
          } else {
            return false
          }
        }
      } catch (error) {
        
      }
    },
    logout: () => {
      state.set({
        authenticated: false,
        token: null,
        user: []
      });
      localStorage.removeItem('authenticatedUser');
    },
    register: async (email, password, nom, prenom) => {
      try {


        var formdata = new FormData();

        // formdata.append('email', email);
        // formdata.append('password', password);
        // formdata.append('firstname', firstname);
        // formdata.append('lastname', lastname);
        // formdata.append('birthday', birthday);
        // formdata.append('phone', phone);
        // formdata.append('siret', siret);
        // formdata.append('compagnyname', compagnyname);
        // formdata.append('activitydomaine', activitydomaine);

        const response = await fetch('https://laboutiquedutraceur-16-to-8.test:8443/modules/reactconnector/api/auth/register.php', {
          method: 'POST',
          body: formdata
        });

        if(response.ok) {
          const data = await response.json();
          console.log(data)
          if(data.success) {
            state.set({
              authenticated: true,
              token: data.token,
              user: data.user[0]
            });
            // Stockez les données de l'utilisateur dans le stockage local
            localStorage.setItem('authenticatedUser', JSON.stringify(data));

            return true;
          } else {
            return false
          }
        }
      } catch (error) {
        
      }
    }
  };
};