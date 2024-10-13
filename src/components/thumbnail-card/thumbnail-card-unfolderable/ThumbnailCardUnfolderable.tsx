import { CategoryColor } from "@/util";
import styles from "./ThumbnailCardUnfolderable.module.scss";
import React from "react";

const ThumbnailCardUnfolderable: React.FC<{
  original: string;
  translated: string;
  color: CategoryColor;
  fontStyle?: string;
  isEditMode?: boolean;
}> = ({
  original,
  translated,
  color,
  fontStyle = "Pretendard",
  isEditMode,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.indexSection}>
        <div className={`${styles.index} ${styles[color]}`}></div>
      </div>
      <div className={styles.contentSection} style={{ fontFamily: fontStyle }}>
        <div className={styles.editableContent} contentEditable={isEditMode}>
          {original}
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCardUnfolderable;
