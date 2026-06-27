
//console.log("Hello, World!");

//(x-a)^2 + (y-b)^2 = r^2
//a= center x
//b= center y
//r= radius

//input center coordinates at: (a, b), a point at: (x, y) and threat radius r to check if the point is inside or on the circle defined by the center and radius.

const inside_threat_range = (x: number, y: number, a: number, b: number, r: number): boolean => {
    console.log(`Checking if coordinates: (${x}, ${y}) is inside or on the circle with center at: (${a}, ${b}) and threat radius of: ${r}`);
    const distance = Math.sqrt((x - a) ** 2 + (y - b) ** 2);
    console.log(`Distance: ${distance}, threat: ${r}`);
    return distance <= r;
}

/*
// Test cases
console.log(inside_threat_range(1, 1, 0, 0, 2)); // true
console.log(inside_threat_range(3, 3, 0, 0, 2)); // false
console.log(inside_threat_range(0, 0, 3, 0, 2)); // false
*/

const find_Edge = (a: number, b: number, r: number): { east: number, west: number, north: number, south: number } => {
    console.log(`Finding edge coordinates with center at: (${a}, ${b}) and threat radius of: ${r} as a square` );
    let north = a + r;
    let south = a - r;
    let east = b + r;
    let west = b - r;
    if (b + r > 180) {
        console.log(`East edge exceeds 180 degrees, adjusting to 180`);
        east = (-180) + ((b + r) - 180);
        //should run west ->180; and -180 ->east;
    }
    if (b - r < -180) {
        console.log(`West edge exceeds -180 degrees, adjusting to -180`);
        west = 180 - ((b - r) + 180);
        //should run west ->180; and -180 ->east;
    }
    //לא הצלחתי למצוא דרך לחשב מרחק הכי קצר באיזור הקטבים מסביב ל90מעלות
    if (a + r > 90) {
        console.log(`North edge exceeds 90 degrees, adjusting to 90`);
        north = 90;
    }
    if (a - r < -90) {
        console.log(`South edge exceeds -90 degrees, adjusting to -90`);
        south = -90;
    }

    return { east, west, north, south };
}

console.log(find_Edge(0, 175, 8)); // { east: 2, west: -2, north: 2, south: -2 }