module.exports = function zeros(str) {
    const reducer = (num, del = 2, acc = []) => {
        if (num === 1) {
            return acc
        }
        return num % del === 0 ? reducer(num / del, del, [...acc, del]) :
            reducer(num, del + 1, acc)
    };

    const arrOfNum = (num) => {
        let res = [];
        for(let i = num % 2 !== 0? 1: 2; i <=num; i += 2){
            res = [...res, i];
        }
        return res.reduce((acc, elem) => [...acc,...reducer(elem)],[])
            .filter(e => e === 2 || e === 5);
    };

    const arrFactorial = (num, acc = []) => {
        if (num === 1) {
            return acc;
        }
        return arrFactorial(num - 1, [...acc, num]).reduce((acc, elem) => {
            return [...acc, ...reducer(elem)];
        }, []);
    };

    let numberArr = str.split("*").reduce((acc,elem) =>{
        return elem.split("").filter(item => item === "!").length === 2 ?
            [...acc, Number(elem.split("").filter(e => e !== "!").join(""))] :
            acc;
    },[]);

    let factorialArr = str.split("*").reduce((acc,elem) =>{
        return elem.split("").filter(item => item === "!").length === 1 ?
            [...acc, Number(elem.split("").filter(e => e !== "!").join(""))] :
            acc;
    },[]);

    let b = numberArr.reduce((acc, e) => [...acc,...arrOfNum(e)],[]);
    let c = factorialArr
        .reduce((acc, e) => [...acc, ...arrFactorial(e).filter(e => e === 2 || e === 5)] ,[]);

    let d = [...b, ...c];
    let countTwo = 0;
    let countFive = 0;
    for(let i = 0; i <= [...b, ...c].length; i += 1){
        if(d[i] === 2){
            countTwo += 1;
        } else if(d[i] === 5) {
            countFive += 1;
        }
    }

    return countTwo >= countFive ? countFive : countTwo;
};
