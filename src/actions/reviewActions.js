// import actionTypes from '../constants/actionTypes';
// import runtimeEnv from '@mars/heroku-js-runtime-env';
//
// export function submitReview(data){
//     const env = runtimeEnv();
//     return dispatch => {
//         return fetch(`${env.REACT_APP_API_URL}/review/${movieId}`, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization': localStorage.getItem('token')
//             },
//             body: JSON.stringify(data),
//             mode: 'cors'})
//             .then( (response) => {
//                 if (!response.ok) {
//                     throw Error(response.statusText);
//                 }
//                 return response.json();
//             })
//             .then( (res) => {
//
//                 dispatch(submitReview(data));
//             })
//             .catch( (e) => console.log(e) );
//     }
// }