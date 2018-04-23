import constants from '../constants/actionTypes'

var initialState = {
    reviews: [],
    selectedReview: null
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state);

    switch(action.type) {
        case constants.FETCH_REVIEWS:
            updated['reviews'] = action.reviews;
            updated['selectedReviews'] = action.reviews[0];
            return updated;
        case constants.SET_REVIEW:
            updated['selectedReview'] = action.selectedReview;
            return updated;
        case constants.FETCH_REVIEW:
            updated['selectedReview'] = action.selectedReview;
            return updated;
        default:
            return state;
    }
}