(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-login-page></app-login-page>\r\n<app-detail-page></app-detail-page>\r\n<app-product-page></app-product-page>\r\n<app-button-to-top></app-button-to-top>\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'Sell It';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _detailPage_detailPage_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./detailPage/detailPage.module */ "./src/app/detailPage/detailPage.module.ts");
/* harmony import */ var _loginPage_loginPage_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./loginPage/loginPage.module */ "./src/app/loginPage/loginPage.module.ts");
/* harmony import */ var _productPage_productPage_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./productPage/productPage.module */ "./src/app/productPage/productPage.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _detailPage_detailPage_module__WEBPACK_IMPORTED_MODULE_3__["DetailPageModule"],
                _loginPage_loginPage_module__WEBPACK_IMPORTED_MODULE_4__["LoginPageModule"],
                _productPage_productPage_module__WEBPACK_IMPORTED_MODULE_5__["ProductPageModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/detailPage/detailPage.component.html":
/*!******************************************************!*\
  !*** ./src/app/detailPage/detailPage.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\r\n<main class=\"main-content\">\r\n  <!--<section class=\"detail-page\">-->\r\n  <div class=\"slider\">\r\n    <img src=\"../../assets/img/product_sliced.jpg\" alt=\"The greatest product ever!\" class=\"slider__img\">\r\n  </div>\r\n  <div class=\"about\">\r\n    <h1 class=\"about__title\">Some title text must be here <br> maybe second line</h1>\r\n    <div class=\"about__vendor\">from <a href=\"#0\" class=\"vendor\">Alis Kim</a></div>\r\n    <div class=\"about__price\">18000 $</div>\r\n    <div class=\"about__description\">\r\n      <p>Some description text from WYSIWYG editor</p>\r\n      <p>Can be <span class=\"about__bold\">BOLD</span> <span class=\"about__italic\">Italic</span></p>\r\n      <div class=\"about__list about__bold\">Can have  list:\r\n        <ul class=\"about__ul\">\r\n          <li>first</li>\r\n          <li>second</li>\r\n        </ul>\r\n      </div>\r\n      <p><span class=\"about__bold\">And anything from WYSIWYG editor</span></p>\r\n      <p><span class=\"about__bold\">Some line</span><br>\r\n        Some line<br>\r\n        <span class=\"about__italic\">Some  line</span></p>\r\n      <p><span class=\"about__bold\">Finished on this line.</span></p>\r\n    </div>\r\n  </div>\r\n  <section class=\"chat\">\r\n    <h2 class=\"chat__title\">Chat\r\n      <span class=\"chat__subtitle\">with\r\n                    <a href=\"#0\" class=\"chat__vendor chat__vendor--online\">Alis Kim</a>\r\n                </span>\r\n    </h2>\r\n    <div class=\"chat__area\">\r\n      <form class=\"chat__messages\" method=\"post\" >\r\n        <div class=\"chat__message chat__message--single-line chat__message--vendor\">\r\n          <img src=\"../../assets/img/vendor.jpg\" alt=\"vendor\" class=\"chat__icon\">\r\n          <div class=\"chat__text\">One line chat message</div>\r\n        </div>\r\n        <div class=\"chat__message chat__message--multi-line chat__message--user\">\r\n          <img src=\"../../assets/img/user.jpg\" alt=\"user\" class=\"chat__icon\">\r\n          <div class=\"chat__text\">Multi line chat message. Some  text for multi line message.\r\n            What is your name. Oh sorry. My bad, your name I think  Alis. Right? Please send me your\r\n            contacts. May be your facebook page or some think alse. How much cost this t shirt?</div>\r\n        </div>\r\n        <div class=\"chat__send\">\r\n          <input type=\"text\" class=\"chat__input\" placeholder=\"Type some text here\">\r\n          <button class=\"chat__submit\" type=\"submit\">\r\n            <img src=\"../../assets/img/fa-send.svg\" alt=\"Send\" class=\"chat__submit-icon\">\r\n          </button>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </section>\r\n  <div class=\"chat__connected\">\r\n    <h3 class=\"chat__title--connected\">Connected</h3>\r\n    <div class=\"user\">\r\n      <img src=\"../../assets/img/vendor.jpg\" alt=\"vendor\" class=\"user__img\">\r\n      <span class=\"user__name\">Alis Kim</span>\r\n    </div>\r\n    <div class=\"user\">\r\n      <img src=\"../../assets/img/user.jpg\" alt=\"user\" class=\"user__img\">\r\n      <span class=\"user__name\">Kim Evans</span>\r\n    </div>\r\n  </div>\r\n</main>\r\n<app-footer></app-footer>\r\n"

/***/ }),

/***/ "./src/app/detailPage/detailPage.component.scss":
/*!******************************************************!*\
  !*** ./src/app/detailPage/detailPage.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n.main-content {\n  max-width: 950px;\n  margin: 91px auto 0;\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: 1fr 1fr;\n      grid-template-columns: 1fr 1fr;\n  -ms-grid-rows: 1fr auto;\n      grid-template-rows: 1fr auto;\n  grid-gap: 15px; }\n.about__title {\n  margin: 0 0 15px;\n  font: 32px/1.2 MyriadProRegular, sans-serif;\n  color: #000000; }\n.about__vendor {\n  display: inline-block;\n  font-weight: 700; }\n.about__price {\n  display: inline-block;\n  font-weight: 700;\n  font-size: 32px;\n  color: var(--color_accent);\n  margin-left: 23px; }\n.about__description {\n  margin-top: 40px; }\n.about__ul {\n  margin-top: 0;\n  list-style: none; }\n.about__ul > li:before {\n    content: \"-\";\n    padding-right: 5px; }\n.about__bold {\n  font-weight: 700; }\n.about__italic {\n  font-style: italic; }\n.vendor {\n  color: var(--color_theme); }\n.slider__img {\n  width: 100%; }\n.chat__title {\n  font-size: 30px;\n  font-weight: 700; }\n.chat__title--connected {\n    font-size: 18px; }\n.chat__subtitle {\n  font-size: 14px; }\n.chat__vendor {\n  color: var(--color_theme); }\n.chat__vendor--online:after {\n    content: \"·\";\n    font-size: 56px;\n    line-height: 12px;\n    vertical-align: middle;\n    color: var(--color_accent); }\n.chat__area {\n  margin-bottom: 17px; }\n.chat__messages {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  height: 220px;\n  font-size: 14px; }\n.chat__message {\n  display: flex;\n  align-items: center;\n  align-content: flex-end;\n  margin: 15px 0; }\n.chat__message--vendor {\n    margin-right: 56px; }\n.chat__message--vendor > .chat__text {\n    padding: 0 6px 0 0;\n    border-right: 5px solid var(--color_theme); }\n.chat__message--user {\n    flex-direction: row-reverse;\n    align-items: normal;\n    margin-left: 56px; }\n.chat__message--user > .chat__text {\n    padding: 0 0 0 6px;\n    border-left: 5px solid var(--color_theme); }\n.chat__icon {\n  border-radius: 50%;\n  width: 25px;\n  height: 25px;\n  padding: 6px; }\n.chat__text {\n  display: inline-block;\n  vertical-align: top;\n  max-width: 400px; }\n.chat__send {\n  width: 100%;\n  border-bottom: 1px solid var(--color_theme);\n  display: flex; }\n.chat__submit {\n  background: none;\n  border: none; }\n.chat__input {\n  border: none;\n  background: none;\n  width: 100%;\n  flex-grow: 1; }\n:host {\n  display: block;\n  position: relative; }\n"

/***/ }),

/***/ "./src/app/detailPage/detailPage.component.ts":
/*!****************************************************!*\
  !*** ./src/app/detailPage/detailPage.component.ts ***!
  \****************************************************/
/*! exports provided: DetailPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailPageComponent", function() { return DetailPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DetailPageComponent = /** @class */ (function () {
    function DetailPageComponent() {
    }
    DetailPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-detail-page',
            template: __webpack_require__(/*! ./detailPage.component.html */ "./src/app/detailPage/detailPage.component.html"),
            styles: [__webpack_require__(/*! ./detailPage.component.scss */ "./src/app/detailPage/detailPage.component.scss")]
        })
    ], DetailPageComponent);
    return DetailPageComponent;
}());



/***/ }),

/***/ "./src/app/detailPage/detailPage.module.ts":
/*!*************************************************!*\
  !*** ./src/app/detailPage/detailPage.module.ts ***!
  \*************************************************/
/*! exports provided: DetailPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailPageModule", function() { return DetailPageModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _detailPage_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detailPage.component */ "./src/app/detailPage/detailPage.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DetailPageModule = /** @class */ (function () {
    function DetailPageModule() {
    }
    DetailPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _detailPage_component__WEBPACK_IMPORTED_MODULE_2__["DetailPageComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
            ],
            exports: [
                _detailPage_component__WEBPACK_IMPORTED_MODULE_2__["DetailPageComponent"]
            ],
            providers: [],
        })
    ], DetailPageModule);
    return DetailPageModule;
}());



/***/ }),

/***/ "./src/app/loginPage/loginPage.component.html":
/*!****************************************************!*\
  !*** ./src/app/loginPage/loginPage.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-page__wrapper\">\r\n  <main class=\"login-page\">\r\n    <header class=\"login-page__logo\">\r\n      <img src=\"../../assets/img/sell-it--white.png\" alt=\"Sell It\" class=\"login-page__img\">\r\n    </header>\r\n    <form class=\"login-page__content\">\r\n      <div class=\"tabs\">\r\n        <button type=\"button\" class=\"tabs__tab login-page__button\" data-fieldset=\"sign-in\">Sign in</button>\r\n        <button type=\"button\" class=\"tabs__tab login-page__button\" data-fieldset=\"sign-up\">Sign up</button>\r\n      </div>\r\n      <fieldset id=\"sign-in\" class=\"login-page__field _active\">\r\n        <input type=\"email\" class=\"login__input\" placeholder=\"Email\">\r\n        <input type=\"password\" class=\"login__input\" placeholder=\"Password\">\r\n        <button type=\"submit\" class=\"login__submit login-page__button\">Login</button>\r\n      </fieldset>\r\n      <fieldset id=\"sign-up\" class=\"login-page__field\">\r\n        <input type=\"email\" class=\"login__input\" placeholder=\"Email\">\r\n        <input type=\"password\" class=\"login__input\" placeholder=\"Password\">\r\n        <button type=\"submit\" class=\"login__submit login-page__button\">Sign up</button>\r\n      </fieldset>\r\n    </form>\r\n    <!--TODO: add to FooterComponent possibility to change innerHTML-->\r\n    <app-footer>Frontend labs 2017</app-footer>\r\n  </main>\r\n</div>\r\n<script>\r\n  const tabs = document.querySelector(\".tabs\");\r\n\r\n  const tabsHandler = (e) => {\r\n    const target = e.target;\r\n    if (e.target.nodeName !== \"BUTTON\") return;\r\n    const field = document.querySelector(\"#\" + target.dataset.fieldset);\r\n    let currentActive = document.querySelector(\"._active\");\r\n    currentActive.classList.remove(\"_active\");\r\n    field.classList.add(\"_active\")\r\n  };\r\n\r\n  tabs.addEventListener( \"click\", tabsHandler );\r\n</script>\r\n"

/***/ }),

/***/ "./src/app/loginPage/loginPage.component.scss":
/*!****************************************************!*\
  !*** ./src/app/loginPage/loginPage.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login-page {\n  background-color: var(--color_theme);\n  width: var(--width-aside-right);\n  margin-left: auto;\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh; }\n  .login-page__wrapper {\n    position: relative;\n    background: right 375px top no-repeat url('login-bg.jpg'), #eee6e3;\n    min-height: 100vh; }\n  .login-page__logo {\n    margin: 74px auto 106px;\n    text-align: center; }\n  .login-page__content {\n    flex-grow: 1;\n    margin: 24px; }\n  .login-page__field {\n    display: none;\n    border: none;\n    margin: 54px 0;\n    padding: 0; }\n  .login-page .login__input {\n    box-sizing: border-box;\n    color: var(--color_background);\n    font-size: 14px;\n    margin: 15px 0;\n    width: 100%;\n    padding: 4px 16px;\n    background: none;\n    border: none;\n    border-bottom: 5px solid white; }\n  .login-page .login__input:-ms-input-placeholder {\n      color: var(--color_background); }\n  .login-page .login__input::-webkit-input-placeholder {\n      color: var(--color_background); }\n  .login-page .login__input::-ms-input-placeholder {\n      color: var(--color_background); }\n  .login-page .login__input::placeholder {\n      color: var(--color_background); }\n  .login-page .login__submit {\n    margin: 20px 0; }\n  .login-page__button {\n    height: 37px;\n    width: 100%;\n    background-color: var(--color_button-bg);\n    border: none;\n    font-size: 14px; }\n  .login-page__button:hover {\n      box-shadow: inset 0 -5px 0 var(--color_accent); }\n  ._active {\n  display: block; }\n  .tabs {\n  display: flex;\n  margin: -15px; }\n  .tabs__tab {\n    margin: 15px; }\n"

/***/ }),

/***/ "./src/app/loginPage/loginPage.component.ts":
/*!**************************************************!*\
  !*** ./src/app/loginPage/loginPage.component.ts ***!
  \**************************************************/
/*! exports provided: LoginPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageComponent", function() { return LoginPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LoginPageComponent = /** @class */ (function () {
    function LoginPageComponent() {
    }
    LoginPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login-page',
            template: __webpack_require__(/*! ./loginPage.component.html */ "./src/app/loginPage/loginPage.component.html"),
            styles: [__webpack_require__(/*! ./loginPage.component.scss */ "./src/app/loginPage/loginPage.component.scss")]
        })
    ], LoginPageComponent);
    return LoginPageComponent;
}());



/***/ }),

/***/ "./src/app/loginPage/loginPage.module.ts":
/*!***********************************************!*\
  !*** ./src/app/loginPage/loginPage.module.ts ***!
  \***********************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _loginPage_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loginPage.component */ "./src/app/loginPage/loginPage.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _loginPage_component__WEBPACK_IMPORTED_MODULE_2__["LoginPageComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"]
            ],
            exports: [
                _loginPage_component__WEBPACK_IMPORTED_MODULE_2__["LoginPageComponent"]
            ],
            providers: []
        })
    ], LoginPageModule);
    return LoginPageModule;
}());



/***/ }),

/***/ "./src/app/productPage/product.service.ts":
/*!************************************************!*\
  !*** ./src/app/productPage/product.service.ts ***!
  \************************************************/
/*! exports provided: ProductService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductService", function() { return ProductService; });
var ProductService = /** @class */ (function () {
    function ProductService() {
        this.products = [
            {
                id: 0,
                name: 'Stuff',
                image: 'assets/img/prod-item_1.jpg'
            },
            {
                id: 1,
                name: 'Closes',
                image: 'assets/img/prod-item_2.jpg'
            },
            {
                id: 2,
                name: 'Laptop',
                image: 'assets/img/prod-item_3.jpg'
            },
            {
                id: 3,
                name: 'Notebook',
                image: 'assets/img/prod-item_4.jpg'
            }, {
                id: 4,
                name: 'Stuff',
                image: 'assets/img/prod-item_1.jpg'
            },
            {
                id: 5,
                name: 'Closes',
                image: 'assets/img/prod-item_2.jpg'
            },
            {
                id: 6,
                name: 'Laptop',
                image: 'assets/img/prod-item_3.jpg'
            },
            {
                id: 7,
                name: 'Notebook',
                image: 'assets/img/prod-item_4.jpg'
            },
        ];
    }
    ProductService.prototype.getList = function () {
        return this.products;
    };
    ProductService.prototype.getMore10 = function () {
        (_a = this.products).push.apply(_a, this.products.slice(0, 10));
        return this.products;
        var _a;
    };
    return ProductService;
}());



/***/ }),

/***/ "./src/app/productPage/productItem/productItem.component.html":
/*!********************************************************************!*\
  !*** ./src/app/productPage/productItem/productItem.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"product-item\">\r\n  <div class=\"product-item__desc\">\r\n    <h3 class=\"product-item__title\">{{name}} - {{id + 1}}</h3>\r\n    <img src=\"assets/img/fa-eye.svg\" alt=\"\" class=\"product-item__view\">\r\n  </div>\r\n  <div class=\"product-item__gallery\">\r\n    <img src=\"{{image}}\" alt=\"Product Img\" class=\"product-item__img\">\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/productPage/productItem/productItem.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/productPage/productItem/productItem.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  position: relative; }\n\n.product-item {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%; }\n\n.product-item__desc {\n    display: flex;\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n    background-color: var(--color_theme);\n    color: var(--color_background);\n    order: 1;\n    padding: 15px;\n    flex: 0 0 auto; }\n\n.product-item__title {\n    font: normal 400 18px Arial;\n    margin: 0; }\n\n.product-item__view {\n    height: 18px;\n    width: auto; }\n\n.product-item__gallery {\n    order: 0;\n    flex: 1 1 auto;\n    width: 100%;\n    height: 100%;\n    overflow: hidden; }\n\n.product-item__img {\n    width: 100%;\n    height: 100%;\n    -o-object-fit: cover;\n       object-fit: cover; }\n"

/***/ }),

/***/ "./src/app/productPage/productItem/productItem.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/productPage/productItem/productItem.component.ts ***!
  \******************************************************************/
/*! exports provided: ProductItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductItemComponent", function() { return ProductItemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProductItemComponent = /** @class */ (function () {
    function ProductItemComponent() {
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], ProductItemComponent.prototype, "id", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ProductItemComponent.prototype, "name", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], ProductItemComponent.prototype, "image", void 0);
    ProductItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-item',
            template: __webpack_require__(/*! ./productItem.component.html */ "./src/app/productPage/productItem/productItem.component.html"),
            styles: [__webpack_require__(/*! ./productItem.component.scss */ "./src/app/productPage/productItem/productItem.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ProductItemComponent);
    return ProductItemComponent;
}());



/***/ }),

/***/ "./src/app/productPage/productPage.component.html":
/*!********************************************************!*\
  !*** ./src/app/productPage/productPage.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\r\n<main>\r\n    <app-product-item *ngFor=\"let i of products\"\r\n                      [id]=\"i.id\"\r\n                      [name]=\"i.name\"\r\n                      [image]=\"i.image\"\r\n    ></app-product-item>\r\n</main>\r\n<app-footer></app-footer>\r\n"

/***/ }),

/***/ "./src/app/productPage/productPage.component.scss":
/*!********************************************************!*\
  !*** ./src/app/productPage/productPage.component.scss ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  position: relative; }\n\nmain {\n  display: -ms-grid;\n  display: grid;\n  -ms-grid-columns: (minmax(265px, 1fr))[auto-fit];\n      grid-template-columns: repeat(auto-fit, minmax(265px, 1fr));\n  grid-auto-rows: 252px;\n  grid-column-gap: 17px;\n  grid-row-gap: 21px;\n  margin: 48px; }\n\n@media screen and (max-width: 800px) {\n    main {\n      margin: 10px; } }\n"

/***/ }),

/***/ "./src/app/productPage/productPage.component.ts":
/*!******************************************************!*\
  !*** ./src/app/productPage/productPage.component.ts ***!
  \******************************************************/
/*! exports provided: ProductPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPageComponent", function() { return ProductPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _product_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product.service */ "./src/app/productPage/product.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProductPageComponent = /** @class */ (function () {
    function ProductPageComponent(productService) {
        this.productService = productService;
    }
    ProductPageComponent.prototype.ngOnInit = function () {
        this.getProductList(this.productService.getList());
    };
    ProductPageComponent.prototype.getProductList = function (productList) {
        this.products = productList;
    };
    ProductPageComponent.prototype.getMoreItems = function () {
        this.productService.getMore10();
    };
    ProductPageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-product-page',
            template: __webpack_require__(/*! ./productPage.component.html */ "./src/app/productPage/productPage.component.html"),
            styles: [__webpack_require__(/*! ./productPage.component.scss */ "./src/app/productPage/productPage.component.scss")],
            providers: [_product_service__WEBPACK_IMPORTED_MODULE_1__["ProductService"]]
        }),
        __metadata("design:paramtypes", [_product_service__WEBPACK_IMPORTED_MODULE_1__["ProductService"]])
    ], ProductPageComponent);
    return ProductPageComponent;
}());



/***/ }),

/***/ "./src/app/productPage/productPage.module.ts":
/*!***************************************************!*\
  !*** ./src/app/productPage/productPage.module.ts ***!
  \***************************************************/
/*! exports provided: ProductPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductPageModule", function() { return ProductPageModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _productPage_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./productPage.component */ "./src/app/productPage/productPage.component.ts");
/* harmony import */ var _productItem_productItem_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./productItem/productItem.component */ "./src/app/productPage/productItem/productItem.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ProductPageModule = /** @class */ (function () {
    function ProductPageModule() {
    }
    ProductPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _productPage_component__WEBPACK_IMPORTED_MODULE_2__["ProductPageComponent"],
                _productItem_productItem_component__WEBPACK_IMPORTED_MODULE_3__["ProductItemComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]
            ],
            exports: [
                _productPage_component__WEBPACK_IMPORTED_MODULE_2__["ProductPageComponent"]
            ],
            providers: []
        })
    ], ProductPageModule);
    return ProductPageModule;
}());



/***/ }),

/***/ "./src/app/shared/components/buttonToTop/buttonToTop.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/buttonToTop/buttonToTop.component.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button {\n  position: fixed;\n  bottom: 1rem;\n  right: 1rem;\n  border: thin solid red;\n  border-radius: 50%;\n  width: 2rem;\n  height: 2rem;\n  background-color: coral;\n  color: #eee6e3;\n  font: normal 700 1rem/1 Arial, sans-serif;\n  transition: background-color 400ms ease; }\n  button:focus {\n    outline: none; }\n  button:hover {\n    background-color: red; }\n"

/***/ }),

/***/ "./src/app/shared/components/buttonToTop/buttonToTop.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/shared/components/buttonToTop/buttonToTop.component.ts ***!
  \************************************************************************/
/*! exports provided: ButtonToTopComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ButtonToTopComponent", function() { return ButtonToTopComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ButtonToTopComponent = /** @class */ (function () {
    function ButtonToTopComponent() {
    }
    ButtonToTopComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-button-to-top',
            template: "<button type=\"button\" appScrollToTop >&uarr;</button>",
            styles: [__webpack_require__(/*! ./buttonToTop.component.scss */ "./src/app/shared/components/buttonToTop/buttonToTop.component.scss")]
        })
    ], ButtonToTopComponent);
    return ButtonToTopComponent;
}());



/***/ }),

/***/ "./src/app/shared/components/footer/footer.component.html":
/*!****************************************************************!*\
  !*** ./src/app/shared/components/footer/footer.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer>2017 - front-end labs Light IT</footer>\r\n"

/***/ }),

/***/ "./src/app/shared/components/footer/footer.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/shared/components/footer/footer.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  width: 100%;\n  height: 100%; }\n\nfooter {\n  background-color: var(--color_theme);\n  color: var(--color_background);\n  padding: 16px 0 15px;\n  text-align: center;\n  width: 100%; }\n"

/***/ }),

/***/ "./src/app/shared/components/footer/footer.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/components/footer/footer.component.ts ***!
  \**************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/shared/components/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.scss */ "./src/app/shared/components/footer/footer.component.scss")]
        })
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/shared/components/header/header.component.html":
/*!****************************************************************!*\
  !*** ./src/app/shared/components/header/header.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header>\r\n  <a href=\"#\" class=\"logo\">\r\n    <img src=\"assets/img/sell-it.png\" alt=\"Logo: Buy it!\" class=\"logo__img\">\r\n  </a>\r\n  <div class=\"search\">\r\n    <form class=\"search__form\" method=\"get\" id=\"search\">\r\n      <label for=\"search__input\" class=\"search__label\">\r\n        <img src=\"assets/img/fa-search.svg\" alt=\"Search:\">\r\n        <input id=\"search__input\" type=\"search\" class=\"search__input\" placeholder=\"Try find something\">\r\n      </label>\r\n    </form>\r\n  </div>\r\n  <div class=\"user-block\">\r\n    <div class=\"user\">\r\n      <img src=\"assets/img/user.jpg\" alt=\"usr_img\" class=\"user__img\">\r\n      <span class=\"user__name\">Kim Evans</span>\r\n    </div>\r\n    <a href=\"#0\" class=\"logout\">\r\n      <img src=\"assets/img/fa-sign-out.svg\" alt=\"Logout\" class=\"logout__img\">\r\n    </a>\r\n  </div>\r\n</header>\r\n"

/***/ }),

/***/ "./src/app/shared/components/header/header.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/shared/components/header/header.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  height: 59px;\n  width: 100%;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 1; }\n\nheader {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background-color: var(--color_background); }\n\n.logo {\n  flex: 0 0 auto;\n  display: block;\n  margin: 9px 0 9px 50px; }\n\n.search {\n  flex: 1 1 auto;\n  margin: 0 15px;\n  font-size: 14px;\n  max-width: 450px; }\n\n.search__form {\n    max-width: 450px;\n    border-bottom: 1px solid;\n    border-color: var(--color_theme); }\n\n.search__label {\n    width: 100%; }\n\n.search__input {\n    border: 0;\n    background: var(--color_background);\n    width: calc(100% - 20px); }\n\n.user-block {\n  color: var(--color_background);\n  font-size: 16px;\n  flex: 0 0 auto;\n  width: var(--width-aside-right);\n  background: var(--color_theme);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 9px 25px 10px; }\n"

/***/ }),

/***/ "./src/app/shared/components/header/header.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/shared/components/header/header.component.ts ***!
  \**************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/shared/components/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.scss */ "./src/app/shared/components/header/header.component.scss")]
        })
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/shared/directives/scrollToTop/scrollToTop.directive.ts":
/*!************************************************************************!*\
  !*** ./src/app/shared/directives/scrollToTop/scrollToTop.directive.ts ***!
  \************************************************************************/
/*! exports provided: ScrollToTopDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollToTopDirective", function() { return ScrollToTopDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ScrollToTopDirective = /** @class */ (function () {
    function ScrollToTopDirective() {
    }
    ScrollToTopDirective.prototype.onClick = function () {
        window.scroll({ top: 0, behavior: 'smooth' });
    };
    ScrollToTopDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appScrollToTop]',
            host: {
                '(click)': 'onClick()'
            }
        })
    ], ScrollToTopDirective);
    return ScrollToTopDirective;
}());



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/header/header.component */ "./src/app/shared/components/header/header.component.ts");
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/footer/footer.component */ "./src/app/shared/components/footer/footer.component.ts");
/* harmony import */ var _directives_scrollToTop_scrollToTop_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/scrollToTop/scrollToTop.directive */ "./src/app/shared/directives/scrollToTop/scrollToTop.directive.ts");
/* harmony import */ var _components_buttonToTop_buttonToTop_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/buttonToTop/buttonToTop.component */ "./src/app/shared/components/buttonToTop/buttonToTop.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _components_header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"],
                _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"],
                _components_buttonToTop_buttonToTop_component__WEBPACK_IMPORTED_MODULE_5__["ButtonToTopComponent"],
                _directives_scrollToTop_scrollToTop_directive__WEBPACK_IMPORTED_MODULE_4__["ScrollToTopDirective"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"]
            ],
            exports: [
                _components_header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"],
                _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"],
                _components_buttonToTop_buttonToTop_component__WEBPACK_IMPORTED_MODULE_5__["ButtonToTopComponent"],
                _directives_scrollToTop_scrollToTop_directive__WEBPACK_IMPORTED_MODULE_4__["ScrollToTopDirective"]
            ],
            providers: []
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Desta\Documents\LIT\Projects\sell-it\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map