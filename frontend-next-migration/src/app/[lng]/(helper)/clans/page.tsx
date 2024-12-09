//todo why this one , when we are in the clans' main page
import { ClanAllSubPage } from '@/preparedPages/ClanPages';
import { withPageData, createMetadataGenerator } from '@/app/_helpers';
import { _getPage } from './_getPage';
import React from 'react';

const ClansPage = () => {
    return (
        <div>
            <h2>Children</h2>
            <p>page for the clans layout.</p>
        </div>
    );
};

export default ClansPage;

//export const generateMetadata = createMetadataGenerator(_getPage);
//export default withPageData(ClanAllSubPage, _getPage);
