import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import { waitFor } from '@testing-library/react';



const exampleShowData = {
    name: 'test name',
    summary: 'test summary',
    seasons: [
        {
            id: 0,
            name: 'Season 1',
            episodes:[]
        },
        {
            id: 1,
            name: 'Season 2',
            episodes:[]
        }
    ]
 };

test('renders without errors', () => { 
    render(<Show show={exampleShowData} selectedSeason={'none'}/>)
});

test('renders Loading component when prop show is null', async () => {
    render(<Show show={null}/>)
    await waitFor(() => {
    const loading = screen.queryByAltText('loading-container')
    if (loading){
        render(loading).toBeInTheDocument()
    }
    })
    
 });

test('renders same number of options seasons are passed in', async () => { 
    render(<Show show={exampleShowData} selectedSeason={'none'}/>)
    await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId('season-option')
    if(seasonOptions){
        expect(seasonOptions).toHaveLength(2)
    }
    })
});

test('handleSelect is called when an season is selected',  () => { 
    const handleSelect = jest.fn()
    render(<Show show={exampleShowData} selectedSeason={'none'} handleSelect={handleSelect}/>)
    const select = screen.getByLabelText(/Select A Season/i)
    userEvent.selectOptions(select, ['1'])
    
    expect(handleSelect).toBeCalled()

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const {rerender} = render(<Show show={exampleShowData} selectedSeason={'none'} />)
    let episode = screen.queryByTestId('episode-container')
    expect(episode).not.toBeInTheDocument()

    rerender(<Show show={exampleShowData} selectedSeason={1}/>)
});
