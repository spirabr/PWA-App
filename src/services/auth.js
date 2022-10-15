import qs from 'qs';

export function hasToken(state) {
  return state.$cookies.isKey('token');
}

export async function signIn(state, instance, username, password) {
  const requestData = qs.stringify({
    username:username,
    password:password
  });
  const requestOptions = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };

  const loginResponse = await instance.post(
    `${process.env.VUE_APP_INFERENCE_BACKEND_URL}/v1/users/auth`,
    requestData,
    requestOptions
  );
  state.$cookies.set('token',loginResponse.data.access_token,parseInt(process.env.VUE_APP_COOKIE_EXPIRING_TIME));
  state.$cookies.set('user_id',loginResponse.data.id,parseInt(process.env.VUE_APP_COOKIE_EXPIRING_TIME));
}