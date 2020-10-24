const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

export default [
    { 'text': 'npm install -g learnpack', 'cmd': true, delay: 250 },
    {
        'text': 'Successfully installed 😀',
        'cmd': false
    },
    { 'text': 'learn install react.js', 'cmd': true, delay: 250 },
    {
        text: '💻 downloading interactive exercises',
        cmd: false,
        repeat: true,
        repeatCount: 2,
        frames: spinner.map(function (spinner) {
            return {
                text: spinner + ' downloading interactive tutorial',
                delay: 40
            }
        })
    },
    {
        'text': '🎊 Done! Type "learn start" to start learning',
        'cmd': false
    },
    { 'text': 'learn start', 'cmd': true, delay: 250 },
    { 'text': '🔥 Your tutorial is live on http://localhost:8080', 'cmd': false }
]