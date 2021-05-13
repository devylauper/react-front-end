export const POST_DATA_SUCCESS = 'POST_DATA_SUCCESS';
export const POST_DATA_FAILURE = 'POST_DATA_FAILURE';
export const POSTING_DATA = 'POSTING_DATA';
export const SET_PAGE = 'SET_PAGE';

// eslint-disable-next-line no-undef
const apiUrl = `${API_URL}/graphql`;

class Action {
	constructor(actions, apiUrl) {
		this.apiUrl = apiUrl;
		const keyMaster = Object.keys(actions)[0];
		this.actions = Object.keys(actions[keyMaster]).reduce((acc, cur) => {
			const key = cur.replace(keyMaster, 'ITEM');
			return {
				...acc,
				[key]: actions[keyMaster][cur]
			};
		}, {});
	}

	postData(body, headers) {
		return fetch(`${this.apiUrl}`, {
			method: 'POST',
			headers: {
				...headers,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		}).then((response) => {
			if (!response.ok) {
				throw response.json();
			}
			return response.json();
		});
	}

	postingItem() {
		return {
			type: this.actions.POSTING_ITEM
		};
	}

	postItem(values) {
		return (dispatch) => {
			dispatch(this.postingItem());
			this.postData(values)
				.then((res) => {
					dispatch(this.postItemSuccess(res.data));
				})
				.catch((err) => {
					dispatch(this.postItemFailure(err));
				});
		};
	}

	postItemSuccess(payload) {
		return {
			type: this.actions.POST_ITEM_SUCCESS,
			payload
		};
	}

	postItemFailure(payload) {
		return {
			type: this.actions.POST_ITEM_FAILURE,
			payload
		};
	}
}

const action = new Action(
	{
		DATA: {
			POST_DATA_SUCCESS,
			POST_DATA_FAILURE,
			POSTING_DATA
		}
	},
	apiUrl
);

export function post(query) {
	return action.postItem({query});
}

export function setCurrentPage(page) {
	return {
		type: SET_PAGE,
		page
	};
}
