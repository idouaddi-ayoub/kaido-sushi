export const usePreloader = () => {
  const isDone = useState<boolean>("preloader-done", () => false);
  const finish = () => (isDone.value = true);
  return { isDone, finish };
};
