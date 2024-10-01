import React from 'react';
import { findByRole, render, screen } from '@testing-library/react';
import Fetch from './Fetch';

const users = [{id: 1, name: "Bob"}, {id:2, name: "Lisa"}];
describe('Fetch', () => {
    const mockResponse = users;
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse) as () => Promise<any>
        } as any);
      });
      
      afterEach(() => {
        jest.restoreAllMocks();

      });
    it('Should render the loading paragraph', () => {
        render(<Fetch  apiUrl=''/>);
        const loadingP = screen.getByRole('paragraph');
        expect(loadingP).toBeInTheDocument();
        expect(loadingP).toHaveTextContent(/loading/i);
        

    });

    it('Should render the render a table and call the fetch api', async () => {
        render(<Fetch  apiUrl='http://example.com'/>);
        
        const table = await screen.findByRole('table');
        expect(table).toBeInTheDocument();
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect((global.fetch as jest.Mock).mock.calls[0][0]).toBe('http://example.com')
    });

    it('Should render the render a paragraph when no items', async () => {
        jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
            Promise.resolve({
              ok: true,
              json: () => Promise.resolve([]),
            } as any)
          );
        render(<Fetch  apiUrl='http://example.com'/>);
        
        const table = await screen.queryByRole('table');
        const noDataP = await screen.findByRole('paragraph');
        expect(table).not.toBeInTheDocument();
        expect(noDataP).toBeInTheDocument();
        expect(noDataP).toHaveTextContent(/no data/i);
    });

    it('Should render a table and the rows for each item', async () => {
        render(<Fetch  apiUrl='http://example.com'/>);
        
        const table = await screen.findByRole('table');
        expect(table).toBeInTheDocument();
        users.forEach((item) => {
            const cellId = screen.getByRole('cell', {name: `${item.id}`});
            expect(cellId).toBeInTheDocument();
            const cellName = screen.getByRole('cell', {name: item.name});
            expect(cellName).toBeInTheDocument();
        });
    });

    it('Should render a table and a row with the titles of the items', async () => {
        render(<Fetch  apiUrl='http://example.com'/>);
        
        const table = await screen.findByRole('table');
        expect(table).toBeInTheDocument();
        const rows = screen.getAllByRole('row');
        const tiles = rows[0].childNodes
        Object.keys(users[0]).forEach((property, idx) => {
            
            expect(tiles[idx]).toHaveTextContent(property);
        });
    });
});
