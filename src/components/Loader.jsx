import { FallingLines } from "react-loader-spinner";

import styles from "../styles/Loader.module.css";
function Loader() {
  return (
    <div className={styles.loader_container}>
      <FallingLines
        color="#0073e6"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
}

export default Loader;
