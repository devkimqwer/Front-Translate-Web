import React from "react";
import styles from "./TextField.module.scss";
import { className } from "@/util";

/**
 * - Ok - 값이 유효함
 * - Error - 유효성 검사 실패
 */
export type ValidationResult = "Ok" | "Error";

const TextField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  hide?: boolean;
  placeholder?: string;
  validationFn?: (value: string) => ValidationResult;
  validationFailText?: string | { (value: string): string };
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}> = ({
  value,
  onChange,
  hide = false,
  placeholder = "",
  validationFn = () => "Ok",
  validationFailText = "값이 유효하지 않습니다.",
  inputProps = {},
}) => {
  return (
    <div
      className={className(
        styles.container,
        validationFn(value) === "Error" ? styles.error : ""
      )}
    >
      <input
        {...inputProps}
        className={styles.input}
        type={hide ? "password" : "text"}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {validationFn(value) === "Error" ? (
        <div className={styles.errorText}>
          {typeof validationFailText === "string"
            ? validationFailText
            : validationFailText(value)}
        </div>
      ) : null}
    </div>
  );
};

export default TextField;
