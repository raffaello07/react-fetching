import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const mockPostComponent  = jest.fn().mockImplementation();
const mockFetchComponent = jest.fn();

jest.mock('./Fetch', () => (props: {apiUrl: string}) => {
  mockFetchComponent(props);
  return <p>Fetch</p>;
});

jest.mock('./Post', () => (props: {handleChange: Function}) => {
  mockPostComponent(props);
  return <p>Post</p>;
});

describe('App', () => {
  it('Should render a header title and child components', () => {
    render(<App />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(mockPostComponent).toHaveBeenCalled();
    expect(mockFetchComponent).toHaveBeenCalledWith(
      expect.objectContaining({
        apiUrl: 'https://jsonplaceholder.typicode.com/comments'
      })
    );
  });

  it('Should call the fetch component when handleChange change is called', async () => {
    render(<App />);

    expect(mockPostComponent).toHaveBeenCalled();
    mockPostComponent.mock.calls[0][0].handleChange('http://example.com');
    
    const postP = await screen.findByText('Post');
    expect(postP).toBeInTheDocument();
    expect(mockFetchComponent).toHaveBeenCalledTimes(2);
    expect(mockFetchComponent.mock.calls[1][0]).toEqual({
      apiUrl: 'http://example.com',
    });
  });
});
