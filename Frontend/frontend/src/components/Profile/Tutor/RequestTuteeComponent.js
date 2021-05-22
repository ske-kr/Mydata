import React from 'react';

import Button from 'react-bootstrap/Button';

function RequestTuteeComponent(props) {
    return (
        <div>
            <p>{props.name}</p>
            <Button onClick={props.onClickDetail}>Detail</Button>
        </div>
    )
}
export default RequestTuteeComponent;