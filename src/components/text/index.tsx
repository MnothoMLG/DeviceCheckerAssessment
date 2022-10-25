import {colors} from '../../theme';
import {FC} from 'react';
import {TextProps, Text as RnText} from 'react-native';
import styled from 'styled-components/native';

interface Props extends TextProps {
  bold?: boolean;
  align?: string;
  xtraBold?: boolean;
  size?: number;
  color?: string;
  ml?: number;
  mb?: number;
  mt?: number;
  fw?: number;
  mr?: number;
  lh?: number;
}
export const Text: FC<Props> = styled(RnText)`
  font-size: ${(props: Props) => `${props.size ? props.size : 13}px`};
  flex-wrap: wrap;
  text-align: ${(props: Props) => (props.align ? props.align : 'left')};
  font-weight: ${(props: Props) =>
    `${props.bold ? '600' : props.xtraBold ? '700' : '500'}`};
  margin-left: ${(props: Props) => `${props.ml || 0}px`};
  margin-right: ${(props: Props) => `${props.mr || 0}px`};
  margin-bottom: ${(props: Props) => `${props.mb || 0}px`};
  margin-top: ${(props: Props) => `${props.mt || 0}px`};
  line-height: ${(props: Props) => `${props.lh ? `${props.lh}px` : undefined}`};
  color: ${(props: Props) => props.color || colors.typography.static};
`;
