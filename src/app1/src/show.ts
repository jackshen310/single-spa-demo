import { isFunction } from 'lodash';
const show = (str: string | Function) => {
  if (isFunction(str)) {
    console.log('111223', (str as Function)());
  } else {
    console.log('222', str);
  }
};
export { show };
export default show;
