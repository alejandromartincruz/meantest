// grab the nerd model we just created
var Nerd = require('./models/nerd');

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/nerds', function(req, res) {
            // use mongoose to get all nerds in the database
            Nerd.find(function(err, nerds) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);

                res.json(nerds); // return all nerds in JSON format
            });
        })

        .get('/api/nerds/:nerd_id', function(req, res){
            Nerd.findById(req.params.nerd_id, function(err, nerd) {
                if (err)
                    res.send(err);

                res.json(nerd);
            });
        })

        .put('/api/nerds/:nerd_id', function(req, res){
            Nerd.findById(req.params.nerd_id, function(err, nerd) {
                if (err)
                    res.send(err);

                nerd.name = req.query.name;
                nerd.age = req.query.age;
                nerd.glasses = req.query.glasses;

                nerd.save(function(err){
                    if (err)
                        res.send(err);
                    
                    res.json({message: 'Nerd updated!'});
                });
            });
        })

        .post('/api/nerds', function(req, res) {
                var nerd = new Nerd();
                nerd.name = req.query.name;
                nerd.age = req.query.age;
                nerd.glasses = req.query.glasses;

                nerd.save(function(err) {
                    if (err)
                        res.send(err);

                    res.json({message: 'Nerd ' + req.query.name + ' created!'});
                });
        })

        .delete('/api/nerds/:nerd_id', function(req, res) {
            Nerd.remove({
                _id: req.params.nerd_id
            }, function(err, nerd) {
                if (err)
                    res.send(err)

                res.json({message: 'Nerd succesfully deleted'});
            });
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            var path = require('path');
            var filePath = "./public/views/index.html"
            var resolvedPath = path.resolve(filePath);
            //console.log(resolvedPath);
            res.sendFile(resolvedPath); // load our public/index.html file
        });

    };
