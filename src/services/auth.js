export function hasToken(state) {
  return state.$cookies.isKey('token');
}

export async function signIn(state, username, password) {
  console.log(username, password);
  //make request
  state.$cookies.set('token','token_value',parseInt(process.env.VUE_APP_COOKIE_EXPIRING_TIME));
  state.$cookies.set('user_id','123456s',parseInt(process.env.VUE_APP_COOKIE_EXPIRING_TIME));
  console.log(state.$cookies.get('token'));
}