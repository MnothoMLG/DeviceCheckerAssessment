const storage = {};

export default {
  setItem: jest.fn((key, value) => {
    storage[key] = value;
    return new Promise((resolve) => {
      resolve(null);
    });
  }),
  getItem: jest.fn((key) => {
    return new Promise((resolve) => {
      resolve(storage[key]);
    });
  }),
  removeItem: jest.fn((key) => {
    return new Promise((resolve) => {
      resolve(delete storage[key]);
    });
  }),
};
