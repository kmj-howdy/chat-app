const throttle = <T extends unknown[]>(cb: (...args: T) => void, delay: number) => {
  let timeId: ReturnType<typeof window.setTimeout> | null = null;

  return (...args: T) => {
    if (timeId) {
      return;
    }
    timeId = setTimeout(() => {
      cb(...args);
      timeId = null;
    }, delay);
  };
};

export default throttle;
