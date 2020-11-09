export function currentTime() {
  return Date.now();
}

export function currentTime2(toLocaleString: boolean) {
  if (toLocaleString) {
    return new Date().toLocaleString();
  } else {
    return Date.now();
  }
}
