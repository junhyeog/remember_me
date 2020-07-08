export default function simpleText(text: String) {
  return {
    version: '2.0',
    template: {
      outputs: [
        {
          simpleText: {
            text: text
          }
        }
      ]
    }
  };
}
