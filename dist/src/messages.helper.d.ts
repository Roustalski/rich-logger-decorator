import { FunctionLoggerOptions } from './interfaces';
export declare const logMessage: (isStart: boolean, targetInstance: any, functionName: any, originalFunction: any, functionArgsVals: any, options: FunctionLoggerOptions) => void;
export declare const generateSingleMessage: (targetInstance: any, functionName: any, originalFunction: any, functionArgsVals: any, options: FunctionLoggerOptions, result: any) => Promise<string>;
