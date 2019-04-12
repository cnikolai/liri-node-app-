require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var argsdwis = "";

//access keys
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

if (command === "do-what-it-says") {
    fs.appendFile("log.txt", "do-what-it-says: ", function(err) {
        if (err) {
            return console.log(err);
        }
    });
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          return console.log(error);
        }
    
        mydata = data.split(",");
    
        command = mydata[0];
        //console.log(command);
        //mydata = mydata[1].split(" ");
        argsdwis = mydata.splice(1).join(" ");
        argsdwis = argsdwis.replace(/['"]+/g, '')
        //var test = argsdwis.split("\"");
        //console.log(argsdwis);
        //console.log(test[1]);
        //argsdwis = data.join(" ");
    
    switch (command) {
        case "concert-this":
            var band = "";
           //if we didn't grab the args from the input file, then grab them from the command line
           if (argsdwis === "") {
               args = process.argv;
               band = args.slice(3).join(" ");
           }
           else {
               band = argsdwis;
           }
           
           //console.log("band: ",band);
           fs.appendFile("log.txt", "concert-this: "+band+"\n", function(err) {
                if (err) {
                    return console.log(err);
                }
            });

           //https://www.rockarchive.com/artists
           //bruce springsteen
           //backstreet boys
           //blue
           
           // Run the axios.get function...
           // The axios.get function takes in a URL and returns a promise (just like `$.ajax)
           axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
               function(response) {
               // If the axios was successful...
               // Then log the body from the site!
       
               //console.log(response.data[0]);
       
               if (response.data[0] === undefined) {
                   console.log("This band is not in the API - Please enter a different band");
                   return;
               }
               //for (var i = 0; i < response.data.length; i++ ) {
               console.log(response.data[0].venue.name);
               console.log(response.data[0].venue.city + ", " + response.data[0].venue.region);
               console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
               // var date = response.data[0].datetime.split("T");
               // var temp = moment(response.data[0].datetime, ["MM/DD/YYYY", moment.ISO_8601]);
               // console.log(temp);
               //console.log(response.date); //TODO: use moment.js to format into correct format
               //console.log("\n");
               //}
           },
           function(error) {
             if (error.response) {
               // The request was made and the server responded with a status code
               // that falls out of the range of 2xx
               console.log(error.response.data);
               console.log(error.response.status);
               console.log(error.response.headers);
             } else if (error.request) {
               // The request was made but no response was received
               // `error.request` is an object that comes back with details pertaining to the error that occurred.
               console.log(error.request);
             } else {
               // Something happened in setting up the request that triggered an Error
               console.log("Error", error.message);
             }
             console.log(error.config);
           }
           );
           break;
        case "spotify-this-song":
        //if we didn't grab the args from the input file, then grab them from the command line
        //console.log((argsdwis));

        var song = "";
        if (argsdwis !== "") {
           //args = process.argv;
        //    if (args.length === 3) {
        //     song = undefined;
        //    }
           song = argsdwis;//args.slice(3).join(" ");
           
        }
        // else {
        //     song = argsdwis;
        // }
       // console.log((song));
           if (song === "") {
               song = "The Sign";
           }
           //console.log("song: " + song);
       
           fs.appendFile("log.txt", "spotify-this: "+song+"\n", function(err) {
            if (err) {
                return console.log(err);
            }
        });
           // search tracks whose name, album or artist contains 'Love'
           spotify.search({ type: 'track', query: song }, function(err, data) {
               if ( err ) {
                   console.log('Error occurred: ' + err);
                   return;
               }
               if (song === "The Sign") {
                   //console.log(JSON.stringify(data.tracks.items[9], null, 2));
                   // Do something with 'data'
                   
                   //Artist(s)
                   console.log(data.tracks.items[9].album.artists[0].name);
                   //The song's name
                   console.log(song);
                   //A preview link of the song from Spotify
                   console.log(data.tracks.items[9].album.external_urls.spotify);
                   //The album that the song is from
                   console.log(data.tracks.items[9].album.name);
               }
               else {
                   //console.log(JSON.stringify(data,null,2));
                   //console.log("**************");
                   //console.log(JSON.stringify(data.tracks.items[0], null, 2));
                   // Do something with 'data'
                   
                   //Artist(s)
                   console.log(data.tracks.items[0].album.artists[0].name);
                   //The song's name
                   console.log(song);
                   //A preview link of the song from Spotify
                   console.log(data.tracks.items[0].album.external_urls.spotify);
                   //The album that the song is from
                   console.log(data.tracks.items[0].album.name);
                   // fs.appendFile("output.txt", JSON.stringify(data,null,2), function(err) {
                   //     if (err) {
                   //       return console.log(err);
                   //     }
                   //   });
               }
           });
           break;
        case "movie-this":
        var movie = "";
        //if we didn't grab the args from the input file, then grab them from the command line
        if (argsdwis === "") {
           args = process.argv;
           movie = args.slice(3).join(" ");
        }
        else {
            movie = argsdwis;
        }
           if (movie === "") {
               movie = "Mr. Nobody";
           }
           fs.appendFile("log.txt", "movie-this,"+movie+ "\n", function(err) {
            if (err) {
                return console.log(err);
            }
        });
           // Then run a request with axios to the OMDB API with the movie specified
           axios.get("http://www.omdbapi.com/?t="+movie+"&apikey=trilogy").then(
           function(response) {
               //console.log(response.data);
               //* Title of the movie.
               console.log(response.data.Title);
               //* Year the movie came out.
               console.log(response.data.Year);
               //* IMDB Rating of the movie.
               console.log(response.data.Rated);
               //* Rotten Tomatoes Rating of the movie.
               console.log(response.data.Ratings[1].Value);
               //* Country where the movie was produced.
               console.log(response.data.Country);
               //* Language of the movie.
               console.log(response.data.Language);
               //* Plot of the movie.
               console.log(response.data.Plot);
               //* Actors in the movie.
               console.log(response.data.Actors);
           }
         );
           break;
        default: 
           console.log("Please enter a valid command");
           break;
       }
    });
}
else {
switch (command) {
 case "concert-this":
    var band = "";
    //if we didn't grab the args from the input file, then grab them from the command line
    if (argsdwis === "") {
        args = process.argv;
        band = args.slice(3).join(" ");
    }
    else {
        band = argsdwis;
    }

    //console.log("band: " + band);
    fs.appendFile("log.txt", "concert-this,"+band+ "\n", function(err) {
        if (err) {
            return console.log(err);
        }
    });

    //https://www.rockarchive.com/artists
    //bruce springsteen
    //backstreet boys
    //blue
    
    // Run the axios.get function...
    // The axios.get function takes in a URL and returns a promise (just like `$.ajax)
    axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
        function(response) {
        // If the axios was successful...
        // Then log the body from the site!

        //console.log(response.data[0]);

        if (response.data[0] === undefined) {
            console.log("This band is not in the API - Please enter a different band");
            return;
        }
        //for (var i = 0; i < response.data.length; i++ ) {
        console.log(response.data[0].venue.name);
        console.log(response.data[0].venue.city + ", " + response.data[0].venue.region);
        console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
        // var date = response.data[0].datetime.split("T");
        // var temp = moment(response.data[0].datetime, ["MM/DD/YYYY", moment.ISO_8601]);
        // console.log(temp);
        //console.log(response.date); //TODO: use moment.js to format into correct format
        //console.log("\n");
        //}
    },
    function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
    );
    break;
 case "spotify-this-song":
 //if we didn't grab the args from the input file, then grab them from the command line
 var song = "";
 if (argsdwis === "") {
    args = process.argv;
    song = args.slice(3).join(" ");
 }
 else {
     song = argsdwis;
 }
 //console.log(typeof(song));
    if (song === "") {
        song = "The Sign";
    }
    //console.log("song: " + song);

    fs.appendFile("log.txt", "spotify-this,"+song+ "\n", function(err) {
        if (err) {
            return console.log(err);
        }
    });
    // search tracks whose name, album or artist contains 'Love'
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        if (song === "The Sign") {
            //console.log(JSON.stringify(data.tracks.items[9], null, 2));
            // Do something with 'data'
            
            //Artist(s)
            console.log(data.tracks.items[9].album.artists[0].name);
            //The song's name
            console.log(song);
            //A preview link of the song from Spotify
            console.log(data.tracks.items[9].album.external_urls.spotify);
            //The album that the song is from
            console.log(data.tracks.items[9].album.name);
        }
        else {
            //console.log(JSON.stringify(data,null,2));
            //console.log("**************");
            //console.log(JSON.stringify(data.tracks.items[0], null, 2));
            // Do something with 'data'
            
            //Artist(s)
            console.log(data.tracks.items[0].album.artists[0].name);
            //The song's name
            console.log(song);
            //A preview link of the song from Spotify
            console.log(data.tracks.items[0].album.external_urls.spotify);
            //The album that the song is from
            console.log(data.tracks.items[0].album.name);
            // fs.appendFile("output.txt", JSON.stringify(data,null,2), function(err) {
            //     if (err) {
            //       return console.log(err);
            //     }
            //   });
        }
    });
    break;
 case "movie-this":
 //if we didn't grab the args from the input file, then grab them from the command line
 var movie = "";
 if (argsdwis === "") {
    args = process.argv;
    movie = args.slice(3).join(" ");
 }
 else {
     movie = argsdwis;
 }
    if (movie === "") {
        movie = "Mr. Nobody";
    }
    fs.appendFile("log.txt", "movie-this,"+movie + "\n", function(err) {
        if (err) {
            return console.log(err);
        }
    });
    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t="+movie+"&apikey=trilogy").then(
    function(response) {
        //console.log(response.data);
        //* Title of the movie.
        console.log(response.data.Title);
        //* Year the movie came out.
        console.log(response.data.Year);
        //* IMDB Rating of the movie.
        console.log(response.data.Rated);
        //* Rotten Tomatoes Rating of the movie.
        console.log(response.data.Ratings[1].Value);
        //* Country where the movie was produced.
        console.log(response.data.Country);
        //* Language of the movie.
        console.log(response.data.Language);
        //* Plot of the movie.
        console.log(response.data.Plot);
        //* Actors in the movie.
        console.log(response.data.Actors);
    }
  );
    break;
 default: 
    console.log("Please enter a valid command");
    break;
}
}
