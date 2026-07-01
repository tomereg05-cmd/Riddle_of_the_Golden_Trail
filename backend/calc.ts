
//console.log("Hello, World!");

//(x-a)^2 + (y-b)^2 = r^2
//a= center x
//b= center y
//r= radius

//input center coordinates at: (a, b), a point at: (x, y) and threat radius r to check if the point is inside or on the circle defined by the center and radius.

class threat {
    
    private x: number;
    private y: number;
    private r: number;
    private speed: number;
    private dist: number

    constructor(x: number, y: number, dist: number, speed: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.r=this.getMilesToDeg(dist);
        this.dist =dist;
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
    getMilesToDeg(dist:number): number {
        //dist = circumference * r/360
        //(dist/circumference) *360 = r
        //24,901= circumference
        const circumference:number = 24901;
        this.r=((dist+3.72823)/circumference)*360 //בבדיקות יצא לי שיש סטיה של בערך 6 קילומטרים בחישוב שלי ולכן מתקן לפי אותה הסטייה
        this.dist=dist;

        return this.r
    }
    getDegToMiles(r:number):number{
        let circumference:number = 24901;
        this.dist=circumference * (r/360)
        return this.dist
    }
    setR(r:number){
        this.r=r
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





















class CalculatorD{
    
    public static inside_threat_range (x: number, y: number, a: number, b: number, r: number): boolean {
        r=this.MilesToDeg(r);
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

    public static MilesToDeg(dist:number): number {
        console.log(`Converting ${dist} miles to degrees`);
        //dist = circumference * r/360
        //(dist/circumference) *360 = r
        //24,901= Earth's circumference
        const circumference:number = 24901;
        let r:number;
        //6km correction factor added based on testing results = 3.72823 Miles
        //בבדיקות יצא לי שיש סטיה של בערך 6 קילומטרים בחישוב שלי ולכן מתקן לפי אותה הסטייה
        r=dist+3.5;
        console.log('dist+3.5 = ' + r);
        r=r/circumference;
        console.log("r ="+r);
        r=r*360
        console.log("r ="+r);
        return r;
    }
    public static DegToMiles(r:number):number{
        console.log(`Converting ${r} degrees to miles`);
        const circumference:number = 24901;
        let dist:number;
        //dist=circumference * (r/360)
        dist=circumference 
        dist=dist*(r/360)
        return dist
    }



    public static find_Edge (a: number, b: number, r: number): { east: number, west: number, north: number, south: number } {
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



    public static will_it_intercept (distance_jet:number, distance_threat:number, speed_jet:number, speed_threat:number): boolean {
        const time_jet = distance_jet / speed_jet;
        const time_threat = distance_threat / speed_threat;
        if (time_jet <= time_threat) {
            return true;
        }
        return false;
    }

    public static Distance= (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }


    public static find_intersection (threat: threat, jet: jet) : boolean {
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

        let d_jet:number = this.Distance(jet_x, jet_y, x_intercept, y_intercept);

        let temp =threat.getDegToMiles(d_threat)

        let temp_2 = threat.getMilesToDeg(temp)

        let threat_to_intercept=Math.sqrt(Math.pow(alt, 2)+Math.pow(temp_2, 2));

        let threatend:boolean = this.will_it_intercept(d_jet, threat_to_intercept, jet.getSpeed(), threat.getSpeed());

        //לחשב האם יספיק לצאת מהמעגל לפני שיתפוס אותו האיום.
        //לקרוא לפונקציה שבודקת האם במעגל כדי להגיד איום.
        //המטוס נחשב כמאויים אם הוא נמצא בתוך המעגל או על גבול המעגל גם אם האיום בוודאות לא יספיק ליירט אותו.
        /*
        if (jet.Heading > 90 && jet.Heading < 270 && jet_y < y_intercept&& jet_x < x_intercept) {
            threatend = false;
        }else if(jet_x > x_intercept && jet_y > y_intercept){
            threatend = false;
        }
        //לא לגמרי נכון, צריך לחשב את המרחק מהמעגל ולבדוק האם המטוס יכול לצאת מהמעגל לפני שהאיום יתפוס אותו.
        */
        
        
        return threatend;
    }
}



export default CalculatorD