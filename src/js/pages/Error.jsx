import React from 'react';
import {Card} from 'antd';
import PageLayout from '../layout/PageLayout';
import HomeButton from '../components/homeButton';

const Body = ({errorCode = 404, redirect}) => (
	<Card title="Error" extra={<HomeButton redirect={redirect} />} style={{width: 300}}>
		<h1>{errorCode}</h1>
		<p>This is not the result you are looking for.</p>
	</Card>
);

const Error = ({
	history: {push},
	match: {
		params: {personId}
	}
}) => <PageLayout redirect={push} body={Body} personId={personId} />;

export default Error;
