import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Navbar from '../index';
import { AuthProvider } from '../../auth';

describe('Navbar', () => {
  it('renders without crashing', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <AuthProvider>
        <Navbar />
      </AuthProvider>
    );
    const tree = renderer.getRenderOutput();

    expect(tree).toMatchSnapshot();
  });
});
