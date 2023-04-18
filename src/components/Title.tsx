import { Button, Container, Stack } from 'react-bootstrap';
import About from './About';
import Link from 'next/link';
export default function Title() {
  return (
    <div id="title-card">
      <Container>
        <Stack direction="horizontal" style={{ gap: '89px' }}>
          <Stack>
            <h1 id="main-title">
              Remember
              <br />
              To <span id="vote-title">Vote</span>
            </h1>
            <Link href="#form-section" scroll={false}>
              <Button variant="register">Register for your reminder</Button>
            </Link>
          </Stack>
          <About />
        </Stack>
      </Container>
    </div>
  );
}
