import { useEffect, useState } from "react";
import "./ProductImageSlider.scss";
import { Product } from "../types/Product";
import ProductCardV2 from "./SliderComponent/ProductCardV2";
import leftButton from "../../public/images/left-button.png";
import rightButton from "../../public/images/right-button.png";
import Image from "next/image";

interface ProductImageSliderProps {
  title?: string;
  containerStyle?: React.CSSProperties;
  headingStyle?: React.CSSProperties;
}

export default function ProductImageSlider(props: ProductImageSliderProps) {

  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(5);

  // Get data from database
  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const maxIndex = Math.max(Math.ceil(products.length / imagesPerPage) - 1, 0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Update images per page based on screen width
  const updateImagesPerPage = () => {
    if (window.innerWidth < 700) {
      if (window.innerWidth < 600) {
        setImagesPerPage(4);
      } else {
        setImagesPerPage(3);
      }
    } else if (window.innerWidth < 1000) {
      setImagesPerPage(4);
    } else {
      setImagesPerPage(5);
    }
  }

  useEffect(() => {
    updateImagesPerPage();
    window.addEventListener('resize', updateImagesPerPage);

    return () => {
      window.removeEventListener('resize', updateImagesPerPage);
    };
  }, []);

  return (
    <div className="productImageSlider-root" style={props.containerStyle}>
      <div className="productImageSlider-title">
        <div className="productImageSlider-title-text" style={props.headingStyle}>{props.title}</div>
        <div className="productImageSlider-controlButtons">
          <div className="productImageSlider-controlButtons-previous" onClick={currentIndex === 0 ? undefined : handlePrev}>
            <Image src={leftButton} alt="previous button" width={24} height={24}></Image>
          </div>
          <div className="productImageSlider-controlButtons-next" onClick={currentIndex === maxIndex ? undefined : handleNext}>
            <Image src={rightButton} alt="next button" width={24} height={24}></Image>
          </div>
        </div>
      </div>
      <div className="productImageSlider-window">
        <div
          className="productImageSlider-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: "100%",
            display: "flex",
            transition: "transform 0.5s",
          }}
        >
          {products.map((product) => (
            <div className="productImageSlider-item" key={product.id} style={{ flex: `0 0 ${95 / imagesPerPage}%` }}>
              <ProductCardV2 ID={product.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}