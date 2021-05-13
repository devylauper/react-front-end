import React, {useEffect} from 'react';
import {Card} from 'antd';
import PageLayout from '../layout/PageLayout';
import HomeButton from '../components/homeButton';

const Body = ({data, personId, redirect, post}) => {
	useEffect(() => {
		if (!data) {
			post(`{people(page:1) {id,name,height,mass,gender,homeworld}}`);
		}
	}, [data]);

	const person = (data && data.filter(({id}) => personId === id)[0]) || {};
	return (
		<Card title="Person" extra={<HomeButton redirect={redirect} />} style={{width: 300}}>
			<p>Name: {person.name || '-'}</p>
			<p>Height: {person.height || '-'}</p>
			<p>Mass: {person.mass || '-'}</p>
			<p>Gender: {person.gender || '-'}</p>
			<p>Homeworld: {person.homeworld || '-'}</p>
		</Card>
	);
};

const Detail = ({
	history: {push},
	match: {
		params: {personId}
	}
}) => <PageLayout redirect={push} body={Body} personId={personId} />;

export default Detail;
