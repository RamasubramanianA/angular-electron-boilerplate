import Dexie from 'dexie';

export class YenBookDB extends Dexie  {
    preference: Dexie.Table< preferenceInterface , string>; 

    constructor(){
        super("YenBook");
        this.version(1).stores({
            preference: 'key, value',
            //...other tables goes here...
        });
        // The following line is needed if your typescript
        // is compiled using babel instead of tsc:
        // this.preference = this.table("preference");
    }
}

export interface preferenceInterface{
    key: string;
    value: string;
}


