import { Button, Stack } from 'react-bootstrap';
import About from './About';

export default function Title() {
  return (
    <div id="title-card">
      <Stack direction="horizontal">
        <Stack>
          <h1 id="main-title">
            Remember <br />
            To <span id="vote-title">Vote</span>
          </h1>
          <Button>Register for your reminder</Button>
        </Stack>
        <About />
      </Stack>
    </div>
  );
}
