import React from 'react';
import { observer } from 'mobx-react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Layout = styled.View`
position: absolute;
left: 0;
right: 0;
top: 0;
bottom: 0;
z-index: ${Number.MAX_SAFE_INTEGER};
justify-content: center;
align-items: center;
background-color: ${'#00000050'};
`;

const Loader: React.FC = observer(() => {
    return (
        <Layout>
            <ActivityIndicator
                size='large'
                color='white'
            />
        </Layout>
    );
});

export default Loader;