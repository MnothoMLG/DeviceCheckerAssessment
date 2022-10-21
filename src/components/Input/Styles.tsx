import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {colors} from '../../theme';

export const InputLabel = styled.Text`
  color: rgba(76, 179, 233, 0.75);
  font-size: 14px;
  align-self: flex-start;
  margin-bottom: 8px;
`;

export default StyleSheet.create({
  container: {
    height: 52,
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    borderColor: colors.background.primary,
    borderRadius: 5,
    borderWidth: 2,
    alignItems: 'center',
  },
  brightBorder: {
    borderColor: 'rgba(76, 179, 233, 0.75)',
  },
  input: {
    height: 52,
    flex: 1,
    borderRadius: 5,
    padding: 4,
    fontSize: 15,
    color: colors.background.secondary,
  },
  error: {
    alignSelf: 'flex-start',
    fontSize: 10,
    marginTop: 4,
    color: 'red',
  },
});
