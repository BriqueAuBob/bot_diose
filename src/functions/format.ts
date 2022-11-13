export default function (str: string, ...args: any[]): string {
  return str.replace(/{([0-9]+)}/g, function (match, index) {
    return typeof args[index] == "undefined" ? match : args[index];
  });
}
