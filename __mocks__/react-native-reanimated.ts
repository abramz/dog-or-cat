const { useSharedValue, ...ran } = jest.requireActual(
  "react-native-reanimated/mock",
);
module.exports = ran;

class MockSharedValue<T> {
  public values: T[] = [];

  public get value(): T {
    return this.values[this.values.length - 1];
  }

  public set value(v: T) {
    this.values.push(v);
  }

  constructor(initialValue: T) {
    this.values.push(initialValue);
  }
}

function useSharedValueMock(initialValue: any) {
  return new MockSharedValue(initialValue);
}

module.exports.useSharedValue = useSharedValueMock;
