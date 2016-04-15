var fs = require('fs');
var request = require("request");
var zip = new require('node-zip')();

module.exports = function(app) {

    app.get('/', function(req, res) {
        // res.send('Hello World');
    })

    app.get('/download', function(req, res) {


        //console.log("A");
        var text_ready = "This is a content of a txt file."


        res.writeHead(200, { 'Content-Type': 'application/force-download', 'Content-disposition': 'attachment; filename=file.txt' });
        // request(req.url).pipe(res);
        res.end(text_ready);
    })


    app.post('/zip', function(req, res) {

    	   // console.log(req.body);

        var lang = req.body.lang;
        var word = req.body.word;
        var export_type = req.body.export_type;

        console.log(word);

        var _arrLang = [];

        for (var i = 0; i < lang.length; i++) {
           // _arrLang[lang[i]] = [];
           _arrLang[lang[i]] = '';

            for (var j = 0; j < word.length; j++) {

               // _arrLang[lang[i]][word[j].title] = word[j].langs[lang[i]];

               _arrLang[lang[i]]+="var "+word[j].title+" = \""+word[j].langs[lang[i]]+"\";\n";
            }

            zip.file(lang[i]+".js",_arrLang[lang[i]]);
            //_arrLang[lang[i]]
        }

      	



       // res.send(200);

        
      //zip.file('js/test.txt', 'hello there');
     // zip.file('test2.txt', 'hello there');
        var data = zip.generate({ base64: false, compression: 'DEFLATE' });

        fs.writeFile (global.appRoot+'/test.zip', data, 'binary',function(err) {
        	if(err) throw err;
        	console.log("A");
        	res.send(200);
        });
      //  res.end(data); // ugly data
//res.send(200);
        //res.send(200,data);
    })

}
