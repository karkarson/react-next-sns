// 인터넷 익스플로러에서 immer 작동하게 하는것
import { enableES5, produce } from 'immer';

export default (...args) => {
  enableES5();
  return produce(...args);
};