import React, {act} from 'react';
import { render, screen } from '@testing-library/react';
import Post from './Post';
import userEvent from '@testing-library/user-event';

describe('Post', () => {
    it('Should render the input and button', () => {
        render(<Post handleChange={() => {}} />);
        const button = screen.getByRole('button');
        const input = screen.getByLabelText('Type a URL');
        
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Change URL');
        expect(input).toBeInTheDocument();
    });

    it('Should call the prop function', async () => {
        const handleMock = jest.fn();
        const usr = userEvent.setup();
        render(<Post handleChange={handleMock} />);
        const button = screen.getByRole('button');
        const input = screen.getByLabelText('Type a URL');

        await usr.type(input, 'http://example.com');
        expect(input).toHaveValue('http://example.com');
        await usr.click(button);
        
        expect(handleMock).toBeCalled();
        expect(handleMock.mock.calls[0][0]).toBe('http://example.com');
        expect(input).toHaveValue('');
    });
});