import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter, Route } from "react-router-dom";
import App from './App';
import renderer from "react-test-renderer";

afterEach(cleanup);
test('renders NavLink without crash need  to Router ', () => {
  render(<BrowserRouter><Route><App /></Route></BrowserRouter>);
});

  test('Match Snapshort', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot()
  });

  