import { css } from 'styled-components';
import { colorGrey } from '../utils/colors';

export const setShadow = {
   light: '0 2rem 5rem rgba(0, 0, 0, .06)',
   lightshallow: '0 1rem 2rem rgba(0, 0, 0, .06)',
   dark: '0 2rem 5rem rgba(0, 0, 0, .3)',
   darkshallow: '0 1rem 2rem rgba(0, 0, 0, .3)'
};

export const setPadding = ({ x, y } = {}) => {
   return css`
      padding: ${y} ${x};
   `;
};

export const setMargin = ({ x, y } = {}) => {
   return css`
      margin: ${y} ${x};
   `;
};

export const setBorder = ({
   position = 'border',
   style = 'solid',
   color = colorGrey.light4,
   value = '.1rem'
} = {}) => {
   return css`
      ${position}: ${style} ${value} ${color};
   `;
};

export const setFlexWidth = ({ width, mx, my } = {}) => {
   return css`
      flex: 0 0 ${width}%;
   `;
};

export const setSize = ({ width, height } = {}) => {
   return css`
      width: ${width};
      height: ${height};
   `;
};
