import styles from "./Error404.module.css"
import { Link } from "react-router-dom";

export default function Error404 () {
   return(
      <div className={styles.card}>
          <h1>ERROR 404: Page not found!</h1>
          <h2>Pagina no encontrada</h2>
          <h3>Regresar al inicio</h3>
          <Link to={"/home"}><button className={styles.btn}>Regresar</button></Link>
      </div>
   
   )
}
