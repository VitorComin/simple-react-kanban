export function checkEnterKeyAndBlurElement(
  event: React.KeyboardEvent<HTMLInputElement>
) {
  if (event.key === "Enter") {
    event.currentTarget.blur();
  }
}
