import React from 'react';
import styled from 'styled-components';

import FuncExplan from './FuncExplan';
import ChipArray from './ChipArray';

const FuncDiv = styled.div`
  margin-top : 10px;
`;
const ChipDiv = styled.div`
  margin-top : 50px;
`;


const Explanation = () => {
  return (
    
    <div>
      <FuncDiv>
        <FuncExplan />
      </FuncDiv>
      <ChipDiv>
        <ChipArray />
      </ChipDiv>
    </div>
  );
}

export default Explanation;
    