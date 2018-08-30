"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CommonDocAlbumService = /** @class */ (function () {
    function CommonDocAlbumService() {
        this.CACHE_KEY = 'albumCache';
        this.albumCache = {};
        this.idCache = {};
        this.initStorage();
        this.initCache();
    }
    CommonDocAlbumService.prototype.getDocIds = function (albumKey) {
        var album = this.albumCache[albumKey];
        if (album !== undefined) {
            return album;
        }
        return [];
    };
    CommonDocAlbumService.prototype.removeDocIds = function (albumKey) {
        var ids = [].concat(this.getDocIds(albumKey));
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            this.removeIdFromAlbum(albumKey, id);
        }
        this.albumCache[albumKey] = [];
    };
    CommonDocAlbumService.prototype.getAlbenByDocIds = function (cdocId) {
        return this.idCache[cdocId];
    };
    CommonDocAlbumService.prototype.initAlbenForDocId = function (doc) {
        doc['localalbum'] = this.getAlbenByDocIds(doc.id);
    };
    CommonDocAlbumService.prototype.addIdToAlbum = function (albumKey, docId) {
        var album = this.albumCache[albumKey];
        if (album === undefined) {
            album = [];
        }
        var index = album.indexOf(docId);
        if (index >= 0) {
            return;
        }
        album.push(docId);
        this.albumCache[albumKey] = album;
        this.saveCache();
        var keys = this.idCache[docId];
        if (keys === undefined) {
            keys = [];
        }
        keys.push(albumKey);
        this.idCache[docId] = keys;
    };
    CommonDocAlbumService.prototype.removeIdFromAlbum = function (albumKey, docId) {
        var album = this.albumCache[albumKey];
        if (album !== undefined) {
            var index = album.indexOf(docId);
            while (index >= 0) {
                album.splice(index, 1);
                index = album.indexOf(docId);
                var docAlben = this.idCache[docId];
                var index2 = docAlben.indexOf(albumKey);
                while (index2 >= 0) {
                    docAlben.splice(index2, 1);
                    index2 = docAlben.indexOf(albumKey);
                }
            }
            this.saveCache();
        }
    };
    CommonDocAlbumService.prototype.removeFromAlbum = function (albumKey, doc) {
        this.removeIdFromAlbum(albumKey, doc.id);
        this.initAlbenForDocId(doc);
    };
    CommonDocAlbumService.prototype.addToAlbum = function (albumKey, doc) {
        this.addIdToAlbum(albumKey, doc.id);
        this.initAlbenForDocId(doc);
    };
    CommonDocAlbumService.prototype.initStorage = function () {
        try {
            if (typeof window === 'undefined') {
                return;
            }
            if (typeof window.localStorage === 'undefined') {
                return;
            }
            if (typeof localStorage === 'undefined') {
                return;
            }
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            this.store = localStorage;
        }
        catch (e) {
            return;
        }
    };
    CommonDocAlbumService.prototype.initCache = function () {
        var item = this.store ? this.store.getItem(this.CACHE_KEY) : undefined;
        if (item !== undefined && item !== null && item !== '') {
            this.albumCache = JSON.parse(item);
            for (var albumKey in this.albumCache) {
                for (var _i = 0, _a = this.albumCache[albumKey]; _i < _a.length; _i++) {
                    var docId = _a[_i];
                    var keys = this.idCache[docId];
                    if (keys === undefined) {
                        keys = [];
                    }
                    keys.push(albumKey);
                    this.idCache[docId] = keys;
                }
            }
        }
    };
    CommonDocAlbumService.prototype.saveCache = function () {
        if (!this.store) {
            return;
        }
        this.store.setItem(this.CACHE_KEY, JSON.stringify(this.albumCache));
    };
    CommonDocAlbumService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], CommonDocAlbumService);
    return CommonDocAlbumService;
}());
exports.CommonDocAlbumService = CommonDocAlbumService;
//# sourceMappingURL=cdoc-album.service.js.map