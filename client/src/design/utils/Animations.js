import styled, { css, keyframes } from 'styled-components';

export const setTransition = (
   { property, time, timing } = {
      property: 'all',
      time: '.25s',
      timing: 'linear'
   }
) => {
   return `transition: ${property} ${time} ${timing};`;
};

export const setFlowToRight = ({ color } = {}) => {
   return `
  &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: .3rem;
            background-color: ${color};
            top: 0;
            left: 0;
            transform: scaleY(0);            
            transition: transform .2s,
                width .4s cubic-bezier(1, 0, 0, 1) .2s;
        }

        &:hover::before {
            transform: scaleY(1);
            width: 100%;
        }
  `;
};
