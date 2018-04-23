import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function reviewsFetched(reviews){
    return {
        type: actionTypes.FETCH_REVIEWS,
        reviews: reviews
    }
}

function reviewFetched(review){
    return {
        type: actionTypes.FETCH_REVIEW,
        selectedReview: review
    }
}

function reviewSet(review){
    return {
        type: actionTypes.SET_REVIEW,
        selectedReview: review
    }
}

export function setReview(review) {
    return dispatch => {
        dispatch(reviewSet(review));
    }
}

export function fetchReviews(){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/reviews`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(reviewsFetched(res));
            })
            .catch( (e) => console.log(e) );
    }
}

export function fetchReview(movieId){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movie/${movieId}?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(reviewFetched(res));
            })
            .catch( (e) => console.log(e) );
    }
}