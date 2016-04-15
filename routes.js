var fs = require('fs');
var request = require("request");
var zip = new require('node-zip')();

module.exports = function(app) {

    app.get('/', function(req, res) {
       
    })

    app.get('/download', function(req, res) {       
        var text_ready = "This is a content of a txt file."
        res.writeHead(200, { 'Content-Type': 'application/force-download', 'Content-disposition': 'attachment; filename=file.txt' });
        
        res.end(text_ready);
    })


    app.post('/zip', function(req, res) {    	

        var lang = req.body.lang;
        var word = req.body.word;
        var export_type = req.body.export_type;     

        var _arrLang = [];

        for (var i = 0; i < lang.length; i++) {
        
           _arrLang[lang[i]] = '';

            for (var j = 0; j < word.length; j++) {           

               _arrLang[lang[i]]+="var "+word[j].title+" = \""+word[j].langs[lang[i]]+"\";\n";
            }

            zip.file(lang[i]+".js",_arrLang[lang[i]]);
        
        }
    
        var data = zip.generate({ base64: false, compression: 'DEFLATE' });

        fs.writeFile (global.appRoot+'/test.zip', data, 'binary',function(err) {
        	if(err) throw err;
        	console.log("A");
        	res.send(200);
        });
 
    })

}
