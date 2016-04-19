# Movie Search App

In this application we will be working with the OMDB API to develop a movie search front end. This application will make use of Handlebars for templating.

- Download the starter code, and link Handlebars and your custom JS file.
- You will be using the OMDB search API to pull a list of movies matching a search query in the text field.
- A sample query is:

```
http://www.omdbapi.com?s=The+Matrix
```

- The JSON that comes back only gives you truncated information. You will need much more movie information to fill out the rest of the template.
- You will need to make subsequent requests to retrieve the rest of the information. A good way to do this is through using the IMDB ID endpoint:

```
http://www.omdbapi.com/?i=tt0133093
```

- The app should hide the search box when the search is successful and show the movie cards with the correct information.
- **Bonus:** Provide the user with the option to search again after the results come in.