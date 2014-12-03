// app/routes/project.js

/**
 * Modul dependencies
 */
var Project = require('./../models/project');

/**
 * Expose routes
 */
module.exports = function(app, passport) {

    /**
     * Get all the projects from the database.
     * @see isLoggedInAjax()
     */
    app.get('/api/projects', function (req, res) {
        Project.find(function (err, projects) {
            if (err) {
                return res.send(err);
            }

            res.json(projects);
        });
    });

    /**
     * Create a project based on the data provided in the request 
     * and save it in the database.
     * @see isLoggedInAjax()
     */
    app.post('/api/projects', isLoggedInAjax, function (req, res) {
        Project.create({
            title: req.body.title,
            content: req.body.content,
            grade: req.body.grade,
            students: req.body.students,
            semester: req.body.semester
        }, function (err, project) {
            if (err) {
                res.send(err);
            }

            res.json(project);
        });
    });

};

/**
 * Middleware to check if the user is logged in using ajax get request
 * @param  {Object}   req  Request object
 * @param  {Object}   res  Response object
 * @param  {Function} next Next route
 * @return {Boolean} Return json if the user is not logged in else go the next route.
 */
function isLoggedInAjax(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.json({
            redirect: '/login' 
        });
    } else {
        next();
    }
}
