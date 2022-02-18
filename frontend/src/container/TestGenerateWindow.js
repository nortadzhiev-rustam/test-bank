import React from 'react';
import {
  Grid,
  Paper,
  SpeedDial,
  Box,
  SpeedDialAction,
  Typography,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setFull, setVisible } from '../store/questionTypeSlice';
import {
  faCircle,
  faMinusCircle,
  faPlusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import 'animate.css';
import QuestionCard from '../components/QuestionCard';
import questions from '../constants/questions';
// eslint-disable-next-line
import html2canvas from 'html2canvas';
// eslint-disable-next-line
import { jsPDF } from 'jspdf';
const GenerateWindow = () => {
  const [mouseIn, setMouseIn] = React.useState(false);
  const [isHover, setHover] = React.useState(false);

  const handlePrint = () => {
    const input = document.getElementById('print');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save('test.pdf');
    });
  };

  const handleSave = () => {
    const input = document.getElementById('print');
    html2canvas(input, {
      windowHeight: input.scrollHeight,
      windowWidth: input.scrollWidth,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 10, 10);
      pdf.save('test.pdf');
    });
  };

  const handleShare = () => {
    const input = document.getElementById('print');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save('test.pdf');
    });
  };

  const handleCopy = () => {
    const input = document.getElementById('print');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save('test.pdf');
    });
  };

  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy', action: 'handleCopy' },
    { icon: <SaveIcon />, name: 'Save', action: 'handleSave' },
    { icon: <PrintIcon />, name: 'Print', action: 'handlePrint' },
    { icon: <ShareIcon />, name: 'Share', action: 'handleShare' },
  ];

  const handleSpeedDial = (action) => {
    if (action === 'handleCopy') {
      return handleCopy();
    } else if (action === 'handleSave') {
      return handleSave();
    } else if (action === 'handlePrint') {
      return handlePrint();
    } else if (action === 'handleShare') {
      return handleShare();
    } else {
      return null;
    }
  };

  const dispatch = useDispatch();
  const isFull = useSelector((state) => state.questionsType.isFull);

  const handleFullScreen = () => {
    dispatch(setFull(!isFull));
  };

  const handleMouseIn = () => {
    setMouseIn(true);
  };

  const handleClose = () => {
    dispatch(setVisible(false));
    setMouseIn(false);
    dispatch(setFull(false));
  };

  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={isFull ? 12 : 8}
      lg={isFull ? 12 : 8}
      xl={isFull ? 12 : 8}
    >
      <Paper
        elevation={isHover ? 10 : 2}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          minHeight: '82vh',
          paddingBottom: 40,
          borderRadius: 15,
          transition: 'all 0.5s ease-in-out',
        }}
        className='animate__animated animate__zoomIn animate__faster'
      >
        <Box
          style={{
            display: 'flex',
            position: 'relative',

            margin: 0,
            padding: 0,
          }}
        >
          <Paper
            elevation={2}
            style={{
              width: '100%',
              minHeight: 70,
              backgroundColor: '#eceff1',
              textAlign: 'start',
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
              paddingInline: 20,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              {mouseIn ? (
                <FontAwesomeIcon
                  size='lg'
                  style={{ borderRadius: '50%' }}
                  onClick={handleClose}
                  color='#e63946'
                  icon={faTimesCircle}
                  onMouseLeave={() => setMouseIn(!mouseIn)}
                />
              ) : (
                <FontAwesomeIcon
                  size='lg'
                  color='#e63946'
                  icon={faCircle}
                  onMouseOver={handleMouseIn}
                />
              )}

              {mouseIn ? (
                <FontAwesomeIcon
                  size='lg'
                  style={{
                    marginLeft: 5,

                    borderRadius: '50%',
                  }}
                  color='#ee9b00'
                  icon={faMinusCircle}
                  onMouseLeave={() => setMouseIn(!mouseIn)}
                />
              ) : (
                <FontAwesomeIcon
                  size='lg'
                  style={{ marginLeft: 5 }}
                  color='#ee9b00'
                  icon={faCircle}
                  onMouseOver={handleMouseIn}
                />
              )}

              {mouseIn ? (
                <FontAwesomeIcon
                  size='lg'
                  style={{
                    marginLeft: 5,
                    borderRadius: '50%',
                    border: 'none',
                  }}
                  color='#43aa8b'
                  icon={faPlusCircle}
                  onClick={handleFullScreen}
                  onMouseLeave={() => setMouseIn(!mouseIn)}
                />
              ) : (
                <FontAwesomeIcon
                  size='lg'
                  style={{ marginLeft: 5 }}
                  color='#43aa8b'
                  icon={faCircle}
                  onMouseOver={handleMouseIn}
                />
              )}
            </div>
            <Typography variant='h6' fontFamily='roboto' fontWeight='900'>
              Test Generate Window
            </Typography>
          </Paper>
        </Box>

        <Box
          sx={{
            minHeight: '76vh',
            transform: 'translateZ(0px)',
            flexGrow: 1,
          }}
        >
          <Box id='print'>
            {questions.map((question, idx) => (
              <QuestionCard
                key={idx}
                question={question.question}
                answer={{
                  answerA: question.answerA,
                  answerB: question.answerA,
                  answerC: question.answerC,
                  answerD: question.answerD,
                }}
              />
            ))}
          </Box>
          <SpeedDial
            ariaLabel='SpeedDial basic example'
            sx={{ position: 'absolute', bottom: -70, right: 15 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={() => handleSpeedDial(action.action)}
              />
            ))}
          </SpeedDial>
        </Box>
      </Paper>
    </Grid>
  );
};

export default GenerateWindow;
