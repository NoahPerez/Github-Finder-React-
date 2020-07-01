import React, { Fragment } from 'react';
import spinner from './Spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt="loading..."
      style={{ width: '100px', margin: 'auto', display: 'block' }}
    />
  </Fragment>
);
export default Spinner;
