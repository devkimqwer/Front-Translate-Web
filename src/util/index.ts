/* eslint-disable @typescript-eslint/no-explicit-any */
// util
export class SessionStorageManager {
  static get = (window: Window, key: string) => {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.sessionStorage.getItem(key);
  };

  static set = (window: Window, key: string, value: any) => {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.sessionStorage.setItem(key, value);
  };

  static remove = (window: Window, key: string) => {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.sessionStorage.removeItem(key);
  };
}

export class LocalStorageManager {
  static get = (window: Window, key: string) => {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.localStorage.getItem(key);
  };

  static set = (window: Window, key: string, value: any) => {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.localStorage.setItem(key, value);
  };

  static remove = (window: Window, key: string) => {
    if (!window) throw new Error("[Transfolio] undefined window!");

    return window.localStorage.removeItem(key);
  };
}

export class ValidationUtil {
  /**
   * @description 비밀번호 유효성 체크
   */
  static validatePassword(password: string): boolean {
    const lengthCheck = /.{8,}/;
    const upperCaseCheck = /[A-Z]/;
    const lowerCaseCheck = /[a-z]/;
    const numberCheck = /[0-9]/;
    const specialCharCheck = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      lengthCheck.test(password) &&
      upperCaseCheck.test(password) &&
      lowerCaseCheck.test(password) &&
      numberCheck.test(password) &&
      specialCharCheck.test(password)
    );
  }

  /**
   * @description 이메일 유효성 체크
   */
  static validateEmail(email: string): boolean {
    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailCheck.test(email);
  }

  /**
   * @description 빈 값 여부 체크
   */
  static isBlank(
    ...targets: {
      onError?: (key: string) => void;
      value: string;
      key: string;
    }[]
  ) {
    return targets.every((target) => {
      const isBlank = !target.value;

      if (isBlank) {
        if (target.onError && typeof target.onError === "function") {
          target.onError(target.key);
        }
        return false;
      }

      return true;
    });
  }

  /**
   * @description 빈 값 및 공백 여부 체크
   */
  static isWhiteSpace(
    ...targets: {
      onError?: (key: string) => void;
      value: string;
      key: string;
    }[]
  ) {
    return targets.every((target) => {
      const isWhiteSpace = !target.value || !target.value.trim();

      if (isWhiteSpace) {
        if (target.onError && typeof target.onError === "function") {
          target.onError(target.key);
        }
        return false;
      }

      return true;
    });
  }
}
