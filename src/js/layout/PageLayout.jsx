import React from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import {post as PostRequest, setCurrentPage as setPage} from '../redux/actions/request';

const {Header, Content, Footer} = Layout;

const mapStateToProps = ({request: {post, page = 1}}) => ({
	data: post.data,
	page,
	pageCount: post.count,
	isPosting: post.posting,
	isPostingComplete: post.posted
});

const mapDispatchToProps = (dispatch) => ({
	post: (query) => dispatch(PostRequest(query)),
	setCurrentPage: (page) => dispatch(setPage(page))
});

const PageLayout = ({
	post,
	body: Component,
	data,
	pageCount,
	redirect,
	personId,
	setCurrentPage,
	page
}) => (
	<Layout>
		<Header style={{color: 'white'}}>People</Header>
		<Content style={{padding: '50px'}}>
			<Component {...{post, data, pageCount, redirect, personId, setCurrentPage, page}} />
		</Content>
		<Footer />
	</Layout>
);
export default connect(mapStateToProps, mapDispatchToProps)(PageLayout);
