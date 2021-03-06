// https://github.com/aurasphere/mongodb-university-classes/blob/master/M121%20-%20The%20MongoDB%20Aggregation%20Framework/Chapter%201%20-%20Basic%20Aggregation%20-%20%24match%20and%20%24project/Optional%20Lab%20-%20Expressions%20with%20%24project/Optional%20Lab%20Solution.js

function getRecord() {
    var pipeline = [
        {
            $match: {
                'imdb.rating':{$gte:7},
                'genres':{$nin:['Crime','Horror']},
                $or: [{'rated':'PG'},{'rated':'G'}],
                'languages': {$all: ['English','Japanese']}
            }
        },
        {
            $project:{
                _id:0, title:1, rated:1
            }
        }
    ]
    db.movies.aggregate([
        {
            $match: {
                'imdb.rating':{$gte:7},
                'genres':{$nin:['Crime','Horror']},
                $or: [{'rated':'PG'},{'rated':'G'}],
                'languages': {$all: ['English','Japanese']}
            }
        },
        {
            $project:{
                _id:0, title:1, rated:1
            }
        }
    ]).itcount();


    db.solarSystem.aggregate([
        {
            $project:{
                _id:0, name:1,"gravity.value":1
            }
        }
    ]);

    db.solarSystem.aggregate([
        {
            $project:{
                _id:0, name:1,gravity:"$gravity.value"
            }
        }
    ]);


    db.movies.aggregate([
        {
            $project:{
                _id:0,
                moviesCount: { $size :  {$split:['$title',' ']} }
            }
        },
        {
            $match:{
                moviesCount: 1
            }
        }

    ]).itcount();

    //
    db.movies.aggregate([
        {
            $match: {
                writers: {$elemMatch: {$exists: true}},
                cast: {$elemMatch: {$exists: true}},
                directors: {$elemMatch: {$exists: true}},
            }
        },
        {
            $project:{
                _id:0,title:1,cast: 1,directors:1,
                writers: {
                    $map: {
                        input: "$writers",
                        as: "writer",
                        in: {$arrayElemAt: [{$split: [ "$$writer", " (" ]}, 0]}
                    }
                }
            },
        },
        {
            $project:{
                title:1,
                laboutOfLove: {$setIntersection:["$cast","$directors","$writers"] }

            }
        },
        {
            $match: {
                laboutOfLove: {$elemMatch: {$exists: true}}
            }
        },
        { $project:
                {
                    "laborOfLove": {
                        $gt: [
                            {
                                $size: {
                                    $setIntersection: ["$writers", "$cast", "$directors"]
                                }
                             }, 0 ] } }
        },
        {
            $count: 'commontCount'
        }
    ]).pretty()

    db.movies.aggregate([
        {
            $project:{
                _id: 0, cast: 1, writers: 1
            }
        },
        {
            $match: {
                title: "Life Is Beautiful",

            }
        }
    ]).pretty()


// Lab: Using Cursor-like Stages



    db.movies.aggregate([
        {
            $match:{
                "tomatoes.viewer.rating":{$gte:3},
                "countries": { $in: ["USA"] },
                "cast" : { $exists : true }
            }
        },
        {
            $project:{
                _id:0,
                title:1,
                "ratings": "$tomatoes.viewer.rating",
                cast:1,
                favorites:["Sandra Bullock",
                    "Tom Hanks",
                    "Julia Roberts",
                    "Kevin Spacey",
                    "George Clooney"],

            }
        },{
            $addFields:{
                num_favs: {$setIntersection:["$cast","$favorites"]}
            }
        },
        {
            $match:{
                num_favs:{$elemMatch:{$exists:true}}
            }
        },
        {
            $project:{
                title:1,
                ratings: 1,
                cast:1,
                favorites:1,
                num_favs:{$size: "$num_favs"}
            }
        },
        {
            $sort: {num_favs:-1, "ratings":-1, title:-1}
        },
        {
            $limit:25
        }
    ]).pretty()

    // Group

    db.movies.aggregate([
        {
            $group:{
                _id:{
                    directorsCond:{
                        $cond:[{$isArray:"$directors"},{$size:"$directors"},0]
                    }
                },
                num_of_filem:{$sum:1}
            }
        },
        {
            $sort:{"_id.directorsCond":-1}
        }
    ]);
    /*
    Chapter 2: Basic Aggregation - Utility Stages
Lab - Bringing it all together
     */

    db.movies.aggregate([
        {
            $match:{
                "languages" : "English",
                "imdb.rating":{$gte:1},
                "imdb.votes":{$gte:1},
                year: {$gte:1990},

            }
        },{
            $project:{
                title:1,
                year:1,
                "imdb.rating":1,
                "imdb.votes":1,
                avgRating: {$avg:"$imdb.votes"}
            }
        }
    ]);

    // Lab - $group and Accumulators
    db.movies.aggregate([
        {
            $match:{
                awards: { $exists:true }
            }
        },{
            $project:{
                _id:0,
                title:1,
                award_array:{
                    $split:["$awards",' ']
                }
            }
        }
    ]).pretty()

// Lab - $group and Accumulators
    db.movies.aggregate([
        {
            $match:{
                awards: { $regex: /Won \d+ Oscar/  },
                "imdb.rating": {$exists:true}

            }
        },{
            $project:{
                _id:0,
                title:1,
                awards:1,
                "imdb.rating":1,

            }
        },{
            $group:{
                _id: null,
                count: {$sum:1},
                highestRatings: {$max:"$imdb.rating"},
                lowestRatings: {$min:"$imdb.rating"},
                avgRating: {$avg:"$imdb.rating"},
                ageStdDev: { $stdDevSamp: "$imdb.rating" }
            }
        }
    ]).pretty()

// Lab - $unwind
    db.movies.aggregate([
        {
            $match:{
                languages:{$all:['English']},
                cast : { $exists:true },
                "imdb.rating": {$exists:true}
            }
        },{
            $project:{
                _id:0,
                languages:1,
                title:1,
                cast:1,
                castSize:{$size: "$cast"},
                ratings:"$imdb.rating",
            }
        },{
            $unwind:"$cast"
        },{
            $group: {
                _id:"$cast",
                Number_of_movies: { $sum:1 },
                ratings_avg:{  $avg:"$ratings"}
            },
        },{
            $sort: {Number_of_movies:-1}
        },{
            $limit: 1
        }
    ]).pretty()
// ratings:{ $trunc :[{ $avg:"$ratings" },1]}

// $graphLookup: Simple Lookup

 db.parent_reference.aggregate([
     {
         $match:{
             name: 'Eliot'
         }
     },{
         $graphLookup: {
             from: 'parent_reference',
             startWith: '$_id',
             connectFromField: '_id',
             connectToField: 'reports_to',
             as: 'all_report',
        }
     }
 ]);

// Lab: $graphLookup
    var result = db.air_alliances.aggregate([{
        $match: { name: "OneWorld" }
    },{
        $graphLookup: {
            startWith: "$airlines",
            from: "air_airlines",
            connectFromField: "name",
            connectToField: "name",
            as: "airlines",
            maxDepth: 0,
            restrictSearchWithMatch: {
                country: { $in: ["Germany", "Spain", "Canada"] }
            }
        }
    },{
        $graphLookup: {
            startWith: "$airlines.base",
            from: "air_routes",
            connectFromField: "dst_airport",
            connectToField: "src_airport",
            as: "connections",
            maxDepth: 1
        }
    }, {
        $project: {
            validAirlines: "$airlines.name",
            "connections.dst_airport": 1,
            "connections.airline.name": 1
        }
    },{ $unwind: "$connections" },{
            $project: {
                isValid: { $in: ["$connections.airline.name", "$validAirlines"] },
                "connections.dst_airport": 1
            }
    },{ $match: { isValid: true } },
    { $group: { _id: "$connections.dst_airport" } }
    ]);

// max rating
    db.movies.aggregate([
        {
            $match:{
                "imdb.rating":{$exists:true}
            }
        },{
            $project:{
                _id:0,
                title:1,
                "imdb.rating":1
            }
        },
        {
            $group:{
                _id : "$imdb.rating",
                max:{$max:"$imdb.rating"}
            }
        },{ $sort: { max: -1} },
    ]);


//    Lab - $facets
  db.movies.aggregate([
      {
          $match:{
              "imdb.rating" : { $gt : 0 },
              "metacritic" : { $gt : 0 }
          }
      },{
        $facet:{
            "imdbRating":[
                {$sort:{"imdb.rating":-1}},
                {$limit:10},
                {
                    $project:{
                        _id:0,
                        title:1,
                        "imdb.rating":1,
                        metacritic:1
                    }
                }
            ],
            "AsMataccirtic":[
                {$sort:{"metacritic":-1}},
                {$limit:10},
                {
                    $project:{
                        _id:0,
                        title:1,
                        "imdb.rating":1,
                        metacritic:1
                    }
                }
            ],

        }
      },
      {
          $project:{
              imdbRating:1,
              AsMataccirtic:1,
              "sizeOfimdb":{$size:"$imdbRating"},
              "sizeOfimdb":{$size:"$AsMataccirtic"},
              commonToBoth: { $setIntersection: [ "$imdbRating", "$AsMataccirtic" ] },
          }
      }
  ]).pretty();

}
