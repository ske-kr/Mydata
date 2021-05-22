import React from 'react';

function ReviewBody(props) {
    return (
        <div>
            <h2>{props.title}</h2>
            <p>{props.content}</p>
        </div>
    )
}
export default ReviewBody;