import styles from "./ContentSlider.module.scss";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ThumbnailCardFolderable from "@/components/thumbnail-card/thumbnail-card-folderable/ThumbnailCardFolderable";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ThumbnailTitle from "@/components/thumbnail-title/ThumbnailTitle";
import { posts } from "@/util/sample-data";
import { className, getCategoryColor } from "@/util";

const ContentSlider = () => {
  const isMobile = useMediaQuery({ maxWidth: "767px" });
  const sliderNumber = isMobile ? 1 : 3;
  const [pageIndex, setPageIndex] = useState<number>(0);
  const slickRef = useRef<Slider>(null);
  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: sliderNumber,
    slidesToScroll: sliderNumber,
    arrows: false, // FIXME
    // nextArrow: <Arrow left={false} onClicked={() => next()} />,
    // prevArrow: <Arrow onClicked={() => previous()} />,
    afterChange: (index: number) => {
      setPageIndex(index);
    },
    customPaging: (index: number) => {
      return (
        <div
          className={className(
            styles.customDot,
            index === pageIndex / sliderNumber ? styles.active : styles.inActive
          )}
        ></div>
      );
    },
    dotsClass: `slick-dots ${styles.customDots}`,
  };

  const previous = () => {
    slickRef.current!.slickPrev();
  };

  const next = () => {
    slickRef.current!.slickNext();
  };

  return (
    <div className={styles.container}>
      <Slider {...sliderSettings} ref={slickRef}>
        {posts.map((post) => {
          return (
            <div className={styles.thumbnailContainer} key={post.id}>
              <div className={styles.thumbnailTitleSection}>
                <ThumbnailTitle interest={post.category.major} />
              </div>
              <div className={styles.thumbnailSection}>
                <ThumbnailCardFolderable
                  original={post.title}
                  major={post.translator.major}
                  writer={`@${post.translator.nickName}`}
                  picked={109}
                  color={getCategoryColor(post.category.major)}
                  href={`/home/content/${post.id}`}
                  fontStyle={post.style.fontFamily}
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default ContentSlider;
