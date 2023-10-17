export function addDecimal8Digits(inputString: string): string {
  // Convert the string to a number
  const numberValue = parseFloat(inputString);

  if (isNaN(numberValue)) {
    throw new Error("Invalid input. Cannot convert to a number.");
  }

  // Add 8 decimal places to the number and convert it back to a string
  const result = numberValue.toFixed(8);

  return result;
}
