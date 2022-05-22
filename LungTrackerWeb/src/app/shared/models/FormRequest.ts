export default class formRequest {
    constructor() {
        this.demographicDetails = {
            birthdate: '',
            sex: '',
            livingPlace: {
                postalCode: '',
                country: '',
                state: '',
                city: '',
                initialYear: 0
            },
            bornPlace: {
                postalCode: '',
                country: '',
                state: '',
                city: '',
                initialYear: 0,
                endYear: 0
            }

        };

        this.clinicDetails = {
            mainDiagnose: {
                diagnoseYear: 0,
                cancerType: '',
                notListedCancerType: false,
                mutation: false,
                mutationType: '',
                notListedMutationType: false,
                operatedCancer: false,
                operationYear: 0,
                extraTreatment: [],
                metastasis: false,
                metastasisYear: 0,
                metastasisTreatment: '',
                notListedTreatment: false,
                noSurgeryTreatment: '',
                notListedNoSurgeryTreatment: false,
                previousDiseases: []
            },
            otherDiagnose: []
        };

        this.expositionDetails = {
            smoker: false,
            startAge: 0,
            endAge: 0,
            avgCigarrettes: 0,
            otherProducts: [],
            nearbyRoad: false,
            expositions: []
        };

        this.jobDetails = [];

        this.familyDetails = [];
    }

    demographicDetails: {
        birthdate: string;
        sex: string;
        livingPlace: {
            postalCode: string;
            country: string;
            state: string;
            city: string;
            initialYear: number;
        }
        bornPlace: {
            postalCode: string;
            country: string;
            state: string;
            city: string;
            initialYear: number;
            endYear: number;
        }
    };

    clinicDetails!: {
        mainDiagnose: {
            diagnoseYear: number;
            cancerType: string;
            notListedCancerType: boolean;
            mutation: boolean;
            mutationType: string;
            notListedMutationType: boolean;
            operatedCancer: boolean;
            operationYear: number;
            extraTreatment: Array<string>;
            metastasis: boolean;
            metastasisYear: number;
            metastasisTreatment: string;
            notListedTreatment: boolean;
            noSurgeryTreatment: string;
            notListedNoSurgeryTreatment: boolean;
            previousDiseases: Array<string>;
        };
        otherDiagnose: Array<Diagnose>;
    };

    expositionDetails!: {
        smoker: boolean,
        startAge: number;
        endAge: number;
        avgCigarrettes: number;
        otherProducts: Array<string>;
        nearbyRoad: boolean;
        expositions: Array<string>;
    };

    jobDetails!: Array<Job>;

    familyDetails!: Array<Familiar>;
}

export class Diagnose {

    constructor(){
        this.cancerType = '';
        this.diagnoseYear = 0;
        this.metastasis = false;
        this.metastasisYear = 0;
        this.extraTreatment = '';

    }

    cancerType!: string;
    diagnoseYear!: number;
    metastasis!: boolean;
    metastasisYear!: number;
    extraTreatment!: string;
}

export class FamilyDiagnose {

    constructor(){
        this.cancerType = '';
        this.diagnoseYear = 0;
        this.metastasis = false;
        this.metastasisYear = 0;
        this.extraTreatment = [];

    }

    cancerType!: string;
    diagnoseYear!: number;
    metastasis!: boolean;
    metastasisYear!: number;
    extraTreatment!: Array<string>;
}

export class Job {

    constructor(){
        this.initialYear = 0;
        this.endYear = 0;
        this.job = '';
        this.isProtected = false;
        this.currentJob = false;
    }

    initialYear!: number;
    endYear!: number;
    job!: string;
    isProtected!: boolean;
    currentJob!: boolean;

}

export class Familiar {
    constructor() {
        this.relation = '';
        this.age = 0;
        this.survived = false;
        this.ageOfDeath = 0;
        this.cancerCause = false;
        this.diagnose = new FamilyDiagnose();
    }

    relation!: string;
    age!: number;
    survived!: boolean;
    ageOfDeath!: number;
    cancerCause!: boolean;
    diagnose!: FamilyDiagnose;
}
