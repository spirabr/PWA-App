export function hasToken(state) {
  return state.$cookies.isKey('token');
}

export async function signIn(state, username, password) {
  console.log(username, password);
  //make request
  state.$cookies.set('token','token_value',10);
  console.log(state.$cookies.get('token'));
}