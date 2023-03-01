import { useEffect } from 'react';
import { useListingsContext } from '../hooks/useListingsContext';
import ListingsFeed from '../components/ListingsFeed';
import CreateForm from '../components/CreateForm';
import "./ListingsFeed.css";

const Listings = () => {
    const { listings,  dispatch } = useListingsContext();

    // post request to create a new listing
    const createListing = async (listing) => {
        const response = await fetch('/api/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(listing)
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: 'CREATE_LISTING', payload: json });
        } else {
            dispatch({ type: 'SET_ERROR', payload: json });
        }
    }

    useEffect(() => {
        const fetchListings = async () => {
            const response = await fetch('/api/listings');
            const json = await response.json();
            
            if (response.ok) {
                dispatch({ type: 'SET_LISTINGS', payload: json });
            } else {
                dispatch({ type: 'SET_ERROR', payload: json });
            }
        }
        fetchListings();
    }, [dispatch]);

    return (
        <div className="listings">
            <h2>LISTINGS</h2>
            <CreateForm 
                createListing={createListing}
                buttonTitle="Create Listing"
            />
            {listings && listings.map((listing) => (
                <ListingsFeed key={listing._id} listing={listing} />
            ))}
        </div>
    )
}

export default Listings;