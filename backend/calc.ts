
//console.log("Hello, World!");

//(x-a)^2 + (y-b)^2 = r^2
//a= center x
//b= center y
//r= radius

//input center coordinates at: (a, b), a point at: (x, y) and threat radius r to check if the point is inside or on the circle defined by the center and radius.

const inside_threat_range = (x: number, y: number, a: number, b: number, r: number): boolean => {
    console.log(`Checking if coordinates: (${x}, ${y}) is inside or on the circle with center at: (${a}, ${b}) and threat radius of: ${r}`);
    const distance = Math.sqrt(Math.pow(x - a, 2) + Math.pow(y - b, 2));
    console.log(`Distance: ${distance}, threat: ${r}`);
    return distance <= r;
}

/*
// Test cases
console.log(inside_threat_range(1, 1, 0, 0, 2)); // true
console.log(inside_threat_range(3, 3, 0, 0, 2)); // false
console.log(inside_threat_range(0, 0, 3, 1.5, 2.4)); // false
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

/*
console.log(find_Edge(0, 175, 8)); // { east: 2, west: -2, north: 2, south: -2 }
*/

class threat {
    
    private x: number;
    private y: number;
    private r: number;
    private speed: number;

    constructor(x: number, y: number, r: number, speed: number) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;
    }

    getDistance(): number {
        return this.r;
    }
    getSpeed(): number {
        return this.speed;
    }

    get Coordinates(): { x: number, y: number } {
        return { x: this.x, y: this.y };
    }
}
class jet {
    private x: number;
    private y: number;
    private alt: number;
    private direction: number;
    private speed: number;
    
    constructor(x: number, y: number, alt: number, heading: number, speed: number) {
        this.x = x;
        this.y = y;
        this.alt = alt;
        this.direction = heading;
        this.speed = speed;
    }
    getSpeed(): number {
        return this.speed;
    }
    get Coordinates(): { x: number, y: number, alt: number } {
        return { x: this.x, y: this.y, alt: this.alt };
    }
    get Heading(): number {
        return this.direction;
    }
}

const will_it_intercept = (distance_jet:number, distance_threat:number, speed_jet:number, speed_threat:number): boolean => {
    const time_jet = distance_jet / speed_jet;
    const time_threat = distance_threat / speed_threat;
    if (time_jet <= time_threat) {
        return true;
    }
    return false;
}

const Distance= (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}


const find_intersection = (threat: threat, jet: jet) : boolean => {
    let jet_m: number = 0;
    const x_threat = threat.Coordinates.x;
    const y_threat = threat.Coordinates.y;
    const alt = jet.Coordinates.alt;
    const r = threat.getDistance();
    const jet_x = jet.Coordinates.x;
    const jet_y = jet.Coordinates.y;
    const jet_direction = jet.Heading;
    try {
            jet_m==Math.tan(jet_direction);
    }
    catch (error) {
        jet_m=0;
    }
    //let A = m;
    let B = -1;
    let C_jet = (jet_m*-jet_x)+(-jet_y);
    //let d = Math.abs(A*x+B*y+C) / Math.sqrt(Math.pow(A, 2)+Math.pow(B, 2));
    let d_threat = Math.abs((jet_m*x_threat)+B*y_threat+C_jet) / Math.sqrt(Math.pow(jet_m, 2)+1);

    let m_threat = (1/jet_m)*-1;
    let C_threat = (m_threat*-x_threat)+(-y_threat);

    const x_intercept = (C_threat - C_jet) / (jet_m - m_threat);
    const y_intercept = (jet_m*x_intercept)+C_jet;

    let d_jet:number = Distance(jet_x, jet_y, x_intercept, y_intercept);

    const distance:number = Math.sqrt(Math.pow(alt, 2)+Math.pow(d_threat, 2));

    let threatend:boolean = will_it_intercept(d_jet, distance, jet.getSpeed(), threat.getSpeed());

    //לחשב האם יספיק לצאת מהמעגל לפני שיתפוס אותו האיום.
    //לקרוא לפונקציה שבודקת האם במעגל כדי להגיד איום.
    //המטוס נחשב כמאויים אם הוא נמצא בתוך המעגל או על גבול המעגל גם אם האיום בוודאות לא יספיק ליירט אותו.
    /*
    if (jet.Heading > 90 && jet.Heading < 270 && jet_y < y_intercept&& jet_x < x_intercept) {
        threatend = false;
    }else if(jet_x > x_intercept && jet_y > y_intercept){
        threatend = false;
    }
    */
   //לא לגמרי נכון, צריך לחשב את המרחק מהמעגל ולבדוק האם המטוס יכול לצאת מהמעגל לפני שהאיום יתפוס אותו.
    
    return threatend;
}


