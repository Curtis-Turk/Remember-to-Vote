export default function VerifyPostcodeErrorMessage({
  verifyPostcodeMessage,
}: {
  verifyPostcodeMessage: string;
}) {
  return verifyPostcodeMessage.length ? <div>{verifyPostcodeMessage}</div> : <></>;
}
