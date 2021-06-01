export default function generateIp() {
  return `${Math.floor(Math.random() * 255) + 1}.${Math.floor(
    Math.random() * 255,
  )}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}
