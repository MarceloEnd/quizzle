// puzzleLogic.js

const getRandomOp = () => (Math.random() > 0.5 ? '+' : '-');

const calculate = (a, b, op) => (op === '+' ? a + b : a - b);

export const generatePuzzle = (isEasy,isHard) => {
    let difficulty = 5;
    if(isEasy){
        difficulty = 4
    } else if(isHard){
        difficulty = 6
    }
    const n = Array.from({ length: 9 }, () => Math.floor(Math.random() * 9) + 1);
    
    const allCoords = ['0,0', '0,2', '0,4', '2,0', '2,2', '2,4', '4,0', '4,2', '4,4'];
    const shuffled = [...allCoords].sort(() => 0.5 - Math.random());
    const inputCoords = shuffled.slice(0, difficulty);

    // Generate random operators for 3 rows and 3 columns
    // Each equation in this grid type uses TWO operators: (A op1 B op2 C = Result)
    const ops = {
        r1: getRandomOp(), r2: getRandomOp(),
        r3: getRandomOp(), r4: getRandomOp(),
        r5: getRandomOp(), r6: getRandomOp(),
        c1: getRandomOp(), c2: getRandomOp(),
        c3: getRandomOp(), c4: getRandomOp(),
        c5: getRandomOp(), c6: getRandomOp(),
    };

    // Calculate Row Results: (n0 op n1 op n2)
    const rows = [
        calculate(calculate(n[0], n[1], ops.r1), n[2], ops.r2),
        calculate(calculate(n[3], n[4], ops.r3), n[5], ops.r4),
        calculate(calculate(n[6], n[7], ops.r5), n[8], ops.r6),
    ];

    // Calculate Column Results: (n0 op n3 op n6)
    const cols = [
        calculate(calculate(n[0], n[3], ops.c1), n[6], ops.c2),
        calculate(calculate(n[1], n[4], ops.c3), n[7], ops.c4),
        calculate(calculate(n[2], n[5], ops.c5), n[8], ops.c6),
    ];

    return {
        fullValues: {
        '0,0': n[0], '0,2': n[1], '0,4': n[2],
        '2,0': n[3], '2,2': n[4], '2,4': n[5],
        '4,0': n[6], '4,2': n[7], '4,4': n[8]
        },
        ops,
        inputCoords,
        r: rows,
        c: cols
    };
};