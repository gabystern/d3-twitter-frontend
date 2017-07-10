const tweetsDevURL = 'https://localhost:3000/api/v1/tweets'
const tweetsProdURL = 'https://twending-api.herokuapp.com/api/v1/tweets'

const chartsDevURL = 'https://localhost:3000/api/v1/charts'
const chartsProdURL = 'https://twending-api.herokuapp.com/api/v1/charts'

export class TweetsAdapter {
  static fetchTweets(searchTerm){
    return fetch(tweetsProdURL, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ search_term: searchTerm})
    })
    .then(res => res.json() )
  }

}

function headers(){
  return {
    'content-type': 'application/json',
    'accept': 'application/json',
  }
}
