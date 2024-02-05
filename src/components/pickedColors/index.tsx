import styled from 'styled-components';

type PickedColorsBlockProps = {
  pickedColors: string[];
}
const PickedColorsBlockStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  
  .picked-colors {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;
    margin:1rem 0 3rem;
  }
`

export const PickedColorsBlock: React.FC<PickedColorsBlockProps> = ({ pickedColors }) => {

  return (
    <PickedColorsBlockStyle>
      <h2 className='title'>Picked Colors</h2>
      <div className='picked-colors' >{
        pickedColors.map((color, index) => {
          return <SinglePickedColor key={index} color={color} />
        }
        )
      }</div>
    </PickedColorsBlockStyle>
  )
}

const SinglePickedColorStyle = styled.p`
    padding: 2rem 1rem;
    font-size:1rem;
    text-align: center;
    color: #fff;
    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.4);
    border-radius: 0.25rem;
    text-shadow: 0px 0px 4px #000;
`;

function SinglePickedColor({ color }: { color: string }) {
  return <SinglePickedColorStyle style={{ background: `#${color}` }}>#{color}</SinglePickedColorStyle>;
}
