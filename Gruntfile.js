module.exports = function(grunt){

	//levantar servidor
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	miappConfig = {
		path: 'webapp/',
	    cssDir: 'webapp/static/css',
	    sassDir: 'webapp/static/sass',
	    devUrl: 'miapp.vm',
	    port: 9000
	  };

	grunt.initConfig({
		webapp: miappConfig,

		connect: {
			server: {
				options: {
					port: '<%= webapp.port %>',
					base: '<%= webapp.path %>'
					//keepalive: true //si utilizo livereload no hace falta que esté keepalive
				}
			}
		},

		watch: {   
			options: {
    			livereload: true,
			},
			all: {
				files: '<%= webapp.path %>/index.html'
			},   
      		compass: {
	        	files: ['<%= webapp.sassDir %>/**/*.{scss,sass}'],
	        	tasks: ['compass:server'],
	      	},
	      	css: {
	        	files: ['<%= webapp.sassDir %>/style.css'],
	        	task:[]
	      	}
	    },

		compass: {
			options: {
				require: ['sass-globbing', 'breakpoint'],
				cssDir: '<%= webapp.cssDir %>',
				sassDir: '<%= webapp.sassDir %>',
				relativeAssets: true,
				force: true
			},
			dist: {
				options: {
			  		outputStyle: 'compress',
			  		environment: 'production'
				}
			},
			server: {
				options: {
			  		outputStyle: 'expand',
			  		noLineComments: true,
			  		debugInfo: false
				}
			}
		}


	});

	grunt.task.registerTask('default', ['connect', 'compass:server', 'watch']);
};