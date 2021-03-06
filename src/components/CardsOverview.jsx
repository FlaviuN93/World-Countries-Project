import React, { useEffect } from 'react';
import CardComponent from './CardComponent';
import { useSelector, useDispatch } from 'react-redux';

import './CardsOverview.css';
import { getAllCountries } from '../redux/countriesReducer/countryAction';
import LoadingSpinner from './LoadingSpinner';
import { useParams } from 'react-router';
import Message from './Message';

const CardsOverview = () => {
	const params = useParams();
	const { keyword, category } = params;
	const dispatch = useDispatch();
	const { loading, error, countries } = useSelector(
		(state) => state.countriesInfo
	);
	const {
		filteredCountries,
		success,
		reset,
		error: filterError,
	} = useSelector((state) => state.filteredCountries);

	useEffect(() => {
		dispatch(getAllCountries(keyword, category));
		if (reset) {
			dispatch(getAllCountries(keyword, category));
		}
	}, [dispatch, keyword, category, reset]);

	return (
		<div className='cards-overview'>
			{filterError ? (
				<Message error={filterError}>No results. Try again</Message>
			) : success ? (
				filteredCountries.map((country, index) => (
					<CardComponent key={index} country={country}></CardComponent>
				))
			) : loading ? (
				<LoadingSpinner />
			) : error ? (
				<Message>Results not found. Try again </Message>
			) : (
				countries.map((country, index) => (
					<CardComponent key={index} country={country}></CardComponent>
				))
			)}
		</div>
	);
};

export default CardsOverview;
