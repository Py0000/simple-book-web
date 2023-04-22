// import { render, screen } from '@testing-library/react';
// import App from './App';

const render = require('@testing-library/react');
const screen = require('@testing-library/react');
const App = require('./App');

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
