
interface Deserializable {
    getTypes(): Object;
}

export class Address implements Deserializable{
	address: string;
	label: string;
	purpose: string;
	rootId: string;
	path: string;

    constructor( address: string, label: string, purpose: string, rootId: string, path: string) { 
    	this.address = address; 
    	this.label = label;
    	this.purpose = purpose;
    	this.rootId = rootId;
        this.path = path;
    }
    

    getTypes() {
        // since everything is primitive, we don't need to
        // return anything here
        return {};
    }
}


/*
    Deserialize JSON and cast it to a class of "type".
*/

export function deserialize(json, type) {
    var instance = new type(),
        types = instance.getTypes();

    for(var prop in json) {
        if(!json.hasOwnProperty(prop)) {
            continue;
        }
        //Note: disabled for walletconflicts, which is an empty array.
        if(typeof json[prop] === 'object') {
            instance[prop] = deserialize(json[prop], types[prop]);
        } else {
            instance[prop] = json[prop];
        }
    }

    return instance;
}

/*
    TEST DATA
*/
export var TEST_ADDRESSES_JSON : Object[] = [
    {
        "address": "PsUjZnZikdqfYZJAnM8jpktfQdQ1YTe7JY",
        "label": "Default",
        "root": "AbUL5vpWYDDda9AVP88QUGmd33Kg8aS8eh",
        "path": "m/0/5"
    },
    {
        "address": "PdVwKsTiksmqYZJAnM8jpktfQdQ1YTe7JY",
        "label": "Exchange",
        "root": "AbUL5vpWYDDda9AVP88QUGmd33Kg8aS8eh",
        "path": "m/0/5"
    }
];