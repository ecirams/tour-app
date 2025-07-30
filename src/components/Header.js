import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header} role="banner">
      <h1 tabIndex="0">TOP TOURIST PLACES IN USA</h1>
    </header>
  );
}
