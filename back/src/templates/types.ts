export type Button = {
  label: String; // 버튼에 적힐 문구
  action: 'block'; // 버튼 클릭시 수행될 작업
  messageText: String; // 블록 연결시 사용자의 발화로 노출될 문구
  blockId: String; // 호출할 블록의 id
}

export type ContextValue = {
  name: String;
  lifeSpan: Number;
  params: Object;
}
