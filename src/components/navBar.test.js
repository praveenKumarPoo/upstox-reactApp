import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from './navBar';
import renderer from "react-test-renderer";

afterEach(cleanup);
test('renders NavLink without crash need  to Router ', () => {
  render(<BrowserRouter><Route><NavBar></NavBar></Route></BrowserRouter>);
});

  test('Match Snapshort', () => {
    const tree = renderer.create(<BrowserRouter><Route><NavBar /></Route></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot()
  });

  