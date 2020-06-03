export async function saveAccount(account, key) {
  localStorage.setItem(key, JSON.stringify(account));
}
