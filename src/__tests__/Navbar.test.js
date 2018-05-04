import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Navbar from '../components/Navbar';

configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
  it('should render an h1, and a button with aria-label attribute', () => {
    const navbar = shallow(<Navbar />);
    expect(navbar.find('h1').length).toBe(1);
    expect(navbar.find('button').length).toBe(1);
    expect(navbar.find('button').prop('aria-label')).toEqual('Menu');
  });
});
