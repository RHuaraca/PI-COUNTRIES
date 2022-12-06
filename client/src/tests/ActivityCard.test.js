import React from 'react';
import { render, screen } from '@testing-library/react';
import ActivityCard from '../components/ActivityCard.jsx';

//information to component
const info = {
    name:'Name of test', 
    difficulty:'Difficulty', 
    duration:'Duration', 
    season:'Season', 
    countries: ['Country1', 'Country2', 'Country3']
}
const countries = ['Country1', 'Country2', 'Country3']
describe('should display the required text',()=>{
    beforeEach(()=>{
        render(<ActivityCard
            name='Name'
            difficulty='4'
            duration='Duration'
            season='Summer'
            countries={countries} />)
    });
    it('must show Difficulty',()=>{
        expect(screen.queryByText(/Difficulty/)).toBeInTheDocument();
    });
    it('should show the duration', () => {
        expect(screen.queryByText(/Duration/)).toBeInTheDocument();
    });
    it('should show the season',() => {
        expect(screen.queryByText(/Season/)).toBeInTheDocument();
    });
});