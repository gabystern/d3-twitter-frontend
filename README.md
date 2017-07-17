# Twending
> Visualize patterns in how the world is talking. <br>

Twending is an data visualization tool that enables users to search tweets by hashtag and create a variety of interactive graphs to map the prevalence/impact of a hashtag over a period of time as well as an average sentiment towards that hashtag. Twending has a React frontend with graphs built using D3.js and a <a href="https://github.com/gabystern/d3-twitter-backend">Rails backend</a>.

Checkout tweets yourself <a href="https://twending-client.herokuapp.com/">here</a>!

# Demo
## TwitterPlot
Create a scatterplot graph that shows the latest tweets based on searched hashtag. Dots are plotted by time tweeted and number of retweets. Dot size and color are determined by number of retweets. Mouse over each dot to see information about each tweet!

Download the graph as a PNG to your computer.

 ![Alt text](./public/assets/vid1.gif?raw=true "TwitterPlot")

## Sentiment Chart
View the average sentiment of tweets based on a given hashtag. Tweets are analyzed using the ruby gem <a href="https://github.com/7compass/sentimental">sentimental</a>. An area graph is created based on the sentiment score of each tweet and mapped over time. Detailed information on the average score as well as the most positively and negatively scored tweets are given.

Download the graph as a PNG to your computer.

 ![Alt text](./public/assets/vid2.gif?raw=true "Sentiment")


# Stack
- React Frontend
- Rails API Backend
- D3 Graphs
