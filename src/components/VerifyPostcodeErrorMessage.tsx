export default function VerifyPostcodeErrorMessage({
  verifyPostcodeMessage,
}: {
  verifyPostcodeMessage: string;
}) {
  if (verifyPostcodeMessage.length) {
    return <div>{verifyPostcodeMessage}</div>;
  }
  return <></>;
}
