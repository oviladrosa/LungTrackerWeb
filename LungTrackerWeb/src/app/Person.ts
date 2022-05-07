

    export interface Livingplace {
        _id: string;
        person: string;
        country: string;
        city: string;
        postalCode: string;
        yearOfStart: number;
        yearOfEnd?: number;
        isPresent: boolean;
    }

    export interface Surgery {
        year: number;
        surgery_treatment: string;
    }

    export interface Tumor {
        _id: string;
        person: string;
        main: boolean;
        diagnoseYear: number;
        type: string;
        surgery: Surgery[];
        mutations: string[];
        metastasis: string[];
    }

    export interface Person {
        _id: string;
        birthdate: Date;
        age: number;
        sex: string;
        postalcode: string;
        country: string;
        livingplaces: Livingplace[];
        tumors: Tumor[];
    }



