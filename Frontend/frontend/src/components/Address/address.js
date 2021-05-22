import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../redux/address'

//bootstrap
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './address.css';

class Address extends React.Component {
  state = {
    address: '',
    selected_address: '',
    detailed_address: '',
    mode: 'ready'
  }
  ClickAddress = (address, X, Y) => {
    if (this.props.index != null){
      this.props.onSelectAddress(address, X, Y, this.props.index)
      this.setState({mode: 'done', selected_address: address})
    }
    else{
      this.props.onSelectAddress(address, X, Y)
      this.setState({selected_address: address, mode:'detail', address: ''})
    }
  }
  SearchAddress = () => {
    this.props.onGetAddress(this.state.address)
    this.setState({mode: 'search'})
  }
  render() {
    const addressLabel = this.props.index == null ? "address:" : (this.props.index%2 == 0 ? "start address" : "end address:");
    const addresses = this.props.storedAddress.map(
      (address) => (<div key={address.address.road} onClick={() => this.ClickAddress(address.address.road, address.point.x, address.point.y)}>{address.address.road}</div>))
    const detail = this.state.mode == 'ready' ? 
      <div>
        <label>{addressLabel}</label>
        <Form.Control 
          className="text-left"
          type="text"
          value={this.state.address}
          onChange={(event) => this.setState({ address: event.target.value })}
        />
        <Button onClick={() => this.SearchAddress()}>search address</Button>
      </div>
    : (this.state.mode == 'search' ?
      <div>
        <label>{addressLabel}</label>
        <Form.Control 
          className="text-left"
          type="text"
          value={this.state.address}
          onChange={(event) => this.setState({ address: event.target.value })}
        />
        <Button onClick={() => this.SearchAddress()}>search address</Button>
        {addresses}
      </div> 
    : ( this.state.mode == 'detail' ? 
      <span>
        <span>{this.state.selected_address}</span>
        <Button onClick={() => this.SearchAddress()}>search</Button>
        <label>detailed address</label>
        <Form.Control className="text-left" onChange={e => this.props.onDetailAddress(e.target.value)} >
        </Form.Control>
      </span>
    : <div>
      <label>{addressLabel}</label>
      {this.state.selected_address}
      <Button onClick={() => this.SearchAddress()}>search address</Button>
    </div>
    ))
    return (
      <Alert>{detail}</Alert>
    )
    
  }
}

const mapStateToProps = (state) => {
  return {
    storedAddress: state.adr.address,
  }
}

const mapDispatchToProps = (dispatch) => ({
  onGetAddress: (addr) => dispatch(actionCreators.searchAddress(addr)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Address));
