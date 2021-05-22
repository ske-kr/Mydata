import React from 'react';
import { shallow } from 'enzyme';

import Address from './address';
import { histroy } from '../../redux/reducer';

import axios from 'axios';

describe('address.js', () => {
    let address;
    let stubAddress;

    beforeEach(() => {
        stubAddress = [
            "test1",
            "test2"
        ];
    });
    afterEach(() => {jest.clearAllMocks()});


    it ('should fetch data', () => {
        axios.get = jest.fn(url => {
            return new Promise((resolve, reject) => {
                const result = {
                    status: 200,
                    data: stubAddress
                };
                resolve(result);
            });
        });


    });

});