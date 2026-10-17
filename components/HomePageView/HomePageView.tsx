import Link from "next/link";
import styles from "./HomePageView.module.css";

export const HomePageView = () => {
  return (
    <section className={styles.homePageSection}>
      <div className={styles.homePageContent}>
        <h1 className={styles.homePageTitle}>Campers of your dreams</h1>
        <h2 className={styles.homePageSubtitle}>You can find everything you want in our catalog</h2>
        <Link href="/catalog" className={`btn ${styles.homePageButton}`}>
          View Now
        </Link>
      </div>
    </section>
  );
};
