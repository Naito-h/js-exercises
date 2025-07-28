import { DynamicSizeArray } from './index.ts';

describe('DynamicSizeArray', () => {
  let dynamicArray;

  beforeEach(() => {
    dynamicArray = new DynamicSizeArray();
  });

  it('should initialize with length 0', () => {
    expect(dynamicArray.length()).toBe(0);
  });

  it('should set and get values correctly', () => {
    dynamicArray.set(0, 1);
    expect(dynamicArray.get(0)).toBe(1);
  });

  it('should push values correctly', () => {
    dynamicArray.push(1);
    expect(dynamicArray.get(0)).toBe(1);
    dynamicArray.push(2);
    expect(dynamicArray.get(1)).toBe(2);
  });

  it('should double in size when full', () => {
    for (let i = 0; i < 8; i++) {
      dynamicArray.push(i);
    }
    expect(dynamicArray.length()).toBe(8);
    dynamicArray.push(8);
    expect(dynamicArray.length()).toBe(9);
  });
});
