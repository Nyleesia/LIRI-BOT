# LIRI-BOT
A command-line interpreter, which takes in a pre-defined command and runs the argument after the command. 

LIRI-Bot, like Siri, takes in user requests and returns information based on these requests. However, unlike Siri, LIRI uses text input, rather than voice inputs. 

This app uses javascript and node.js, to make API calls right in the terminal, using the command-line inputs. NPM derived packages are then installed, as needed, to improve the functionality of the code executed when a command-line argument is made. These packages include: 
-axios
-dotenv, and
-fs.

To run the app: 
- install node.js
- initiate node in the root directory of the coded files, to create a package.json
- open the terminal
- type the following to call the correct file: "node liri.js", then one of the following commands "movie-this", "concert-this" or "spotify-this-song", type in the movie, artist, or song title you would like to search for, and
- hit the enter key to see your results.
