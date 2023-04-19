import Image from 'next/image';
import ballotIcon from '../../assets/icon.svg';
import upArrow from '../../assets/up-arrow.svg';
import Link from 'next/link';

export default function Footer() {
  return (
    <div id="footer-background">
      <div id="footer">
        <Image src={ballotIcon} alt="ballot-icon"></Image>
        <p>
          Made for <a href="https://www.campaignlab.uk/">Campaign lab</a>
        </p>
        <p>
          Data provided in part by
          <a href="https://democracyclub.org.uk/"> Democracy Club. </a>
        </p>
        <p>Created by Curtis, Harry, Joe and Zac</p>
        <p id="gdpr-text">
          You can manage your preferences or unsubscribe at any time. We may use the information you
          provide, such as name and postcode, to match the data provided to your electoral register
          record held on our electoral database, which could inform future communications you
          receive from us. We may use your answers to help us campaign better. If signing up for an
          event, we may still use the details provided to contact you specifically about that event.
          If you would like to know more about how we use your information click{' '}
          <a href="https://labour.org.uk/privacy-policy">here</a>.
        </p>
        <Link href="#title-card" scroll={false}>
          <Image src={upArrow} alt="up-arrow" id="up-arrow"></Image>
        </Link>
      </div>
    </div>
  );
}
