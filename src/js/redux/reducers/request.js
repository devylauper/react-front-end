import {POST_DATA_SUCCESS, POST_DATA_FAILURE, POSTING_DATA, SET_PAGE} from '../actions/request';

class Reducer {
	constructor(actions) {
		const keyMaster = Object.keys(actions)[0];
		this.actions = Object.keys(actions[keyMaster]).reduce((acc, cur) => {
			const key = cur.replace(keyMaster, 'ITEM');
			return {
				...acc,
				[key]: actions[keyMaster][cur]
			};
		}, {});
		this.initialState = {
			post: {
				error: null,
				posting: false,
				posted: false,
				data: undefined,
				count: undefined
			}
		};
	}

	setState(currentState, action) {
		const state = currentState || this.initialState;
		switch (action.type) {
			case this.actions.POSTING_ITEM:
				return {
					...state,
					post: {
						...state.post,
						data: null,
						error: null,
						posting: true,
						posted: false
					}
				};

			case this.actions.POST_ITEM_SUCCESS:
				if (action.payload.count) {
					return {
						...state,
						post: {
							...state.post,
							error: null,
							posting: false,
							posted: true,
							count: action.payload.count
						}
					};
				}

				return {
					...state,
					post: {
						...state.post,
						data: action.payload.search || action.payload.people,
						error: null,
						posting: false,
						posted: true
					}
				};

			case this.actions.POST_ITEM_FAILURE:
				return {
					...state,
					post: {
						...state.post,
						data: null,
						error: action.payload,
						posting: false,
						posted: true
					}
				};

			default:
				return state;
		}
	}
}

const reducer = new Reducer({
	DATA: {
		POST_DATA_SUCCESS,
		POST_DATA_FAILURE,
		POSTING_DATA
	}
});

export default function (state, action) {
	switch (action.type) {
		case SET_PAGE:
			return {
				...state,
				page: action.page
			};

		default:
			return reducer.setState(state, action);
	}
}
