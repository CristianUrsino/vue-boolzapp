/** *
 *[randomInteger] 
 *Presi due numeri calcola un numero randomico nel range di essi
 *@param {number} min
 *@param {number} max
 *@returns {number}
*/
export function randomInteger(min,max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
/** *
 *[pari] 
 *preso un numero controlla che sia pari
 *@param {number} x
 *@returns {boolean} se pari 'true' altrimenti 'false'
*/
export function pariODispari(x){
    return (x % 2 === 0) ? true : false;
}