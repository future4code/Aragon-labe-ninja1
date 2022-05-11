const converteData = (date) => {
    const dia = date.substring(8, 10)
    const mês = date.substring(5, 7)
    const ano = date.substring(0, 4)
    return `${dia}/${mês}/${ano}`   // 2022/05/31
};

export default converteData;

// DD/MM/AAAA  