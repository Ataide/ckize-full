module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

    clean:{
      dist: ['./dist']
    },
		watch:{
			options:{livereload:true},
			files:['index.html'],
			tasks:[]
		},
    concat:{
      dist:{
        src: 'scripts/**.js',
        dest: 'dist/scripts-all.js'
      },
      libs:{
        src: [
          'bower_components/angular/angular.min.js',
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/angular-ui-router/release/angular-ui-router.min.js',
          'bower_components/satellizer/satellizer.min.js',

         ],
         dest: '../laravel/public/scripts/libs.min.js'
      },
      css:{
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.min.css',
          'css/pages.min.css',
          'css/mvpready-admin.css',
          'css/custom.css',
         ],
         dest: '../laravel/public/css/style.min.css'

      }
    },
		express:{
			all:{
				options:{
					port:3000,
					hostname:'localhost',
					bases:['../app'],
					livereload:true
				}
			}
		},
    ngAnnotate: {
      options: {
          singleQuotes: true
      },
      app: {
          files: {
              './temp/scripts-temp.js': ['./scripts/**.js']
          }
      }
    },
    uglify: {
      js: { //target
          src: ['./temp/scripts-temp.js'],
          dest: '../laravel/public/scripts/app.min.js'
      }
    },
    copy: {
      main: {
        src: './template/index.php',
        dest: '../laravel/resources/views/index.php',
      },
      img:{
        src: './img/**',
        dest:'../laravel/public/'

      },
      views:{
        src: './views/**',
        dest: '../laravel/public/'
      }
    },
    open:{
      dist:{
        path: 'http://localhost:3000'
      }
    }

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('prod',['ngAnnotate', 'uglify', 'concat:libs','concat:css', 'copy:main', 'copy:img', 'copy:views']);
	grunt.registerTask('server',['express','open:dist','watch']);
	};
