/* eslint-disable prettier/prettier */
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { compose, color, size, space, flexbox, layout, borderRadius } from 'styled-system';

const Button = styled(TouchableOpacity)(
    compose(
        borderRadius,
        flexbox,
        color,
        size,
        space,
        layout
    ),
);
Button.defaultProps = {
    flexDirection: 'row',
    alingItems: 'center',
    justifyContent: 'center',
};
export default Button;