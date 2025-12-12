/**
 * React Native Mocks
 */

const React = require('react');

module.exports = {
  View: ({ children, testID, style }) => React.createElement('View', { testID, style }, children),
  Text: ({ children, testID, style }) => React.createElement('Text', { testID, style }, children),
  StyleSheet: { 
    create: jest.fn((styles) => styles),
    flatten: jest.fn((style) => style)
  },
  Dimensions: { get: jest.fn(() => ({ width: 375, height: 667 })) },
  LinearGradient: ({ children, testID, style }) => React.createElement('LinearGradient', { testID, style }, children),
};