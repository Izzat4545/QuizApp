export default function generateFourDigitId() {
  const randomId = Math.floor(1000 + Math.random() * 9000);
  return randomId;
}
