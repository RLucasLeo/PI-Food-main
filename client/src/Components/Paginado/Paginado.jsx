import s from "./Paginado.module.css"

export default function Paginado ({recetasPorPag, allRecipes, paginado}){
    const pagNum = [];

    for (let i = 1; i <= Math.ceil(allRecipes/recetasPorPag); i++) { // .celi(6.6)=7
        pagNum.push(i)
    }
    return (
        <nav>
            <div className={s.paginacion}>
                {pagNum && pagNum.map(number => ( 
                    <span key={number}>
                        <button className={s.btn} onClick={() => paginado(number)}>{number}</button> {/* y por cada elemento renderizame un boton y agregales un evento onClick, el cual establecera el numero de pagina en el que me encuentro*/}
                    </span>
                ))}
            </div>
        </nav>
    )
    
}
