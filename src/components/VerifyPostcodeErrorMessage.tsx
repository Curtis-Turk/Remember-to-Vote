export default function VerifyPostcodeErrorMessage({
  verifyPostcodeMessage,
}: {
  verifyPostcodeMessage: string;
}) {
  return verifyPostcodeMessage.length ? (
    <div id="verify-postcode-message">{verifyPostcodeMessage}</div>
  ) : (
    <></>
  );
}
