import React from "react";
import { Link } from "react-router-dom";
import styles from './Landing.module.css'

export default function LandingPage(){
    return(
        <div className={styles.containerCentral}>
              
        <h3 className={styles.titulo}>¡Bienvenido a mi proyecto!</h3>
          
        <Link to="/home"><button className={styles.boton} >INGRESAR</button></Link>
        <p className={styles.text}>Desarrollado por Robledo Lucas Leonardo, con mucho amor💖</p>
     </div>
    )
}