export function hasToken(state) {
  return state.$cookies.isKey('token');
}

export async function signIn(state, username, password, http) {
  const requestData = {
    username,
    password
  };
  const requestOptions = {
    headers: {
      'Content-Type': 'multipart/form-data;',
    }
  };

  const loginResponse = await http.post(
    `${process.env.VUE_APP_INFERENCE_BACKEND_URL}/users/auth`,
    requestData,
    requestOptions
  );
  if(loginResponse.status!= 200) throw 'login failed';
  state.$cookies.set('token',loginResponse.data.token,parseInt(process.env.VUE_APP_COOKIE_EXPIRING_TIME));
  state.$cookies.set('user_id',loginResponse.userId.token,parseInt(process.env.VUE_APP_COOKIE_EXPIRING_TIME));  
}