import { number } from 'prop-types';
import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import styled from 'styled-components';

type TransitionProps = CSSTransitionProps & {
  animation?: 'fw-animation-opacity' | 'fw-animation-pulldown' | 'fw-animation-pull-left';
  timeout: number;
};

const Transition: FC<TransitionProps> = ({ children, timeout, animation, ...restProps }) => {
  return (
    <StyleWrapper time={Number(timeout)}>
      <CSSTransition {...restProps} timeout={timeout} classNames={animation}>
        {children}
      </CSSTransition>
    </StyleWrapper>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
  animation: 'fw-animation-opacity',
};

export default Transition;

interface TransitionStyleProps {
  time?: number;
}

const StyleWrapper = styled.div<TransitionStyleProps>`
  .fw-animation-opacity-enter {
    opacity: 0;
  }
  .fw-animation-opacity-enter-active {
    opacity: 1;
    transition: opacity ${(props) => props.time + 'ms'} cubic-bezier(0.23, 1, 0.32, 1) 100ms;
  }
  .fw-animation-opacity-exit {
    opacity: 1;
  }
  .fw-animation-opacity-exit-active {
    opacity: 0;
    transition: opacity ${(props) => props.time + 'ms'} cubic-bezier(0.23, 1, 0.32, 1) 100ms;
  }

  .fw-animation-pulldown-enter {
    transform: scaleY(0);
  }
  .fw-animation-pulldown-enter-active {
    transform: scaleY(1);
    transform-origin: top;
    transition: transform ${(props) => props.time + 'ms'} cubic-bezier(0.23, 1, 0.32, 1) 100ms;
  }
  .fw-animation-pulldown-exit {
    transform: scaleY(1);
  }
  .fw-animation-pulldown-exit-active {
    transform: scaleY(0);
    transform-origin: top;
    transition: transform ${(props) => props.time + 'ms'} cubic-bezier(0.23, 1, 0.32, 1) 100ms;
  }

  .fw-animation-pull-left-enter {
    transform: scaleX(0);
  }
  .fw-animation-pull-left-enter-active {
    transform: scaleX(1);
    transform-origin: left;
    transition: all ${(props) => props.time + 'ms'} cubic-bezier(0.23, 1, 0.32, 1) 100ms;
  }
  .fw-animation-pull-left-exit {
    transform: scaleX(1);
  }
  .fw-animation-pull-left-exit-active {
    transform: scaleX(0);
    transform-origin: left;
    transition: all ${(props) => props.time + 'ms'} cubic-bezier(0.23, 1, 0.32, 1) 100ms;
  }
`;
