var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

    var _self = this;

    var langObjTemp = {
        ctrl: false,
        title: null,
        edit_value: null
    }

    var wordObjTemp = {
        ctrl: false,
        title: null,
        langs: {},
        edit_value: null
    }

    var wordLandObjTemp = {
        title: null,
        edit_value: null
    }

    _self.lang = [];

    var _fakelang = ["en", "jp"];

    for (var i = 0; i < _fakelang.length; i++) {
        var _t = angular.copy(langObjTemp);
        _t.title = _fakelang[i];
        _self.lang.push(_t);
    }

    _self.langInput = null;
    _self.word = [];
    _self.wordInput = null;

    _self.selectedWords = null;


    _self.exportType = ['js', 'php'];

    _self.exportSelcted = _self.exportType[0];

    _self.export = function() {

        var _lan = [];
        for (var i = 0; i < _self.lang.length; i++) {
            _lan.push(_self.lang[i].title);
        }

        var _word = []; //remove value     

        for (var i = 0; i < _self.word.length; i++) {

            var _tl = {};

            for (var key in _self.word[i].langs) {
                _tl[key] = _self.word[i].langs[key].title;
            }

            _word.push({
                title: _self.word[i].title,
                langs: _tl
            });

        }


        // console.log(_word);
     
        
        $http({
            method: 'POST',
            url: 'zip',
            data: {
                lang: _lan,
                word: _word,
                export_type: _self.exportSelcted
            }
        }).success(function(data, status, headers, config) {
           /* 
            var anchor = angular.element('<a/>');
            anchor.attr({
                href: 'data:application/zip;base64,' + data,
                target: '_blank',
                download: 'my.zip'
            })[0].click();
          */
            var anchor = angular.element('<a/>');
            anchor.attr({
                href: 'test.zip',
                target: '_blank',
                download: 'my.zip'
            })[0].click();



        })
    



    }


    _self.addLang = function(va) {
        if (va == null || va == '') {
            return
        }

        va = va.trim();
        va = va.toLowerCase();

        var match = false;

        for (var i = 0; i < _self.lang.length; i++) {
            if (va == _self.lang[i].title.toLowerCase()) {
                match = true;
                break;
            }
        }

        if (!match) {
            var _t = angular.copy(langObjTemp);
            _t.title = va;
            _self.lang.push(_t);
            for (var i = 0; i < _self.word.length; i++) {
                _self.word[i].langs[va] = angular.copy(wordLandObjTemp);
            }
        }

        _self.langInput = null;

    }

    _self.addWord = function(va) {
        if (va == null || va == '') {
            return
        }

        va = va.trim();
        va = va.toLowerCase();

        var match = false;

        for (var i = 0; i < _self.word.length; i++) {
            if (va == _self.word[i].title.toLowerCase()) {
                match = true;
                break;
            }
        }

        if (!match) {
            var _t = angular.copy(wordObjTemp);
            _t.title = va;
            for (var i = 0; i < _self.lang.length; i++) {
                _t.langs[_self.lang[i].title] = angular.copy(wordLandObjTemp);
            }

            _self.word.push(_t);

        }

        console.log(_self.word);

        _self.wordInput = null;

    }

    _self.selectWord = function(obj) {


        for (var key in obj.langs) {

            obj.langs[key].edit_value = obj.langs[key].title;
        }

        _self.selectedWords = obj;




        //  _self.selectedWordTitle = key;
        //console.log(va);
    }

    _self.saveData = function() {

        for (var key in _self.selectedWords.langs) {
            _self.selectedWords.langs[key].title = _self.selectedWords.langs[key].edit_value;
            //_self.selectedWords.langs[key].edit_value = null;
        }

    }


    _self.edit = function(obj) {

        obj.ctrl = !obj.ctrl;

        if (obj.ctrl) {
            obj.edit_value = obj.title;
        } else {
            obj.edit_value = null
        }

        return;
    }

    _self.langSaveEdit = function(obj) {
        var _oldTitle = obj.title;
        obj.ctrl = !obj.ctrl;
        obj.title = obj.edit_value;
        obj.edit_value = null;

        for (var i = 0; i < _self.word.length; i++) {
            var _t = _self.word[i].langs[_oldTitle];
            delete _self.word[i].langs[_oldTitle];
            _self.word[i].langs[obj.title] = _t
        }

        return;
    }

    _self.wordSaveEdit = function(obj) {
        var _oldTitle = obj.title;
        obj.ctrl = !obj.ctrl;
        obj.title = obj.edit_value;
        obj.edit_value = null;
        return;
    }


    _self.langRemove = function(obj) {

        var _index = _self.lang.indexOf(obj);
        var _title = obj.title;

        _self.lang.splice(_index, 1);

        for (var i = 0; i < _self.word.length; i++) {
            delete _self.word[i].langs[_title];
        }
    }

    _self.wordRemove = function(obj) {
        var _index = _self.word.indexOf(obj);
        _self.word.splice(_index, 1);

    }

}]);
