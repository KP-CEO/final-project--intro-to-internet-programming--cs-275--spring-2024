const { src, dest, series, watch } = require(`gulp`),
    htmlCompressor = require(`gulp-htmlmin`),
    cssCompressor = require(`gulp-clean-css`),
    babel = require(`gulp-babel`),
    jsCompressor = require(`gulp-uglify`),
    jsValidator = require(`gulp-eslint`),
    htmlValidator = require(`gulp-html`),
    cssValidator = require(`gulp-stylelint`),
    browserSync = require(`browser-sync`),
    reload = browserSync.reload;

let browserChoice = `default`;

async function chrome() {
    browserChoice = `google chrome`;
}


let compressHTML = () => {
    return src([`dev/html/index.html`])
        .pipe(htmlCompressor({ collapseWhitespace: true }))
        .pipe(dest(`prod/html`));
};
exports.compressHTML = compressHTML;

let compressCSS = () => {
    return src([`dev/CSS/style.css`])
        .pipe(cssCompressor({ collapseWhitespace: true }))
        .pipe(dest(`prod/css`));
};

exports.compressCSS = compressCSS;

let validateCSS = () => {
    return src([`dev/CSS/style.css`])
        .pipe(cssValidator({
            failAfterError: false,
            reporters: [
                { formatter: `string`, console: true }
            ]
        }));
};
exports.validateCSS = validateCSS;

let validateHTML = () => {
    return src([`*.html`])
        .pipe(htmlValidator());
};
exports.validateHTML = validateHTML;

let validateJS = () => {
    return src([`dev/js/app.js`, `*.js`])
        .pipe(jsValidator())
        .pipe(jsValidator.formatEach(`compact`));
};
exports.validateJS = validateJS;


let transpileJSForDev = () => {
    return src(`dev/js/app.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};
exports.transpileJSForDev = transpileJSForDev;

let transpileJSForProd = () => {
    return src(`dev/js/app.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};
exports.transpileJSForProd = transpileJSForProd;

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 50,
        browser: browserChoice,
        server: {
            baseDir: [
                `temp`,
                `prod`,
                `.`
            ]
        }
    });

    // eslint-disable-next-line max-len
    watch(`dev/js/app.js`, series(validateJS, transpileJSForDev)).on(`change`, reload);

    watch(`dev/CSS/style.css`, validateCSS).on(`change`, reload);

    watch(`dev/html/index.html`, validateHTML).on(`change`, reload);

};

exports.chrome = series(chrome, serve);

exports.default = serve;

exports.serve = series(
    validateHTML,
    validateJS,
    validateCSS,
    transpileJSForDev,
    serve
);
exports.build = series(
    compressHTML,
    compressCSS,
    transpileJSForProd
);
