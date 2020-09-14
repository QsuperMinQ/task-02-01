// 实现这个项目的构建任务

const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks')
const mozjpeg = require('imagemin-mozjpeg');

module.exports = grunt => {
  grunt.initConfig({
    // 模板
    swig: {
      development: {
        dest: "dist",
        src: ['src/about.*','src/index.*'],
        generateSitemap: false,
        generateRobotstxt: false,
      }
    },

    // 样式
    sass: {
      options: {
        implementation: sass
      },
      main: {
        files: {
          'dist/assets/styles/main.css': 'src/assets/styles/main.scss',
        }
      }
    },

    // js
    babel: {
      options: {
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
        }
      }
    },

    // 图片
    imagemin: {
      static: {
          options: {
            optimizationLevel: 3,
            svgoPlugins: [{removeViewBox: false}],
            use: [mozjpeg()] // Example plugin usage
          },
          files: {
            'dist/assets/images/logo.png': 'src/assets/images/logo.png',
            'dist/assets/images/brands.svg': 'src/assets/images/brands.svg',
          }
      },
      dynamic: {
          files: [{
            expand: true,
            cwd: 'src/',
            src: ['assets/**/*.{png,jpg,gif,svg,eot,ttf,woff}'],
            dest: 'dist/'
          }]
      }
    },

    // useref
    useref: {
      // specify which files contain the build blocks
      html: 'dist/*.html',
      // explicitly specify the temp directory you are working in
      // this is the the base of your links ( "/" )
      temp: 'dist'
    },

    // 清除编译文件
    clean: {
      tmp: 'dist/**'
    },

    // 开发服务
    connect: {
      server: {
        options: {
          port: 3000,
          keepalive: true,
          base: {
            path: 'dist',
            options: {
              index: 'index.html',
              maxAge: 300000
            }
          }
        }

      }
    }
  })

  loadGruntTasks(grunt); // 自动加载所有任务
  // grunt.loadNpmTasks('grunt-sass')
  
}