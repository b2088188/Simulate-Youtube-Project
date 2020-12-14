import './spinner.scss';
import React from 'react';
import { Icon } from 'semantic-ui-react';

const Spinner = ({
	classStyle
}) => {
	return (
    <Icon loading name='spinner' size = 'huge' className = {classStyle}  />
		)
}

export default Spinner;