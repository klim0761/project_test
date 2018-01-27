var express = require('express');
var router = express.Router();
var db = require('../libs/db');

var fs = require('fs');
var PDFDocument = require('pdfkit');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.all('/:firstName', function (req, res) {

    var query = db.connection.query('SELECT * FROM user WHERE firstName = ?', req.params.firstName, function (err, rows) {
        if (err)
            console.log("Error selecting : %s", err);

        if (rows.length == 0) {
            res.send(false);
        }else {

            res.send(true);

            var document = new PDFDocument;
            document.font('Times-Roman')
                .fontSize(20);
            document.text(rows[0].firstName + ' ' + rows[0].lastName)
                .image(rows[0].image, 100, 100);
            document.pipe(fs.createWriteStream('output.pdf'));
            document.end();

            var text = fs.readFileSync('output.pdf');
            var query = db.connection.query('UPDATE user SET pdf = ? WHERE firstName = ?', [text, req.params.firstName],
                function (err, rows) {
                    if (err)
                        console.log("Error selecting : %s", err);
                })
        }

    });

});

module.exports = router;
