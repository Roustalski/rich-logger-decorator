import * as _ from 'lodash';
import { defaultFunctionOptions } from './default-options';
import { generateSingleMessage } from './messages.helper';
var logger = function (options) {
    if (options === void 0) { options = defaultFunctionOptions; }
    return function (target, methodName, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, methodName);
        }
        var originalMethod = descriptor.value;
        descriptor.value = getMonkeyPatchMethod(originalMethod, methodName, options);
        descriptor.value.__loggerMonkeyPatchCompleted = true;
        return descriptor;
    };
};
var disableMethodLogger = function () {
    return function (target, methodName, descriptor) {
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, methodName);
        }
        var originalMethod = descriptor.value;
        originalMethod.__loggerMonkeyPatchCompleted = true;
        return descriptor;
    };
};
export var getMonkeyPatchMethod = function (method, methodName, options) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = method.apply(this, args);
        var logFunction = options.logFunction || console.info;
        generateSingleMessage(this, methodName, method, args, options, result).then(function (message) { return logFunction(message); });
        return result;
    };
};
export function Logger(options) {
    if (options === void 0) { options = defaultFunctionOptions; }
    return logger(options);
}
export function LoggerWithoutArgs(options) {
    if (options === void 0) { options = defaultFunctionOptions; }
    options = _.extend({}, options, {
        withArgs: false
    });
    return Logger(options);
}
export function DisableMethodLogger() {
    return disableMethodLogger();
}
//# sourceMappingURL=function-logger.decorator.js.map