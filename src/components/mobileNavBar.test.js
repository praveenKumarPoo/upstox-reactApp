import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter, Route } from "react-router-dom";
import MobileNavBar from './mobileNavBar';
import renderer from "react-test-renderer";

afterEach(cleanup);
test('renders NavLink without crash need  to Router ', () => {
  render(<BrowserRouter><Route><MobileNavBar /></Route></BrowserRouter>);
});

  test('Match Snapshort', () => {
    const tree = renderer.create(<BrowserRouter><Route><MobileNavBar /></Route></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot()
  });

  