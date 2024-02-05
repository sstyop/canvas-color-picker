import styled from 'styled-components';

export const ColorPickerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;

  .navigation-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5rem;
    width: -webkit-fill-available;
    
    label {
      font-size: 1.25rem;
      font-weight: 700;
      cursor: pointer;
    }
  }

  .canvas-block {
    display: flex;
    justify-content: center;
    width: 100%;
    overflow: auto;
    margin: 1rem;

      canvas {
        width: fit-content;
        background: #ddd;
    }
  }

  
`