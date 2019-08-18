const log=console.log; // saves a log variable as console.log is repeated several times to run this program

require("dotenv").config(); // keeps my spotify keys from being cloned along with my code by using process.env from .emv

const keys = require("./keys.js"); // saves the call for the file that contain my API keys as a variable

// calls for additional nmps needed:
const axios = require("axios");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);
const fs = require("fs");
const omdb = require('omdb');

// accesses the command-line arguments from index 2
const searchType = process.argv[2];
const search = process.argv.slice(3).join(" ");
log (search);

// acceses the random.txt file and reads the content to determine the type of search that was previously made
const prevSerarchType=fs.readFileSync("random.txt", "utf8"); 


const space ="\n*******************************************\n\n" // saves a spacer variable for readability

// conditional logic checking the searchType, then executing the appropriate function based on the argument entered at index 3 
if (searchType===`concert-this`){ 
    if (search === undefined || search === ""){
        log(`Invalid entry ${space}`);
    }

    else{
        findConcert();
    }
};
if (searchType===`spotify-this-song`){ 
    if (search === undefined || search === ""){
        log(`Invalid entry ${space}`);
    }

    else{
        findSong();
    }
};
if (searchType===`movie-this`){ 
    if (search === undefined || search === ""){
        log(`Invalid entry ${space}`);
    }

    else{
        findMovie();
    }
};
if (searchType===`do-what-it-says`){ 
    log (prevSerarchType);
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err){
            log (err);
        }
        if (prevSerarchType === "concert-this"){
            findConcert();
        }
        if (prevSerarchType === "movie-this"){
            findMovie();
        }
        if (prevSerarchType === "spotify-this-song"){
            findSong();
        }
    }); 
}

// functions for each of three possible searchTerms*********************************************

    // function to search for concerts
    function findConcert (){        
        let artist= process.argv.slice(3).join(" ");
        let concertUrl = (`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`);
        
        axios.get(concertUrl)
        .then(function (response, err) 
           {
               if (err != null) {
                   return log("err: " + err)
                }

            log(response);
            log(`Venue Name: ${response.data[0].venue.name}`);
            log(`City: ${response.data[0].venue.city}`);
            log(`Time: ${response.data[0].datetime}`);


            log(space);
            
            // re-writes the search type in the random.txt file
            if (searchType != "do-what-it-says"){
            fs.writeFile("random.txt", `${searchType}`, function(err) { if (err) throw err;});
            }

            // saves concert searches to a log file
            fs.appendFileSync("logConcerts.txt", `Venue Name: ${response.data[0].venue.name}`, function(err){if (err) throw err;}); 
            fs.appendFileSync("logConcerts.txt", `City: ${response.data[0].venue.city}`, function(err){if (err) throw err;}); 
            fs.appendFileSync("logConcerts.txt", `Time: ${response.data[0].datetime}`, function(err){if (err) throw err;}); 
        })
        .catch(function(err){
            log (err);
        });
    }

    // function to find songs
    function findSong (){
        let song = process.argv.slice(3).join(" ");
        spotify.search ({ type:"track", query: song, limit: 5}, function (err, data){
            if (err != null) {
                return log ("An error occured: " + err); 
            }
            data.tracks.items.forEach(function(element){

                log(`Artist: ${element.album.artists[0].name}`);
                log(`Song: ${element.name}`);
                log(`Preview on Spotify: ${element.preview_url}`);
                if (element.album.name != null) { 
                    log(`Album: ${element.album.name}`);
                }
                log(space)

                // re-writes the search type in the random.txt file
                if (searchType!="do-what-it-says"){
                    fs.writeFile("random.txt", `${searchType}`, function(err) { if (err) throw err;});
                    }
            
                // saves song searches to a log file
                fs.appendFileSync("logSong.txt", " ", function(err) { if (err) throw err;});
                fs.appendFileSync("logSong.txt", `-Artist: ${element.album.artists[0].name}  `, function(err) { if (err) throw err;});
                fs.appendFileSync("logSong.txt", `-Song: ${element.name}  `, function(err) { if (err) throw err;});
                fs.appendFileSync("logSong.txt", `-Preview on Spotify: ${element.preview_url}  `, function(err) { if (err) throw err;});
                fs.appendFileSync("logSong.txt", `-Album: ${element.album.name} ${space}  `, function(err) { if (err) throw err;});

            }); 
        })
    }

    // function to find movies
    function findMovie (){
        let movie = process.argv.slice(3).join(" ");

        axios
        .get(`http://www.omdbapi.com/?t=${movie}&apikey=trilogy`)
        .then(function (movie) {
            let response=movie.data;
            log ("");
            log (`Title: ${response.Title}`);
            log (`Year: ${response.Year}`);
            log (`IMDB Rating: ${response.Ratings[0].Value}`);
            log (`Rotten Tomatoes Rating: ${response.Ratings[1].Value}`);
            log (`Produced in: ${response.Country}`);
            log (`Language: ${response.Language}`);
            log (`Plot: ${response.Plot}`);
            log (`Actors: ${response.Actors}`);

            log(space);

            // re-writes the search type in the random.txt file
            if (searchType != "do-what-it-says"){
                fs.writeFile("random.txt", `${searchType}`, function(err) { if (err) throw err;});
            }

            //saves movie searches to a log file
            fs.appendFileSync("logMovie.txt", "***********************", function(err) { if (err) throw err;}); 
            fs.appendFileSync("logMovie.txt", "", function(err) { if (err) throw err;}); 
            fs.appendFileSync("logMovie.txt", `-Title: ${response.Title} `, function(err) { if (err) throw err;});
            fs.appendFileSync("logMovie.txt", `-Year: ${response.Year} `, function(err) { if (err) throw err;});
            fs.appendFileSync("logMovie.txt", `-IMDB Rating: ${response.Ratings[0].value} `, function(err) { if (err) throw err;});
            fs.appendFileSync("logMovie.txt", `-Rotten Tomatoes Rating: ${response.Ratings[1].value} `, function(err) { if (err) throw err;});
            fs.appendFileSync("logMovie.txt", `-Produced in: ${response.Country} `, function(err) { if (err) throw err;});
            fs.appendFileSync("logMovie.txt", `-Language: ${response.Title} `, function(err) { if (err) throw err;});
            fs.appendFileSync("logMovie.txt", `-Plot: ${response.Plot} `, function(err) { if (err) throw err;});
            fs.appendFileSync("logMovie.txt", `-Actors: ${response.Actors} `, function(err) { if (err) throw err;});
        })
        .catch(function(err){
            log (err);
        }) 
    };

