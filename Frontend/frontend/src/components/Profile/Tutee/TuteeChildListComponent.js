import React from 'react';

import Button from 'react-bootstrap/Button'

function TuteeChildListComponent(props) {
    return (
        <div>
            <p>{props.name}</p>
            <Button variant="outline-dark" onClick={props.onClickMatching}>Request tutor</Button>
        </div>
    )
}
export default TuteeChildListComponent;