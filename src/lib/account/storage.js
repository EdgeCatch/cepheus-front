export async function saveAccount(account, key) {
  console.log(account, key);
  localStorage.setItem(key, JSON.stringify(account));
}
