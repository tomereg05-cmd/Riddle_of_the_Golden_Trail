
//console.log("Hello, World!");

//(x-a)^2 + (y-b)^2 = r^2
//a= center x
//b= center y
//r= radius

//input center coordinates at: (a, b), a point at: (x, y) and threat radius r to check if the point is inside or on the circle defined by the center and radius.

class threat {
    
    private x: number;
    public getx(): number {
        return this.x;
    }
    public setx(value: number) {
        this.x = value;
    }
    private y: number;
    public gety(): number {
        return this.y;
    }
    public sety(value: number) {
        this.y = value;
    }
    private r: number;
    public getr(): number {
        return this.r;
    }
    public setr(value: number) {
        this.r = value;
    }
    private speed: number;
    public getspeed(): number {
        
        return this.speed;
    }
    public setspeed(value: number) {
        this.speed = value;
    }
    private dist: number;
    public getdist(): number {
        return this.dist;
    }
    public setdist(value: number) {
        this.dist = value;
    }

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
        //21600 = circumference
        const circumference:number = 21600; //nautical miles
        this.r=(dist/circumference)*360 //בבדיקות יצא לי שיש סטיה של בערך 6 קילומטרים בחישוב שלי ולכן מתקן לפי אותה הסטייה
        this.dist=dist;

        return this.r
    }
    getDegToMiles(r:number):number{
        let circumference:number = 21600; //nautical miles
        this.dist=circumference * (r/360)
        return this.dist
    }
    setR(r:number){
        this.r=r
    }


}
class jet {
    private x: number;
    public getX():number{
        return this.x
    }
    private y: number;
    public getY():number{
        return this.x
    }
    private alt: number;
    public getAlt():number{
        return this.x
    }
    private direction: number;
    public getDir():number{
        return this.x
    }
    private speed: number;
    public getSpeed_():number{
        return this.x
    }
    
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
class jet2{
        
    }
class ans{
    private IsIn:boolean;
    private Range:number;
    private jet:jet;

    constructor(IsIn:boolean, range:number, jet:jet){
        this.IsIn=IsIn;
        this.Range=range;
        this.jet=jet;
    }
    getIsIn():boolean{
        return this.IsIn;
    }
    getRange():number{
        return this.Range;
    }
    getJet():jet{
        return this.jet;
    }

}




















class CalculatorD{


    public static all_Under_threat(jets:jet[],T:threat):ans[]{  
        let a:ans[]=[];
        let b:ans;
        const Tx=T.getx();
        const Ty=T.gety();
        const Tr=T.getr();
        const Td=T.getdist();
        let Jet:jet;
        for (let i:number=0;i<jets.length;i++){
            Jet=jets[i];
            b=new ans(this.inside_threat_range(Jet.getX(),Jet.getY(),Tx,Ty,Tr,false,Td).isInside,this.calcDist(Jet.getX(),Jet.getY(),Tx,Ty),Jet)
            a.push(b);
        }

        a.sort((n1,n2) =>n1.getRange()-n2.getRange());

        return(a)
    }

    public static calcDist (lat1:number,long1:number, lat2:number, long2:number): number{
        let R:number=3443.92 //nautical miles
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (long2-long1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c;//in nautical Miles
        //https://www.movable-type.co.uk/scripts/latlong.html
        return d;
    }
    
    public static inside_threat_range (x: number, y: number, a: number, b: number, r: number, isInside: boolean, range:number): {x: number, y: number, a: number, b: number, r: number, isInside: boolean, range:number} {
        r=this.MilesToDeg(range,y);
        console.log(`Checking if coordinates: (${y}, ${x}) is inside or on the circle with center at: (${b}, ${a}) and threat radius of: ${r}`);
        let distance = this.calcDist(y,x,b,a);
        r=r*1000;
        r=Math.floor(r);
        r=r/1000;
        distance=Math.floor(distance*1000);
        distance=distance/1000;
        console.log(`Distance: ${distance}, threat: ${r}`);
        console.log((distance <= r) + " check");
        isInside = distance <= r;
        return { x, y, a, b, r, isInside ,range};
    }

    /*
    // Test cases
    console.log(inside_threat_range(1, 1, 0, 0, 2)); // true
    console.log(inside_threat_range(3, 3, 0, 0, 2)); // false
    console.log(inside_threat_range(0, 0, 3, 1.5, 2.4)); // false
    */

    public static MilesToDeg(dist:number,lat:number): number {
        
        // 60 nautical mile = 1 degree of latitude (-90<-0->90)
        // R_degrees = dist/(60*Math.cos(long))
        console.log(`Converting ${dist} miles to degrees: `);
        let Degrees:number;
        Degrees=Number(dist);
        Degrees=Degrees/(60*Math.cos(lat));
        console.log(dist + 'Miles are '+Degrees+" degrees!");
        return Degrees;
    }
    public static DegToMiles(r:number, lat:number):number{
        // 60 nautical mile = 1 degree of latitude (-90<-0->90)
        // R_degrees = dist/(60*Math.cos(lat))
        console.log(`Converting ${r} degrees to miles`);
        let Miles:number;
        Miles= r*Number(60*Math.cos(lat))
        return Miles;
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
    public static will_it_intercept_2 (distance_jet:number, distance_threat:number, speed_jet:number, speed_threat:number): {x: number, y: number, a: number, b: number, r: number, isInside: boolean} {
        const time_jet = distance_jet / speed_jet;
        const time_threat = distance_threat / speed_threat;
        if (time_jet <= time_threat) {
            return {x: 0, y: 0, a: 0, b: 0, r: 0, isInside: true};
        }
        return {x: 0, y: 0, a: 0, b: 0, r: 0, isInside: false};
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