import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem,  } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";
import {submitReview} from "../actions/movieActions";
//import {fetchReview} from "../actions/reviewActions"
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

//support routing by creating a new component

class Movie extends Component {

    constructor(){
        super();
        this.updateDetails = this.updateDetails.bind(this);
        this.review = this.review.bind(this);
        this.state = {
            details:{
                username: '',
                movie: '',
                quote: '',
                rate: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    review(){
        const {dispatch} = this.props;
        dispatch(submitReview(this.props.movieId ,this.state.details));
    }

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedMovie == null)
            dispatch(fetchMovie(this.props.movieId))
            //dispatch(fetchReview(this.props.movieId))
    }

    render() {
        const ActorInfo = ({actors}) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.actorName}</b> {actor.characterName}
                </p>
            );
        };

        const ReviewInfo = ({reviews}) => {
            return reviews.map((review, i) =>
                <p key={i}>
                <b>{review.reviewer}</b> {review.quote}
                    <Glyphicon glyph={'star'} /> {review.rate}
                </p>
            );
        }

        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Form horizontal>
                        <FormGroup controlId="quote">
                            <Col componentClass={ControlLabel} sm={2}>
                                Quote
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    // onChange={this.updateDetails}
                                    // value={this.state.details.quote}
                                    type="text"
                                    placeholder=" Enter Quote"
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="rating">
                            <Col componentClass={ControlLabel} sm={2}>
                                Star Rating 1 - 5
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    value={this.state.details.rate}
                                    placeholder="Enter rating 1 - 5"
                                    onChange={this.updateDetails}

                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>

                            <Col smOffset={2} sm={10}>
                                <Button>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    <Panel.Heading>Movie Detail</Panel.Heading>

                    <Panel.Body><Image className="image" src={currentMovie.imageURL} thumbnail /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentMovie.title}</ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.actors} /></ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'} /> {currentMovie.avgRating} </h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Body><ReviewInfo reviews={currentMovie.review} /></Panel.Body>
                    <Panel.Body>
                    </Panel.Body>
                </Panel>
            );
        };
        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        //selectedReview: state.review.selectedReview,
        //selectedReviews: state.reviews.selectedReviews,
        movieId: ownProps.match.params.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));