import { Button, Container, Stack } from 'react-bootstrap';
import About from './About';
import Link from 'next/link';
import Image from 'next/image';
import ballotIcon from '../../assets/icon.svg';
import pinkOval from '../../assets/pink oval line.svg';
import ballotBox from '../../assets/Ballot box.svg';
import headerEllipse from '../../assets/header.svg';

export default function Title() {
  return (
    <div id="title-card">
      <Image src={headerEllipse} alt="header-ellipse" id="header-ellipse"></Image>
      <Container id="title-container">
        <Stack direction="horizontal" id="title-stack">
          <Stack>
            <Image src={ballotIcon} alt="ballot-icon"></Image>
            <h1 id="main-title">
              Remember
              <br />
              To&nbsp;<Image src={pinkOval} alt="vote-circle" id="pink-oval"></Image>
              <span id="vote-title">Vote</span>
            </h1>
            <Link href="#form-section" scroll={false}>
              <Button variant="register">Register for your reminder</Button>
            </Link>
            <Image src={ballotBox} alt="ballot-box"></Image>
          </Stack>
          <About />
        </Stack>
      </Container>
    </div>
  );
}
