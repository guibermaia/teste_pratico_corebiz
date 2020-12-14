export const SYMBOL_BRL = 'R$';

export const format = (value, symbol) => {
    const parsedValue = String(value).replace(/([0-9]{2})$/g, ",$1")
    if (value.length > 6) {
        console.log("batata")
        parsedValue = String(value).replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    return `${symbol} ${parsedValue}`;
}