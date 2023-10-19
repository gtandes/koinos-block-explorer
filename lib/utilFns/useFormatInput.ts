export function formatKoinosAddress(address: string): string {
  if (address.length < 9) {
    // Koinos addresses are typically 42 characters long, including the '0x' prefix
    return "Invalid Address";
  }

  const prefix = address.slice(0, 4);
  const suffix = address.slice(-4);

  return `${prefix}...${suffix}`;
}

export function formatNumberWithCommas(string: string): string {
  return string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
