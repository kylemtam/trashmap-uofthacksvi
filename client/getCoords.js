const getCoords = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyClqkYGZ8mfGfCZWyHoa-rVsOD30HQJNFQ",
        authDomain: "uofthacks18.firebaseapp.com",
        databaseURL: "https://uofthacks18.firebaseio.com",
        projectId: "uofthacks18",
        storageBucket: "uofthacks18.appspot.com",
        messagingSenderId: "33526292057"
    });
    const db = firebase.database();
    const coords = db.ref("coords/");
    
    coords.on("value", function(ss) {
        ss.forEach(el => {
            console.log(el.val());
        });
    })
}