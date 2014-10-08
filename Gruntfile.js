module.exports = function (grunt) {
    grunt.initConfig({
            uglify: {
                js: {
                    files: {
                        'build/angular-previewImg.min.js': [
                            'angular-previewImg.js'
                        ]
                    }
                }
            },
            cssmin: {
                combine: {
                    files: {
                        'build/angular-previewImg.min.css': [
                            'angular-previewImg.css'
                        ]
                    }
                }
            },
            copy: {
                main: {
                    files: [
                        {expand: true, src: ['angular-previewImg.js'], dest: 'src/', filter: 'isFile'},
                        {expand: true, src: ['angular-previewImg.css'], dest: 'src/'},
                        {expand: true, src: ['angular-previewImg.js'], dest: 'demo/previewImg/', filter: 'isFile'},
                        {expand: true, src: ['angular-previewImg.css'], dest: 'demo/previewImg/'}
                    ]
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', [ 'uglify', 'cssmin','copy']);

};