import styled, { keyframes } from 'styled-components';

function animationName(offset, direction) {    
    return keyframes`
    {
        0% {transform: translate(${offset}%, ${0}px)}
        100% {transform: translate(${offset + direction * 100}%, ${0}px)}
    }
    `
}

const StyledCSSAnimation = styled.div`
    animation-name: ${props => animationName(props.offset, props.direction)};
    animation-duration: ${props => props.duration}s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
`

export default StyledCSSAnimation;
