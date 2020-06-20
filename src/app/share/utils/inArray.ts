import {getRandomInt} from './number';

export function inArray(arr: any[], target: any): boolean {
  return arr.indexOf(target) !== -1;
}

// 打乱数组原有的顺序，进行随机排序
export function toRandom<T>(arr: T[]): T[] {
  const result = arr.slice();
  for (let i = 0; i < result.length; i++) {
// 返回0-i之间的数字
    const j = getRandomInt([0, i]);
    [result[i], result[j]] = [result[j], result[i]]; // 调换位置
  }
  return result;
}
