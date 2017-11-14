import * as _ from 'lodash';
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
var getClassName = function (instance) {
    return instance.constructor ? instance.constructor.name : null;
};
var getArgsStrings = function (argValues, func, options) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var argNames = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (argNames === null)
        return [];
    var requiredArgNames = (options.withArgs instanceof Array) ? options.withArgs : argNames;
    return requiredArgNames.map(function (argName) {
        return argNames.indexOf(argName);
    }).map(function (argNameIndex) {
        if (argNameIndex === -1 || argNameIndex >= argValues.length)
            return '';
        return "[" + argNames[argNameIndex] + "=" + JSON.stringify(argValues[argNameIndex]) + "]";
    });
};
var getPropertiesStrings = function (withClassProperties, targetInstance) {
    var allProps = _.keys(targetInstance);
    var requiredProps = (withClassProperties instanceof Array) ? _.intersection(allProps, withClassProperties) : allProps;
    return requiredProps.map(function (propName) {
        return "[" + propName + "=" + JSON.stringify(targetInstance[propName]) + "]";
    });
};
var getTime = function () {
    var timeStr = (new Date()).toLocaleString().replace(',', '');
    return timeStr;
};
export var logMessage = function (isStart, targetInstance, functionName, originalFunction, functionArgsVals, options) {
    var time = options.withTime ? "[" + getTime() + "] " : '';
    var className = getClassName(targetInstance);
    var classNameStr = className ? className + "::" : '';
    var logFunction = options.logFunction || console.info;
    var args = options.withArgs ? getArgsStrings(functionArgsVals, originalFunction, options) : null;
    var props = options.withClassProperties ? getPropertiesStrings(options.withClassProperties, targetInstance) : null;
    if (options.formatAndLogFunction) {
        options.formatAndLogFunction(time, classNameStr, functionName, isStart, args, props);
        return;
    }
    var startEndStr = isStart ? 'start' : 'end';
    logFunction(time + "\t" + classNameStr + functionName + "\t" + startEndStr);
    args && logFunction("\tFunction arguments:\t" + args.join(' '));
    props && logFunction("\tClass properties:\t" + props.join(' '));
};
export var generateSingleMessage = function (targetInstance, functionName, originalFunction, functionArgsVals, options, result) {
    var time = options.withTime ? "[" + getTime() + "] " : '';
    var className = getClassName(targetInstance);
    var classNameStr = className ? className + "::" : '';
    var logFunction = options.logFunction || console.info;
    var args = options.withArgs ? getArgsStrings(functionArgsVals, originalFunction, options) : null;
    var props = options.withClassProperties ? getPropertiesStrings(options.withClassProperties, targetInstance) : null;
    return new Promise(function (resolve) {
        var response = {
            message: "" + time + classNameStr + functionName,
            args: args,
            props: props,
            result: ""
        };
        if (result instanceof Promise) {
            result
                .then(function (val) {
                response.result = JSON.stringify(val);
                resolve(JSON.stringify(response));
                return val;
            })
                .catch(function (reason) {
                response.result = "Rejected Promise: " + JSON.stringify(reason);
                resolve(JSON.stringify(response));
                return reason;
            });
        }
        else {
            response.result = JSON.stringify(result);
            resolve(JSON.stringify(response));
        }
    });
};
//# sourceMappingURL=messages.helper.js.map