import React, { useCallback, useMemo, useRef } from "react";
import styles from "./TextBundle.module.scss";
import TextAreaAutoResize from "react-textarea-autosize";
import { className } from "@/util";

interface ITextBundle {
  fontSize?: string;
  fontFamily?: string;
  original?: boolean;
  value: string;
  setValue: (value: string) => void;
  onEnterPressed: () => void;
}

const TextBundle = React.forwardRef<HTMLTextAreaElement, ITextBundle>(
  (
    { fontSize, fontFamily, original = true, value, setValue, onEnterPressed },
    ref
  ) => {
    const divRef = useRef<HTMLDivElement>(null);

    const width = useMemo(() => {
      if (divRef.current === null && value.length === 0) {
        return "100px";
      }

      if (divRef.current === null) return "0px";

      const span = divRef.current?.firstChild as HTMLSpanElement;
      if (fontFamily !== undefined)
        span.style.setProperty("font-family", fontFamily);
      if (fontSize !== undefined) span.style.setProperty("font-size", fontSize);
      span.innerText = value === "" ? "번역 전 " : value;

      return Math.floor(span.offsetWidth) + "px";
    }, [value, fontSize, fontFamily, divRef.current]);

    const onPaste = useCallback(
      (e: React.ClipboardEvent) => {
        setValue(e.clipboardData.getData("text/plain"));
      },
      [setValue]
    );

    const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();

        onEnterPressed();
      }
    };

    return (
      <React.Fragment>
        <div
          style={{ fontSize, fontFamily }}
          className={className(styles.hiddenDiv, styles.textarea)}
          ref={divRef}
        >
          <span></span>
        </div>
        <TextAreaAutoResize
          ref={ref}
          style={{
            width,
            visibility: width === "0px" ? "hidden" : "visible",
            fontSize,
            fontFamily,
            boxSizing: "content-box",
          }}
          defaultValue={value}
          placeholder={original ? "번역 전" : "번역 후"}
          onPaste={onPaste}
          onChange={(e) => setValue(e.target.value)}
          autoFocus={original}
          className={className(
            styles.textarea,
            original ? styles.original : ""
          )}
          onKeyDown={keyDownHandler}
        />
      </React.Fragment>
    );
  }
);

export default TextBundle;
