import { Button, Stack } from 'react-bootstrap';
import About from './About';

export default function Title() {
  return (
    <div id="title-card">
      <Stack direction="horizontal" style={{ gap: '89px' }}>
        <Stack>
          <h1 id="main-title">
            Remember
            <br />
            To <span id="vote-title">Vote</span>
          </h1>
          <Button variant="register">Register for your reminder</Button>
        </Stack>
        <About />
      </Stack>
    </div>
  );
}
