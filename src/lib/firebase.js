"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.app = void 0;
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyCt0i4YfmNf0bSJBYLCvKZcuejrST5fXk8",
    authDomain: "modular-os.firebaseapp.com",
    projectId: "modular-os",
    storageBucket: "modular-os.firebasestorage.app",
    messagingSenderId: "995088201685",
    appId: "1:995088201685:web:3e1808b0c160d144156f5c"
};
// Initialize Firebase
var app = !(0, app_1.getApps)().length ? (0, app_1.initializeApp)(firebaseConfig) : (0, app_1.getApp)();
exports.app = app;
var db = (0, firestore_1.getFirestore)(app);
exports.db = db;
