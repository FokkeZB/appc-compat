# Appcelerator CLI Compatibility

Since 4.0, the Appcelerator Platform has a single [`appc`](http://docs.appcelerator.com/platform/latest/#!/guide/Appcelerator_Command-Line_Interface_Reference) CLI that bundles local versions of the former [`ti`](https://npmjs.com/titanium), [`alloy`](https://npmjs.com/alloy) and [`acs`](https://npmjs.com/acs) CLI. You can still use the embedded CLIs by calling `appc ti` instead of `ti`. You can also still install the other three CLIs directly from NPM, in particular to work on projects that you have not (yet) migrated from the OSS software to the Appcelerator Platform.


Some community tools like [TiNy](https://npmjs.com/tn) and [TiShadow](https://npmjs.com/tishadow) relied on these old CLIs and will now have to work in environments where either or both the new unified and old global CLIs are installed. This module and CLI takes care of that.

## Module API
The primary use of this package is to be used as a module, which will try to use the former global CLIs and fall back to the unified.

```
var compat = require('appc-compat');

compat.ti(['info', '-t', 'ios'], {
	// options
}, function(err, out, code) {
	// do something
});
```

Other available methods are:

* `compat.spawn(cmd, args, opts, cb);`
* `compat.spawnSync(cmd, args, opts);`
* `compat.tiSync(args, opts);`
* `compat.titanium(args, opts, cb);`
* `compat.titaniumSync(args, opts);`
* `compat.alloy(args, opts, cb);`
* `compat.alloySync(args, opts);`
* `compat.acs(args, opts, cb);`
* `compat.acsSync(args, opts);`

You can pass `preferAppc:true` in the `opts` argument to first try the unified CLI and fall back to the former global CLIs.

Finally, you can check the existence of various CLIs via these boolean properties:

* `compat.hasAppc;`
* `compat.hasTi;`, `compat.hasTitanium;`
* `compat.hasAlloy;`
* `compat.hasAcs;`

## CLI
The package also installs a new `appc-compat` CLI, which will try to use the former global CLIs and fall back to the unified.

```
$ appc-compat ti info
```

Or pass the `--prefer-appc` option to first try the unified CLI and fall back to the former global CLIs:

```
$ appc-compat ti info --prefer-appc
```

## Alias
If you want the convenience of the former shorter CLIs for those embeded in the new unified CLI just use a bash alias in your `~/.bash_profile`:

```
alias ti='appc ti'
alias alloy='appc alloy'
alias acs='appc acs'
```

Don't forget to:

```
source ~/.bash_profile
```
