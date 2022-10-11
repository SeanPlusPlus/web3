export const truncatePublicKey = (str) => (
  `0x...${str.substr(str.length - 4)}`
)