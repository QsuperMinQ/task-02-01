// 实现这个项目的构建任务

const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');

const loadPlugins = require('gulp-load-plugins');
const plugins = loadPlugins();

const browserSync = require('browser-sync');
const browserServe = browserSync.create();

const data = {
  menus: [
    {
      name: 'Home',
      icon: 'aperture',
      link: 'index.html'
    },
    {
      name: 'Features',
      link: 'features.html'
    },
    {
      name: 'About',
      link: 'about.html'
    },
    {
      name: 'Contact',
      link: '#',
      children: [
        {
          name: 'Twitter',
          link: 'https://twitter.com/w_zce'
        },
        {
          name: 'About',
          link: 'https://weibo.com/zceme'
        },
        {
          name: 'divider'
        },
        {
          name: 'About',
          link: 'https://github.com/zce'
        }
      ]
    }
  ],
  pkg: require('./package.json'),
  date: new Date()
}

const style = () => {
  return src('src/assets/styles/*.scss', { base: 'src' }) // base的作用是保证按照原来的目录结构输出
  .pipe(plugins.sass({ outputStyle:'expanded' })) // 输出时{}全部展开
  .pipe(dest('dist'))
}

const script = () => {
  return src('src/assets/scripts/*.js', { base: 'src' })
  .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
  .pipe(dest('dist'))
}

const page = () => {
  return src('src/*.html', { base: 'src' })
  .pipe(plugins.swig({ data, defaults: {cache: false} })) //防止模版热更新无效
  .pipe(dest('dist'))
}

const image = () => {
  return src('src/assets/images/**', { base: 'src' })
  .pipe(plugins.imagemin())
  .pipe(dest('dist'))
}

const font = () => {
  return src('src/assets/fonts/**', { base: 'src' })
  .pipe(plugins.imagemin())
  .pipe(dest('dist'))
}

const extra = () => {
  return src('public/**', { base: 'public' })
  .pipe(dest('dist'))
}

const clean = () => {
  return del(['dist'])
}

const serve = () => {
  // watch接收两个参数，路径&任务，监听文件变化，并执行任务，实现热更新
  watch('src/assets/styles/*.scss', style)
  watch('src/assets/scripts/*.js', script)
  watch('src/*.html', page)

  watch([
    'src/assets/images/**',
    'src/assets/fonts/**',
    'public/**'
  ], browserServe.reload)

  browserServe.init({
    notify: false,  // 消息提示
    // port: 8888,
    // open: false,  // 是否自动打开浏览器
    files: 'dist/**',  // 监听文件的改变,进行热更新
    server: {
      baseDir: ['dist', 'src'], // 一次在这些文件内查找内容
      routes: { // routes里的配置会优先baseDir
        '/node_modules': 'node_modules'
      }
    }
  })
}

const useref = () => {
  return src('dist/*.html', { base: 'dist' })
  .pipe(plugins.useref({ searchPath: ['dist', '.'] }))
  .pipe(dest('dist'))
}
 
// 开发阶段执行的任务
const compile = parallel(style, script, page);

const develop = series(compile, useref, serve);

// 上线之前执行的任务
const build = series(clean, parallel(series(compile, useref), image, font, extra));

module.exports = {
  build,
  develop
}