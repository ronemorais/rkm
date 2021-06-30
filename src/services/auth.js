const USER_KEY = '@phast:user';

async function setAuthUser(user) {
  await localStorage.setItem(USER_KEY, JSON.stringify(user));
}

async function getAuthUser() {
  return JSON.parse(await localStorage.getItem(USER_KEY));
}

async function isAuthenticated() {
  const user = await getAuthUser();
  return !!user;
}

async function getToken() {
  const user = await getAuthUser();
  return user?.token;
}

async function Logout() {
  return new Promise(resolve => {
    localStorage.removeItem(USER_KEY);
    localStorage.clear();
    resolve(true);
  });
}

export {setAuthUser, getAuthUser, isAuthenticated, getToken, Logout};
