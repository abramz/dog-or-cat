import "@testing-library/react-native/extend-expect";

jest.requireActual("react-native-reanimated").setUpTests();

jest.mock("expo-asset");
jest.mock("expo-font");

afterEach(() => {
  jest.restoreAllMocks();
  jest.resetAllMocks();
});
