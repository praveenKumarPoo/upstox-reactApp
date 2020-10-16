import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter, Route } from "react-router-dom";
import NaveLink from './navLink';
import renderer from "react-test-renderer";

afterEach(cleanup);
test('renders NavLink without crash need  to Router ', () => {
  render(<BrowserRouter><Route><NaveLink /></Route></BrowserRouter>);
});

test('Render correctly  Dashboard link', () => {
    const {getByTestId} = render(<BrowserRouter><Route><NaveLink /></Route></BrowserRouter>);
    expect(getByTestId("dashboard")).toHaveTextContent("Dashboard");
  });

  
test('Render correctly   link', () => {
    const {getByTestId} = render(<BrowserRouter><Route><NaveLink /></Route></BrowserRouter>);
    expect(getByTestId("LiveChart")).toHaveTextContent("Live stock chart");
  });


  test('Match Snapshort', () => {
    const tree = renderer.create(<BrowserRouter><Route><NaveLink /></Route></BrowserRouter>).toJSON();
    expect(tree).toMatchSnapshot()
  });

  