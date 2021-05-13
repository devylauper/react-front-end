import React, {useEffect, useState} from 'react';
import {Table, Pagination} from 'antd';
import PageLayout from '../layout/PageLayout';

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		render: (text, {redirect, id}) => (
			<div
				key={id}
				onClick={() => redirect(`/view/${id}`)}
				role="button"
				tabIndex={id}
				onKeyDown={() => {}}
				style={{cursor: 'pointer'}}
			>
				{text}
			</div>
		)
	}
];

const itemRender = (current, type, OriginalElement, onClick, page) => {
	if (type === 'prev' || type === 'next') {
		return (
			<div onClick={() => {}} role="button" tabIndex={0} onKeyDown={() => {}}>
				{null}
			</div>
		);
	}
	if (type === 'page') {
		return (
			<div
				key={current}
				onClick={() => onClick(current)}
				role="button"
				tabIndex={Number(current)}
				onKeyDown={() => {}}
				style={(page === current && {border: 'solid 1px #1890ff'}) || {}}
			>
				{current}
			</div>
		);
	}
	return OriginalElement;
};

const Paging = ({count, page = 1, onClick, pageSize = 3}) => (
	<Pagination
		total={count * pageSize}
		itemRender={(...args) => itemRender(...args, onClick, page)}
		showSizeChanger={false}
		defaultCurrent={Number(page)}
		pageSize={3}
		showTitle={false}
		style={{marginTop: '20px'}}
	/>
);

const Body = ({data, pageCount, post, redirect, setCurrentPage, page}) => {
	const [count, setCount] = useState();
	const [people, setPeople] = useState();
	useEffect(() => {
		if (pageCount) {
			setCount(pageCount);
		} else if (!pageCount) {
			post('{count}');
		}
	}, [pageCount]);
	useEffect(() => {
		if (data) {
			setPeople(data.map((p) => ({...p, redirect, key: p.id})));
		} else if (!people && !data) {
			post(`{people(page:1) {id,name,height,mass,gender,homeworld}}`);
		}
	}, [data]);
	useEffect(() => {
		post(`{people(page:${page}) {id,name,height,mass,gender,homeworld}}`);
	}, [page]);
	return (
		<>
			<Table
				columns={columns}
				dataSource={people || []}
				pagination={{position: ['none', 'none']}}
			/>
			<Paging count={count} page={page} onClick={setCurrentPage} />
		</>
	);
};

const Home = ({history: {push}}) => <PageLayout redirect={push} body={Body} />;

export default Home;
