/**
 * Created by quang on 11/28/2016.
 */
module.exports = {
    'facebookAuth' : {
        'clientID': '177938899338456',
        'clientSecret': '528124e143c290d9c8f3baa7f586b0ca',
        'callbackURL': "http://localhost:3000/auth/facebook/callback"
    },

    'googleAuth' : {
        'consumerKey': 'GOOGLE_CONSUMER_KEY',
        'consumerSecret': 'GOOGLE_CONSUMER_SECRET',
        'callbackURL': "http://127.0.0.1/auth/google/callback"
    },

    'twitterAuth' : {
        'consumerKey': 'TWITTER_CONSUMER_KEY',
        'consumerSecret': 'TWITTER_CONSUMER_SECRET',
        'callbackURL': "http://127.0.0.1:3000/auth/twitter/callback"
    },

    'githubAuth' : {
        'clientID': 'GITHUB_CLIENT_ID',
        'clientSecret': 'GITHUB_CLIENT_SECRET',
        'callbackURL': "http://127.0.0.1:3000/auth/github/callback"
    },

    'bearerAuth' : {
        'clientSecret': 'moi_ngay_toi_chon_mot_niem_vui',
        "tokenTTL": 60 * 60,
    }
}