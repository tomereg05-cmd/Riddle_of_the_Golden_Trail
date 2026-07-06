
//console.log("Hello, World!");

//(x-a)^2 + (y-b)^2 = r^2
//a= center x
//b= center y
//r= radius

//input center coordinates at: (a, b), a point at: (x, y) and threat radius r to check if the point is inside or on the circle defined by the center and radius.

export class threat {
    
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
export class jet {
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
/*
export class ans{
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
*/
export class importantDataClient{
    private inside:boolean
    private dist:number
    private IndexInArray:number
    private lat_jet:number
    private long_jet:number
    private interceptTime:number
    constructor(inside:boolean,dist:number,place:number,lat:number, long:number,interceptTime:number){
        this.inside=inside;
        this.dist=dist;
        this.IndexInArray=place;
        this.lat_jet=lat;
        this.long_jet=long;
        this.interceptTime=interceptTime;
    }
    getInside(){
        return this.inside;
    }
    getDist(){
        return this.dist;
    }
    getIndexInArray(){
        return this.IndexInArray;
    }
    getLat_jet(){
        return this.lat_jet
    }
    getLong_jet(){
        return this.long_jet
    }
    getInterceptTime(){
        return this.interceptTime
    }
    
}



















class CalculatorD{
    
    /*
    public static fakeAPI(){
        
        return{
            "time": 1783162325,
            "states": [
                [
                "739215",
                "4XDAN   ",
                "Israel",
                1783162037, 1783162037, 35.4062, 31.2715, 1729.74, false, 86, 41.61, -15.61, null, 1775.46, "5070",
                false, 0],
                [
                "440189",
                "BCS74W  ",
                "Austria",
                1783162324, 1783162324, 33.641, 32.3808, 9113.52, false, 223.67, 305.26, 7.15, null, 9768.84, "2243",
                false, 0],
                [
                "739572",
                "4XCMC   ",
                "Israel",
                1783162324, 1783162325, 34.4559, 32.279, 5890.26, false, 151.47, 354.35, 7.15, null, 6271.26, "4133",
                false, 0],
                [
                "739603",
                "HFA603  ",
                "Israel",
                1783162324, 1783162325, 34.9508, 32.3955, 3192.78, false, 95.82, 161.86, 4.55, null, 3345.18, "5001",
                false, 0],
                [
                "738443",
                "AIZ1072 ",
                "Israel",
                1783162325, 1783162325, 34.9875, 32.2013, 861.06, false, 107.83, 140.61, -0.65, null, 876.3, "7422",
                false, 0],
                [
                "4c808c",
                "BBG612  ",
                "Cyprus",
                1783162324, 1783162324, 33.4719, 32.4142, 6492.24, false, 204.27, 301.93, 6.83, null, 6903.72, "1140",
                false, 0],
                [
                "4c8085",
                "CYF105  ",
                "Cyprus",
                1783162324, 1783162324, 34.3636, 32.571, 6027.42, false, 217.23, 349.36, 8.13, null, 6431.28, "4141",
                false, 0],
                [
                "89656c",
                "FDB1212 ",
                "United Arab Emirates",
                1783162324, 1783162324, 35.101, 31.95, 2095.5, false, 168.89, 92.44, 4.88, null, 2179.32, "0714",
                false, 0],
                [
                "408064",
                "WUK9497 ",
                "United Kingdom",
                1783162324, 1783162324, 34.636, 32.3142, 1935.48, false, 148.48, 112.83, -3.9, null, 2019.3, "2274",
                false, 0],
                [
                "738c06",
                "ICL888  ",
                "Israel",
                1783161846, 1783162322, 33.8805, 32.902, 2598.42, false, 198.76, 200.45, -5.2, null, 6141.72, "5455",
                false, 0],
                [
                "4d23e1",
                "CHZ311  ",
                "Malta",
                1783162280, 1783162280, 34.8979, 31.9984, null, true, 7.72, 331.88, null, null, null, null, false, 0],
                [
                "4d203b",
                "BBG252  ",
                "Malta",
                1783162324, 1783162324, 34.7244, 31.9994, 1386.84, false, 123.52, 291.76, 10.4, null, 1424.94, "4152",
                false, 0]
            ]
        }
            
    }
    */

    /*
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
            b=new ans(this.check_inside_threat(Jet.getX(),Jet.getY(),Tx,Ty,Td),this.calcDist(Jet.getX(),Jet.getY(),Tx,Ty),Jet)
            a.push(b);
        }

        a.sort((n1,n2) =>n1.getRange()-n2.getRange());

        return(a)
    }
    */



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
    
    public static check_inside_threat (long_friend: number, lat_friend: number, long_threat: number, lat_threat: number, dist_miles:number): boolean {
        console.log(`Checking if coordinates: (${lat_friend}, ${long_friend}) is inside or on the circle with center at: (${lat_threat}, ${long_threat}) and threat radius of: ${dist_miles} nautical Miles`);
        let distanceInMiles=this.calcDist(lat_friend,long_friend,lat_threat,long_threat);
        distanceInMiles=Math.floor(distanceInMiles*1000);
        distanceInMiles=distanceInMiles/1000;
        console.log(`Distance: ${distanceInMiles}, threat: ${dist_miles}`);
        console.log((distanceInMiles <= dist_miles) + " check");
        const isInside:boolean = distanceInMiles <= dist_miles;
        return isInside;
    }

    /*
    // Test cases
    console.log(inside_threat_range(1, 1, 0, 0, 2)); // true
    console.log(inside_threat_range(3, 3, 0, 0, 2)); // false
    console.log(inside_threat_range(0, 0, 3, 1.5, 2.4)); // false
    */
    /*
    public static MilesToDeg(dist:number,lat:number): number {
        
        // 60 nautical mile = 1 degree of latitude (-90<-0->90)
        // R_degrees = dist/(60*Math.cos(lat))
        console.log(`Converting ${dist} miles to degrees: `);
        let Degrees:number;
        let temp:number = Math.cos(lat);
        Degrees=dist/(60*temp);
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
    */


    public static find_Edge (a: number, b: number, r: number): { east: number, west: number, north: number, south: number } {
        console.log(`Finding edge coordinates with center at: (${a}, ${b}) and threat radius of: ${r} as a square` );
        let rangeDeg=r/60;
        let north = b + rangeDeg;
        let south = b - rangeDeg;
        let east = a + rangeDeg;
        let west = a - rangeDeg;
        if (b + rangeDeg > 180) {
            console.log(`East edge exceeds 180 degrees, adjusting to 180`);
            east = (-180) + ((b + r) - 180);
            //should run west ->180; and -180 ->east;
        }
        if (b - rangeDeg < -180) {
            console.log(`West edge exceeds -180 degrees, adjusting to -180`);
            west = 180 - ((b - rangeDeg) + 180);
            //should run west ->180; and -180 ->east;
        }
        //לא הצלחתי למצוא דרך לחשב מרחק הכי קצר באיזור הקטבים מסביב ל90מעלות
        if (a + rangeDeg > 86) {
            console.log(`North edge exceeds 90 degrees, adjusting to 90`);
            north = 90;
            east =180
            west=-180
        }
        if (a - rangeDeg < -86) {
            console.log(`South edge exceeds -90 degrees, adjusting to -90`);
            south = -90;
            east =180
            west=-180
        }

        return { east, west, north, south };
    }

    
    //console.log(find_Edge(0, 175, 8)); // { east: 2, west: -2, north: 2, south: -2 }
    



    public static will_it_intercept (distance_jet:number, distance_threat:number, speed_jet:number, speed_threat:number): boolean {
        const time_jet = distance_jet / speed_jet;
        const time_threat = distance_threat / speed_threat;
        if (time_jet <= time_threat) {
            return true;
        }
        return false;
    }

    public static TTI(dist:number,threatVelocity:number):number{
        let time:number=dist/threatVelocity;
        return time;
    }
    /*
    public static will_it_intercept_2 (distance_jet:number, distance_threat:number, speed_jet:number, speed_threat:number): {x: number, y: number, a: number, b: number, r: number, isInside: boolean} {
        const time_jet = distance_jet / speed_jet;
        const time_threat = distance_threat / speed_threat;
        if (time_jet <= time_threat) {
            return {x: 0, y: 0, a: 0, b: 0, r: 0, isInside: true};
        }
        return {x: 0, y: 0, a: 0, b: 0, r: 0, isInside: false};
    }
    */

    /*
    public static Distance= (x1: number, y1: number, x2: number, y2: number): number => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    */
    /*
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
        
        if (jet.Heading > 90 && jet.Heading < 270 && jet_y < y_intercept&& jet_x < x_intercept) {
            threatend = false;
        }else if(jet_x > x_intercept && jet_y > y_intercept){
            threatend = false;
        }
        //לא לגמרי נכון, צריך לחשב את המרחק מהמעגל ולבדוק האם המטוס יכול לצאת מהמעגל לפני שהאיום יתפוס אותו.
        
        
        
        return threatend;
    }
    */
}



export default CalculatorD