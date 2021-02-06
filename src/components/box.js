/* eslint-disable prettier/prettier */
import { View } from 'react-native';
import styled from 'styled-components';
import { compose, color, size, space, flexbox, borderRadius } from 'styled-system';

const Box = styled(View)(
    compose(
        borderRadius,
        flexbox,
        color,
        size,
        space
    ),
);
export default Box;