import React from "react";
import styles from "../styles/Home.module.css";

const PriceCard = () => {
  return (
    <div className={styles.priceCardContainer}>
      <div className={styles.priceCard}>
        <div className={styles.priceCardTop}>Standard</div>
        <h2 className={styles.priceCardTitle}> $5 / mo</h2>
        <div className={styles.priceCardList}>
          <div>Personalized daily horoscope at your email each day</div>
          <div>Compatibility reports</div>
          <div>Lucky numbers</div>
          <div>Cancel anytime</div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
