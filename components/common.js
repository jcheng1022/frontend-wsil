'use client';
import styled from "@emotion/styled";

export const FlexBox  = styled.div`
  display: flex;
  
  ${props => {
    if (props.flip) {
        return `
          flex-direction: ${props.direction || 'row'} !important;
          @media only screen and (max-width: ${props.flip}px) {
            flex-direction: ${!props.direction ? 'column' : props.direction === 'row' ? 'column' : 'row'} !important;
          }
      `
    }
    return `
      flex-direction: ${props.direction || 'row'};
    `
}};
  ${props => {
    if (props.fluid) {
        return `width: 100%;`
    }
    return ''
}}
  flex-wrap: ${props => props.wrap || 'wrap'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'center'};
  flex: ${props => props.flex === undefined ? 1 : props.flex};
  gap: ${props => props.gap + 'px' || 'unset'};
  ${props => props.scrollX ? {"overflowX": "auto"} : {}};
`


export const Gap = styled.div`
  height: ${props => props.gap}px;
`
