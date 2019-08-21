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

    db.movies.aggregate([
        {
            $match: {
                writers: {$elemMatch: {$exists: true}}
            }

        },
        {
            $project:{
                _id:0,
                title:1,
                cast: 1,
                directors:1,
                writers: {
                    $map: {
                        input: "$writers",
                        as: "writer",
                        in: {
                            $arrayElemAt: [
                                {
                                    $split: [ "$$writer", " (" ]
                                },
                                0
                            ]
                        }
                    }
                }
            },
        },
        {
            $project:{
                title:1,
                laboutOfLove: {
                    cast: "$cast",
                    directors: "$directors",
                    writers: "$writers",
            }

            }
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

}
