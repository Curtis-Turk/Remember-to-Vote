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

export default function Title() {
  const isMobileBreakpoint = useMediaQuery(600);
  const renderStack = () => {
    if (isMobileBreakpoint) {
      return (
        <Stack>
          <Image src={ballotIcon} alt="ballot-icon"></Image>
          <h1 id="main-title">
            Remember
            <br />
            to&nbsp;<Image src={pinkOval} alt="vote-circle" id="pink-oval"></Image>
            <span id="vote-title">Vote</span>
          </h1>
          <Link href="#form-section" scroll={false}>
            <Button variant="register">Register for your reminder</Button>
          </Link>
          <About />
          <Link href="#form-section" scroll={false}>
            <Image src={downArrow} alt="down-arrow"></Image>
          </Link>
          <Image src={ballotBox} alt="ballot-box" id="ballot-box"></Image>
        </Stack>
      );
    }
    return (
      <Stack direction="horizontal" id="title-stack">
        <Stack>
          <Image src={ballotIcon} alt="ballot-icon"></Image>
          <h1 id="main-title">
            Remember
            <br />
            to&nbsp;<Image src={pinkOval} alt="vote-circle" id="pink-oval"></Image>
            <span id="vote-title">Vote</span>
          </h1>
          <Link href="#form-section" scroll={false}>
            <Button variant="register">Register for your reminder</Button>
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
    );
  };

  return (
    <div id="title-card">
      <Image src={headerEllipse} alt="header-ellipse" id="header-ellipse"></Image>
      <Container id="title-container">{renderStack()}</Container>
    </div>
  );
}
