module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.initConfig({
        exec: {
            build_api: 'tsc',
            build_admin: 'cd admin && yarn install && npm run build'
        },
        clean: {
            build: ['dist', 'admin/build'],
        },
        copy: {
            admin: {
                cwd: 'admin/build',
                src: ['**'],
                dest: 'dist/admin/build',
                expand: true
            }
        },
        concurrent: {
            build: {
                tasks: ['exec:build_api', 'exec:build_admin'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }
    });

    grunt.registerTask('dev', ['concurrent:dev']);
    
    grunt.registerTask('build:api', ['clean:build', 'exec:build_api']);
    
    grunt.registerTask('build', ['clean:build', 'concurrent:build', 'copy:admin']);

};