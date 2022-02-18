import React from 'react';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { styled } from '@mui/styles';
const GridContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: 2,
});

const TextDiv = styled('div')({
  height: 60,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 2,
  borderRadius: 10,
  cursor: 'pointer',
});
const PaperItem = styled(Paper)({
  borderRadius: 15,
  marginBottom: 20,
  transition: 'all 0.5s ease-in-out',
  padding: 5,
});

const Switcher = ({ setSwitch, isSwitch }) => {
  const [isMouseIn, setMouseIn] = React.useState(false);

  const handleSwitch = (sw) => {
    setSwitch(sw);
  };

  return (
    <PaperItem
      elevation={isMouseIn ? 8 : 2}
      onMouseEnter={() => setMouseIn(true)}
      onMouseLeave={() => setMouseIn(false)}
    >
      <GridContainer container>
        <Grid item xs={6}>
          <TextDiv
            style={{
              backgroundColor: isSwitch === 'generate' ? '#006064' : 'white',
            }}
            onClick={() => handleSwitch('generate')}
          >
            <h2 style={{ color: isSwitch === 'generate' && '#fff' }}>Insert</h2>
          </TextDiv>
        </Grid>
        <Grid item xs={6}>
          <TextDiv
            style={{
              backgroundColor: isSwitch === 'insert' ? '#006064' : 'white',
              paddingInline: 5,
            }}
            onClick={() => handleSwitch('insert')}
          >
            <h2 style={{ color: isSwitch === 'insert' && '#fff' }}>Generate</h2>
          </TextDiv>
        </Grid>
      </GridContainer>
    </PaperItem>
  );
};

export default Switcher;
