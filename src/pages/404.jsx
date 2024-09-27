import { Link } from "react-router-dom";
import styles from "../styles/404.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className={styles.home_page}>
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
