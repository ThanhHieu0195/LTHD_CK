/**
 * Created by quang on 11/28/2016.
 */
module.exports = {
    // host
    // 'facebookAuth' : {
    //     'clientID': '203198970145713',
    //     'clientSecret': '72830f248635f4dc8e2a7a215f153643',
    //     'callbackURL': "http://localhost:3000/auth/facebook/return"
    // },
    // local
    'facebookAuth' : {
        'clientID': '1874731906079001',
        'clientSecret': '5113c7d97fbe314ef228874903c17bc3',
        'callbackURL': "http://localhost:3000/auth/facebook/return"
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
        "tokenTTL": 60*60
    }
}