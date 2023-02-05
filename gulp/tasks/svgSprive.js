import svgSprite from "gulp-svg-sprite";
import cheerio from "gulp-cheerio";

export const svgSprive = () => {
  return app.gulp.src(`${app.path.src.svgicons}`, {})
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        },
      })
    )
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: `../svg/icons.svg`,
          example: false,
        }
      },
    }))
    .pipe(app.gulp.dest(`${app.path.build.images}`));
};