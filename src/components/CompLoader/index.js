import React from 'react';
import { Dimmer, Loader} from 'semantic-ui-react';
import './comploader.scss';

const CompLoader = () => (
    <div id="loader">
        <Dimmer active>
            <Loader>Loading</Loader>
        </Dimmer>
    </div>
);

export default CompLoader;