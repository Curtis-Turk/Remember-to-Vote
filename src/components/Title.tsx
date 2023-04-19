import { Button, Container, Stack } from 'react-bootstrap';
import About from './About';
import Link from 'next/link';
import Image from 'next/image';
import ballotIcon from '../../assets/icon.svg';
import pinkOval from '../../assets/pink oval line.svg';
import ballotBox from '../../assets/Ballot box.svg';
import headerEllipse from '../../assets/header.svg';
import downArrow from '../../assets/down-arrow.svg';
import useMediaQuery from '../../lib/useMediaQuery';
import pinkOvalMobile480 from '../../assets/pink-oval-line-mobile.svg';
import pinkOvalMobile600 from '../../assets/pink-oval-line-mobile-600.svg';
import pinkOvalMobile525 from '../../assets/pink-oval-line-mobile-525.svg';

export default function Title() {
  const isMobile600Breakpoint = useMediaQuery(600);
  const isMobile525Breakpoint = useMediaQuery(525);
  const isMobile480Breakpoint = useMediaQuery(480);
  return (
    <div id="title-card">
      <Image src={headerEllipse} alt="header-ellipse" id="header-ellipse"></Image>
      <Container id="title-container">
        {/* mobile */}
        <Stack className="mobile">
          <Image src={ballotIcon} alt="ballot-icon"></Image>
          <h1 id="main-title">
            Remember
            <br />
            to&nbsp;
            {/* 600 width */}
            <Image
              src={pinkOvalMobile600}
              alt="vote-circle"
              className="pink-oval"
              id="pink-oval-600"
            />
            {/* 525 width */}
            <Image
              src={pinkOvalMobile525}
              alt="vote-circle"
              className="pink-oval"
              id="pink-oval-525"
            />
            {/* 480 width */}
            <Image
              src={pinkOvalMobile480}
              alt="vote-circle"
              className="pink-oval"
              id="pink-oval-480"
            />
            <span id="vote-title">Vote</span>
          </h1>
          <Link href="#form-section" scroll={false}>
            <Button variant="register" className="btn-register-mobile">
              Register for your reminder
            </Button>
          </Link>
          <About />
        </Stack>
        {/* desktop */}
        <Stack direction="horizontal" id="title-stack" className="desktop">
          <Stack>
            <Image src={ballotIcon} alt="ballot-icon"></Image>
            <h1 id="main-title">
              Remember
              <br />
              to&nbsp;
              <Image src={pinkOval} alt="vote-circle" className="pink-oval desktop"></Image>
              <span id="vote-title">Vote</span>
            </h1>
            <Link href="#form-section" scroll={false}>
              <Button variant="register" className="btn-register-desktop">
                Register for your reminder
              </Button>
            </Link>
            <Image src={ballotBox} alt="ballot-box" id="ballot-box"></Image>
          </Stack>
          <Stack>
            <About />
            <Link href="#form-section" scroll={false}>
              <Image src={downArrow} alt="down-arrow"></Image>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
