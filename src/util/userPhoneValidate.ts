export const userPhoneValidate = (input: string): string => {
  let value = input.replace(/\D/g, ""); // 숫자가 아닌 것들을 제거
  if (value.startsWith("02")) {
    // 전화번호가 '02'로 시작하는 경우
    if (value.length > 10) {
      value = value.slice(0, 10); // 입력값을 10자리로 제한
    }
    if (value.length > 5) {
      value = value.replace(/(\d{2})(\d{4})(\d+)/, "$1-$2-$3");
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d+)/, "$1-$2");
    }
  } else {
    // 그 외의 경우
    if (value.length > 11) {
      value = value.slice(0, 11); // 입력값을 11자리로 제한
    }
    if (value.length > 8) {
      value = value.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
    } else if (value.length > 4) {
      value = value.replace(/(\d{3})(\d+)/, "$1-$2");
    }
  }

  return value;
};
