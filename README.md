This is a package that adds a bin that you can invoke to track all
node processes that get run.

Do `spawn-log node my-program.js` and it'll output some log files in a
folder named "node-process-log" in the current working directory.

The log files are named for the process id of the process, and contain
the argv and cwd of the process.

For example, after running `npm test` in this project, it shows:

```
$ for i in node-process-log/*; do echo $i; cat $i | json; done
node-process-log/5178.json
{
  "argv": [
    "/usr/local/bin/node",
    "/Users/isaacs/dev/js/spawn-log/log-node-processes.js",
    "/usr/local/bin/npm",
    "run",
    "blerg"
  ],
  "cwd": "/Users/isaacs/dev/js/spawn-log"
}
node-process-log/5179.json
{
  "argv": [
    "/usr/local/bin/node",
    "/Users/isaacs/dev/js/spawn-log/log-node-processes.js",
    "blerg.js"
  ],
  "cwd": "/Users/isaacs/dev/js/spawn-log"
}
node-process-log/5180.json
{
  "argv": [
    "/usr/local/bin/node",
    "/Users/isaacs/dev/js/spawn-log/log-node-processes.js",
    "/Users/isaacs/dev/js/spawn-log/blerg.js",
    "child"
  ],
  "cwd": "/Users/isaacs/dev/js/spawn-log"
}
```
