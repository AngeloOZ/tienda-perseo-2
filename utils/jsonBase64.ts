import {encode, decode} from "js-base64";


export function stringifyJSON(data: object) {
    try {
        const string = JSON.stringify(data);
        return encode(string);
    }
    catch(err) {
        console.error(err);
        throw new Error("Error parsing JSON");
    }
}

export function paseJSON(textEncoding: string) {
    try{
        const string = decode(textEncoding);
        return JSON.parse(string);
    }
    catch {
        throw new Error("Error parsing TEXT to JSON");
    }
}