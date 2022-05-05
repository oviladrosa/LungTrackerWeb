<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder, FormArray } from '@angular/forms';
import Geonames from 'geonames.js';
import { Country, State, City }  from 'country-state-city';
import { LungFormQuestionsService } from './lung-form-questions-service'

console.log(State.getAllStates())

@Component({
  selector: 'app-lung-form-questions',
  templateUrl: './lung-form-questions.component.html',
  styleUrls: ['./lung-form-questions.component.css']
})
export class LungFormQuestionsComponent implements OnInit {


  demographicDetails!: FormGroup;
  clinicDetails!: FormGroup;
  expositionDetails!: FormGroup;
  jobDetails!: FormGroup;
  familyDetails!: FormGroup;
  demographic_step = false;
  clinic_step = false;
  exposition_step = false;
  job_step = false;
  family_step = false;
  step = 1;
  residenceCity: any;

  // geonames = Geonames({
  //   username: 'clinic_test',
  //   lan: 'es',
  //   encoding: 'JSON'
  // });

  generos: any = ['Hombre', 'Mujer', 'No Binario']
  cancerTypes: any = ['Cáncer microcítico (de célula pequeña)', 'No Microcítico (de célula no pequeña)', 'Otros', 'NS / NC']
  mutationAnswer: any = ['No se ha detectado mutación','Sí','NS/NC'];
  mutationTypes: any = ['EGFR',
  'KRAS',
  'ALK',
  'ROS1',
  'BRAF',
  'MET',
  'RET',
  'HER2',
  'NRTK',
  'Otros',
  ];
  surgeryAnswers: any = ['Sí', 'No', 'NS/NC'];
  surgeryExtraTreatments: any = ['Quimio', 'Radio', 'Otros', 'No'];
  metastasisOptions: any = ['Quimioterapia',
    'Inmunoterapia',
    'Combinación de quimio+Inmuno',
    'Tratamiento dirigido (pastillas)',
    'Ensayo clínico',
    'Ninguno',
    'Otros',
    ];
  otherMetastasisTreatments: any = ['Quimioterapia',
    'Inmunoterapia',
    'Combinación de quimio+Inmuno',
    'Tratamiento dirigido (pastillas)',
    'Ensayo clínico',
    'Otros',
    'No'
    ]
  otherCancerTypes: any = [
    'Otro cáncer de pulmón',
    'Mama',
    'Colon',
    'Estómago',
    'Pancreas',
    'Cerebral',
    'Hematológico',
    'Ginecológico',
    'Próstata',
    'Vejiga',
    'Cabeza y cuello',
    'Piel',
    'Otros'
  ]
  otherCancerTreatments: any = ['Cirugía',
    'Quimioterapia',
    'Radioterapia',
    'Otros'
    ]
  previousDiseasesOptions: any = ['Asma',
    'Bronquitis crónica',
    'Fibrosis pulmonar',
    'Enfisema',
    'Neumonia',
    'Bronquitis',
    'Otros (texto)',
    'NO',
    'NS/NC',
    ]

  otherSubstances: any = [
    'No',
    'Cigarrillo electrónico',
    'Cannabis',
    'Puros',
    'Otros'
  ]

  dangerousSubstances: any = [
    'Amianto',
'Humo de combustión de gasolina/diesel',
'Soldadura',
'Radiación',
'Otros (texto)',
'NS/NC'
  ]

  workingAnswers: any = [
    'Si',
    'No',
    'NS/NC'
  ]

  familyAnswers: any = [
    'Sí',
    'No',
    'NS/NC'
  ]

  familyRealtions: any = [
    "Padre",
    'Madre',
    'Hijo',
    'Hija',
    'Hermano',
    'Hermana',
    'Tío Paterno',
    'Tío Materno',
    'Tía Paterna',
    'Tía Materna',
    'Abuelo Paterno',
    'Abuelo Materno',
    'Abuela Paterna',
    'Abuela Materna',
  ]

  familiarCancerTypes: any = [
    'Pulmón',
    'Mama',
    'Colon',
    'Estómago',
    'Pancreas',
    'Cerebral',
    'Hematológico',
    'Ginecológico',
    'Próstata',
    'Vejiga',
    'Cabeza y cuello',
    'Piel',
    'Otros'
  ]

  treatmentTypesList: any = [
    'Cirugía',
'Quimioterapia',
'Radioterapia',
'Otros (texto)'
  ]
  countries: any;
  regions: any;
  cities: any;

  bornCountries: any;
  bornRegions: any;
  bornCities: any;

  cancerItems: FormArray | undefined;
  jobItems: FormArray | undefined;
  familyItems: FormArray | undefined;


  constructor(private formBuilder: FormBuilder,
              private questionService: LungFormQuestionsService) {
    this.demographicDetails = this.formBuilder.group({
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      residenceCountry: ['',Validators.required],
      residenceRegion: ['',Validators.required],
      residenceCity: ['',Validators.required],
      residencePostCode: ['',Validators.required],
      residenceInitialYears: ['',Validators.required],
      residenceEndYears: ['',Validators.required],
      bornCountry: ['',Validators.required],
      bornRegion: ['',Validators.required],
      bornCity: ['',Validators.required],
      bornPostCode: ['',Validators.required],
      bornInitialYears: ['',Validators.required],
      bornEndYears: ['',Validators.required]

    });
    this.clinicDetails = this.formBuilder.group({
      yearDiagnose: ['', Validators.required],
      cancerType: ['', Validators.required],
      otherCancerType: ['', null],
      mutationAnswer: ['', Validators.required],
      mutationType: ['', Validators.required],
      otherMutationType: ['', null],
      sugeryAnswer: ['', Validators.required],
      surgeryYear: ['', Validators.required],
      surgeryExtraTreatment: ['', Validators.required],
      metastasisAnswer: ['', Validators.required],
      metastasisYear: ['', Validators.required],
      metastatisTreatment: ['', Validators.required],
      otherMetastasisTreatment: ['', null],
      noSurgeryTreatmentAnswer: ['', Validators.required],
      otherNonSurgeryTreatment: ['', null],
      additionalDiagnoseAnswer: ['', Validators.required],
      otherCancers: new FormArray([]),
      previousDiseases: ['', Validators.required],
      otherPreviousDiseases: ['', Validators.required]
    });
    this.expositionDetails = this.formBuilder.group({
      smokeAnswer: ['', Validators.required],
      initialSmokeYear: ['', Validators.required],
      endSmokeYear: ['', null],
      averageCigarettes: ['', Validators.required],
      otherSusbtancesAnswer: ['', Validators.required],
      extraOtherSusbtancesAnswer: ['', Validators.required],
      residenceNearRoadAnswer: ['', Validators.required],
      dangerousSubstances: ['', Validators.required], // multiplechoice
      extraDangerousSubstances: ['', Validators.required] 
    });
    this.jobDetails = this.formBuilder.group({
      currentlyWorkingAnswer: ['', Validators.required],
      initialYearCurrentJob: ['', Validators.required],
      currentJobDescription: ['', Validators.required],
      currentJobProtections: [false, null],
      otherJobs: new FormArray([])
    });
    this.familyDetails = this.formBuilder.group({
      anyFamilyDiagnoseAnswer: ['', Validators.required],
      familyDiagnoses: new FormArray([])
    });
   }

   createCancersItems(): FormGroup {
    return this.formBuilder.group({
      type: ['', Validators.required],
      year: ['', Validators.required],
      metastasis: ['', Validators.required],
      metastasisYear: ['', null],
      treatmentAnswer: ['', Validators.required],
      treatmentType: ['',null],
    });
   }

   createJobItems(): FormGroup {
    return this.formBuilder.group({
      initialYearJob: ['', Validators.required],
      finalYearJob: ['', Validators.required],
      jobDescription: ['', Validators.required],
      jobProtections: [false, null],
    });
   }

   createFamilyItems(): FormGroup {
    return this.formBuilder.group({
      relation: ['', Validators.required],
      age: ['', Validators.required],
      isDead: [false, null],
      deadCause: [false, null],
      deadDate: ['', Validators.required],
      cancerType: ['', Validators.required],
      otherCancerType: ['', Validators.required],
      hasMetastasis: ['', Validators.required],
      hasTreatment: ['', Validators.required],
      treatmentType: ['', Validators.required],
      otherTreatment: ['', Validators.required],
    });
   }

   addCancerItem() {
    this.cancerItems = this.clinicDetails.get('otherCancers') as FormArray;
    const newFormGroup = this.createCancersItems();
    newFormGroup.enable();
    newFormGroup.controls['metastasisYear'].disable();
    newFormGroup.controls['treatmentType'].disable();
    this.cancerItems.push(newFormGroup);
   }

   deleteCancerItem() {
    this.cancerItems = this.clinicDetails.get('otherCancers') as FormArray;
    const leng = this.cancerItems.length;
    this.cancerItems.removeAt(leng-1);
   }

   get getOtherCancers () {
    return this.clinicDetails.get('otherCancers') as FormArray
  }

  addJobItem() {
    this.jobItems = this.jobDetails.get('otherJobs') as FormArray;
    const newFormGroup = this.createJobItems();
    newFormGroup.enable();
    this.jobItems.push(newFormGroup);
   }

   deleteJobItem() {
    this.jobItems = this.jobDetails.get('otherJobs') as FormArray;
    const leng = this.jobItems.length;
    this.jobItems.removeAt(leng-1);
   }

   get getOtherJob () {
    return this.jobDetails.get('otherJobs') as FormArray
  }

  addFamilyItem() {
    this.familyItems = this.familyDetails.get('familyDiagnoses') as FormArray;
    const newFormGroup = this.createFamilyItems();
    newFormGroup.enable();
    newFormGroup.controls['otherCancerType'].disable();
    newFormGroup.controls['otherTreatment'].disable();
    newFormGroup.controls['treatmentType'].disable();
    newFormGroup.controls['deadDate'].disable();
    newFormGroup.controls['deadCause'].disable();
    this.familyItems.push(newFormGroup);
   }

   deleteFamilyItem() {
    this.familyItems = this.familyDetails.get('familyDiagnoses') as FormArray;
    const leng = this.familyItems.length;
    this.familyItems.removeAt(leng-1);
    console.log(this.familyDetails.get('familyDiagnoses') as FormArray);
   }

   get getOtherFamily () {
    return this.familyDetails.get('familyDiagnoses') as FormArray
  }

  getFamilyForm (id: number) {
    return this.getOtherFamily['controls'][id] as FormGroup;
  }

  getCancerForm (id: number) {
    return this.getOtherCancers['controls'][id] as FormGroup;
  }

  async ngOnInit() {
    // const geonames = Geonames({
    //   username: 'clinic_test',
    //   lan: 'es',
    //   encoding: 'JSON'
    // });
    try{
      // let resCountries = await geonames.countryInfo();
      // console.log(resCountries['geonames']);
      // resCountries = resCountries['geonames'];
      // this.countries = [];
      // for (const c of resCountries) {
      //   this.countries.push(c);
      // } 
      // this.countries.sort();
      this.countries = Country.getAllCountries();
      this.bornCountries = Country.getAllCountries();
    }catch(err){
      console.error(err);
    }
    this.clinicDetails.controls['otherCancerType'].disable();
    this.clinicDetails.controls['mutationType'].disable();
    this.clinicDetails.controls['otherMutationType'].disable();
    this.clinicDetails.controls['surgeryYear'].disable();
    this.clinicDetails.controls['surgeryExtraTreatment'].disable();
    this.clinicDetails.controls['metastasisYear'].disable();
    this.clinicDetails.controls['metastatisTreatment'].disable();
    this.clinicDetails.controls['otherMetastasisTreatment'].disable();
    this.clinicDetails.controls['otherNonSurgeryTreatment'].disable();
    this.clinicDetails.controls['otherPreviousDiseases'].disable();

    this.expositionDetails.controls['initialSmokeYear'].disable();
    this.expositionDetails.controls['endSmokeYear'].disable();
    this.expositionDetails.controls['averageCigarettes'].disable();
    this.expositionDetails.controls['extraOtherSusbtancesAnswer'].disable();
    this.expositionDetails.controls['extraDangerousSubstances'].disable();
  }

  getDemographic() { this.demographicDetails.controls;}
  getClinic() { this.clinicDetails.controls;}
  getExposition() { this.expositionDetails.controls;}
  getJob() { this.jobDetails.controls;}
  getFamily() { this.familyDetails.controls;}

  next() {
    switch(this.step) {
      case 1:
        this.demographic_step = false;
        this.clinic_step = true;
        if (this.demographicDetails.invalid) {
          return;
        }
        this.step++;
        return;
      case 2:
        this.clinic_step = false;
        this.exposition_step = true;
        if (this.clinicDetails.invalid) {
          return;
        }
        this.step++;
        return;
      case 3:
        this.exposition_step =false;
        this.job_step = true;
        if (this.expositionDetails.invalid) {
          return;
        }
        this.step++;
        return;

      case 4:
        this.job_step = false;
        this.family_step = true;
        if (this.jobDetails.invalid) {
          return;
        }
        this.step++;
        return;
    }
  }

  previous() {
    this.step--;
    switch(this.step) {
      case 1:
        this.demographic_step = true;
        this.clinic_step = false;
        return;
      case 2:
        this.clinic_step = true;
        this.exposition_step = false;
        return;
      case 3:
        this.exposition_step =true;
        this.job_step = false;
        return;

      case 4:
        this.job_step = true;
        this.family_step = false;
        return;
    }
  }

  submit() {
    if (this.step == 5) {
      this.family_step = true;
      if (this.familyDetails.invalid) return;
      else {}
    }
  }

  async changeRegions() {
      this.cities = [];
      this.regions = [];
      const state = this.demographicDetails.get('residenceCountry')?.value.isoCode;
      this.regions = State.getStatesOfCountry(state);
  }

  async changeBornRegions() {
    this.bornCities = [];
    this.bornRegions = [];
    const state = this.demographicDetails.get('bornCountry')?.value.isoCode;
    this.bornRegions = State.getStatesOfCountry(state);
  }

  async changeCities() {
      const country = this.demographicDetails.get('residenceCountry')?.value;
      const state = this.demographicDetails.get('residenceRegion')?.value;
      this.cities = City.getCitiesOfState(country.isoCode, state.isoCode);
  }

  async changeBornCities() {
    const country = this.demographicDetails.get('bornCountry')?.value;
    const state = this.demographicDetails.get('bornRegion')?.value;
    this.bornCities = City.getCitiesOfState(country.isoCode, state.isoCode);
  }

  getTitle() {
    switch(this.step){
      case 1:
        return "1 - Datos demográficos";
      case 2:
        return "2 - Historial clínico";
      case 3:
        return "3 - Exposición a tóxicos contaminantes";
      case 4:
        return "4 - Historial laboral";
      case 5:
        return "5 - Historial familiar";
    }
    return "";
  }

  enableOtherCancerField() {
    const type = this.clinicDetails.get('cancerType')?.value;
    if (type === 'Otros') {
      this.clinicDetails.controls['otherCancerType'].enable();
    } else {
      this.clinicDetails.controls['otherCancerType'].disable();
      this.clinicDetails.controls['otherCancerType'].setValue("");
    }
    console.log(this.clinicDetails);
  }

  enableMutationType() {
    const answer = this.clinicDetails.get('mutationAnswer')?.value;
    if (answer === 'Sí') {
      this.clinicDetails.controls['mutationType'].enable();
    } else {
      this.clinicDetails.controls['mutationType'].setValue("");
      this.clinicDetails.controls['mutationType'].disable();
    }
  }

  enableOtherMutationType() {
    const type = this.clinicDetails.get('mutationType')?.value;
    if (type === 'Otros') {
      this.clinicDetails.controls['otherMutationType'].enable();
    } else {
      this.clinicDetails.controls['otherMutationType'].disable();
      this.clinicDetails.controls['otherMutationType'].setValue("");
    }
  }

  enableSurgeryYear() {
    const answer = this.clinicDetails.get('sugeryAnswer')?.value;
    if (answer === 'Sí') {
      this.clinicDetails.controls['surgeryYear'].enable();
      this.clinicDetails.controls['surgeryExtraTreatment'].enable();
    } else {
      this.clinicDetails.controls['surgeryYear'].setValue("");
      this.clinicDetails.controls['surgeryYear'].disable();
      this.clinicDetails.controls['surgeryExtraTreatment'].setValue("");
      this.clinicDetails.controls['surgeryExtraTreatment'].disable();
    }
  }

  enableMetastasisTypes() {
    const answer = this.clinicDetails.get('metastasisAnswer')?.value;
    if (answer === 'Sí') {
      this.clinicDetails.controls['metastasisYear'].enable();
      this.clinicDetails.controls['metastatisTreatment'].enable();
    } else {
      this.clinicDetails.controls['metastasisYear'].setValue("");
      this.clinicDetails.controls['metastasisYear'].disable();
      this.clinicDetails.controls['metastatisTreatment'].setValue("");
      this.clinicDetails.controls['metastatisTreatment'].disable();
    }
  }

  enableOtherMetastasis() {
    const type = this.clinicDetails.get('metastatisTreatment')?.value;
    if (type === 'Otros') {
      this.clinicDetails.controls['otherMetastasisTreatment'].enable();
    } else {
      this.clinicDetails.controls['otherMetastasisTreatment'].disable();
      this.clinicDetails.controls['otherMetastasisTreatment'].setValue("");
    }
  }

  enableOtherMetastasisTreatments() {
    const type = this.clinicDetails.get('noSurgeryTreatmentAnswer')?.value;
    if (type === 'Otros') {
      this.clinicDetails.controls['otherNonSurgeryTreatment'].enable();
    } else {
      this.clinicDetails.controls['otherNonSurgeryTreatment'].disable();
      this.clinicDetails.controls['otherNonSurgeryTreatment'].setValue("");
    }
  }

  async getJobOptions() {
    const value = this.jobDetails.controls['currentJobDescription'].value;
    const response = await this.questionService.findJobs(value);
    console.log(response);
  }

  enableOtherFamilyTypes(id: number) {
    const fg = this.getFamilyForm(id);
    const type = fg.get('cancerType')?.value;
    if (type === 'Otros') {
      fg.controls['otherCancerType'].enable();
    } else {
      fg.controls['otherCancerType'].disable();
      fg.controls['otherCancerType'].setValue("");
    }
  }

  enableTreatmentsFamily(id: number) {
    const fg = this.getFamilyForm(id);
    const type = fg.get('hasTreatment')?.value;
    if (type === 'Sí') {
      fg.controls['treatmentType'].enable();
    } else {
      fg.controls['treatmentType'].disable();
      fg.controls['treatmentType'].setValue([]);
    }
  }

  enableOtherFamilyTreatmentTypes(id: number) {
    const fg = this.getFamilyForm(id);
    const type = fg.get('treatmentType')?.value;
    let other = false;
    for (const value of type) {
      if (value === 'Otros (texto)') other =true;
    }
    if (other) {
      fg.controls['otherTreatment'].enable();
    } else {
      fg.controls['otherTreatment'].disable();
      fg.controls['otherTreatment'].setValue("");
    }
    console.log(type);
  }

  isDeadEnables(id: number){
    const fg = this.getFamilyForm(id);
    const type = fg.get('isDead')?.value;
    if (type == false) {
      fg.controls['age'].enable();
      fg.controls['deadDate'].disable();
      fg.controls['deadCause'].disable();
    } else {
      fg.controls['age'].disable();
      fg.controls['deadDate'].enable();
      fg.controls['deadCause'].enable();
    }
  }

  enableOtherPreviousDisease() {
    
    const type = this.clinicDetails.get('previousDiseases')?.value;
    let other = false;
    for (const value of type) {
      if (value === 'Otros (texto)') other = true;
    }
    if (other) {
      this.clinicDetails.controls['otherPreviousDiseases'].enable();
    } else {
      this.clinicDetails.controls['otherPreviousDiseases'].disable();
      this.clinicDetails.controls['otherPreviousDiseases'].setValue("");
    }
  }

  enableOtherCancerMetastasisYear(id: number) {
    const fg = this.getCancerForm(id);
    const type = fg.get('metastasis')?.value;
    
    if (type === 'Sí') {
      fg.controls['metastasisYear'].enable();
    } else {
      fg.controls['metastasisYear'].disable();
      fg.controls['metastasisYear'].setValue("");
    }
  }

  enableOtherCancerTreatments(id: number) {
    const fg = this.getCancerForm(id);
    const type = fg.get('treatmentAnswer')?.value;
    
    if (type === 'Sí') {
      fg.controls['treatmentType'].enable();
    } else {
      fg.controls['treatmentType'].disable();
      fg.controls['treatmentType'].setValue("");
    }
  }

  enableSmokeInfo() {
    const answer = this.expositionDetails.get('smokeAnswer')?.value;
    if (answer === 'Sí') {
      this.expositionDetails.controls['initialSmokeYear'].enable();
      this.expositionDetails.controls['endSmokeYear'].enable();
      this.expositionDetails.controls['averageCigarettes'].enable();
    } else {
      this.expositionDetails.controls['initialSmokeYear'].disable();
      this.expositionDetails.controls['initialSmokeYear'].setValue('');
      this.expositionDetails.controls['endSmokeYear'].disable();
      this.expositionDetails.controls['endSmokeYear'].setValue('');
      this.expositionDetails.controls['averageCigarettes'].disable();
      this.expositionDetails.controls['averageCigarettes'].setValue('');
    }
  }

  enableOtherSmokingProducts() {
    const type = this.expositionDetails.get('otherSusbtancesAnswer')?.value;
    let other = false;
    for (const value of type) {
      if (value === 'Otros') other = true;
    }
    if (other) {
      this.expositionDetails.controls['extraOtherSusbtancesAnswer'].enable();
    } else {
      this.expositionDetails.controls['extraOtherSusbtancesAnswer'].disable();
      this.expositionDetails.controls['extraOtherSusbtancesAnswer'].setValue("");
    }
  }

  enableOtherExpositions() {
    const type = this.expositionDetails.get('dangerousSubstances')?.value;
    let other = false;
    for (const value of type) {
      if (value === 'Otros (texto)') other = true;
    }
    if (other) {
      this.expositionDetails.controls['extraDangerousSubstances'].enable();
    } else {
      this.expositionDetails.controls['extraDangerousSubstances'].disable();
      this.expositionDetails.controls['extraDangerousSubstances'].setValue("");
    }
  }
}
=======
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder, FormArray } from '@angular/forms';
import Geonames from 'geonames.js';
import { Country, State, City }  from 'country-state-city';
import { LungFormQuestionsService } from './lung-form-questions-service'

console.log(State.getAllStates())

@Component({
  selector: 'app-lung-form-questions',
  templateUrl: './lung-form-questions.component.html',
  styleUrls: ['./lung-form-questions.component.css']
})
export class LungFormQuestionsComponent implements OnInit {


  demographicDetails!: FormGroup;
  clinicDetails!: FormGroup;
  expositionDetails!: FormGroup;
  jobDetails!: FormGroup;
  familyDetails!: FormGroup;
  demographic_step = false;
  clinic_step = false;
  exposition_step = false;
  job_step = false;
  family_step = false;
  step = 1;
  residenceCity: any;

  // geonames = Geonames({
  //   username: 'clinic_test',
  //   lan: 'es',
  //   encoding: 'JSON'
  // });

  generos: any = ['Hombre', 'Mujer', 'No Binario']
  cancerTypes: any = ['Cáncer microcítico (de célula pequeña)', 'No Microcítico (de célula no pequeña)', 'Otros', 'NS / NC']
  mutationAnswer: any = ['No se ha detectado mutación','Sí','NS/NC'];
  mutationTypes: any = ['EGFR',
  'KRAS',
  'ALK',
  'ROS1',
  'BRAF',
  'MET',
  'RET',
  'HER2',
  'NRTK',
  'Otros',
  ];
  surgeryAnswers: any = ['Sí', 'No', 'NS/NC'];
  surgeryExtraTreatments: any = ['Quimio', 'Radio', 'Otros', 'No'];
  metastasisOptions: any = ['Quimioterapia',
    'Inmunoterapia',
    'Combinación de quimio+Inmuno',
    'Tratamiento dirigido (pastillas)',
    'Ensayo clínico',
    'Ninguno',
    'Otros',
    ];
  otherMetastasisTreatments: any = ['Quimioterapia',
    'Inmunoterapia',
    'Combinación de quimio+Inmuno',
    'Tratamiento dirigido (pastillas)',
    'Ensayo clínico',
    'Otros',
    'No'
    ]
  otherCancerTypes: any = [
    'Otro cáncer de pulmón',
    'Mama',
    'Colon',
    'Estómago',
    'Pancreas',
    'Cerebral',
    'Hematológico',
    'Ginecológico',
    'Próstata',
    'Vejiga',
    'Cabeza y cuello',
    'Piel',
    'Otros'
  ]
  otherCancerTreatments: any = ['Cirugía',
    'Quimioterapia',
    'Radioterapia',
    'Otros'
    ]
  previousDiseasesOptions: any = ['Asma',
    'Bronquitis crónica',
    'Fibrosis pulmonar',
    'Enfisema',
    'Neumonia',
    'Bronquitis',
    'Otros (texto)',
    'NO',
    'NS/NC',
    ]

  otherSubstances: any = [
    'No',
    'Cigarrillo electrónico',
    'Cannabis',
    'Puros',
    'Otros'
  ]

  dangerousSubstances: any = [
    'Amianto',
'Humo de combustión de gasolina/diesel',
'Soldadura',
'Radiación',
'Otros (texto)',
'NS/NC'
  ]

  workingAnswers: any = [
    'Si',
    'No',
    'NS/NC'
  ]
  countries: any;
  regions: any;
  cities: any;

  bornCountries: any;
  bornRegions: any;
  bornCities: any;

  cancerItems: FormArray | undefined;


  constructor(private formBuilder: FormBuilder,
              private questionService: LungFormQuestionsService) {
    this.demographicDetails = this.formBuilder.group({
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      residenceCountry: ['',Validators.required],
      residenceRegion: ['',Validators.required],
      residenceCity: ['',Validators.required],
      residencePostCode: ['',Validators.required],
      residenceInitialYears: ['',Validators.required],
      residenceEndYears: ['',Validators.required],
      bornCountry: ['',Validators.required],
      bornRegion: ['',Validators.required],
      bornCity: ['',Validators.required],
      bornPostCode: ['',Validators.required],
      bornInitialYears: ['',Validators.required],
      bornEndYears: ['',Validators.required]

    });
    this.clinicDetails = this.formBuilder.group({
      yearDiagnose: ['', Validators.required],
      cancerType: ['', Validators.required],
      otherCancerType: ['', null],
      mutationAnswer: ['', Validators.required],
      mutationType: ['', Validators.required],
      otherMutationType: ['', null],
      sugeryAnswer: ['', Validators.required],
      surgeryYear: ['', Validators.required],
      surgeryExtraTreatment: ['', Validators.required],
      metastasisAnswer: ['', Validators.required],
      metastasisYear: ['', Validators.required],
      metastatisTreatment: ['', Validators.required],
      otherMetastasisTreatment: ['', null],
      noSurgeryTreatmentAnswer: ['', Validators.required],
      otherNonSurgeryTreatment: ['', null],
      additionalDiagnoseAnswer: ['', Validators.required],
      additionalDiagnoseType: ['', Validators.required],
      otherAdditionalDiagnoseType: ['', Validators.required],
      otherCancers: new FormArray([]),
      previousDiseases: ['', Validators.required],
      otherPreviousDiseases: ['', Validators.required]
    });
    this.expositionDetails = this.formBuilder.group({
      smokeAnswer: ['', Validators.required],
      initialSmokeYear: ['', Validators.required],
      endSmokeYear: ['', Validators.required],
      averageCigarettes: ['', Validators.required],
      otherSusbtancesAnswer: ['', Validators.required],
      extraOtherSusbtancesAnswer: ['', Validators.required],
      residenceNearRoadAnswer: ['', Validators.required],
      dangerousSubstances: ['', Validators.required], // multiplechoice
      extraDangerousSubstances: ['', Validators.required] 
    });
    this.jobDetails = this.formBuilder.group({
      currentlyWorkingAnswer: ['', Validators.required],
      initialYearCurrentJob: ['', Validators.required],
      currentJobDescription: ['', Validators.required],
      otherJobs: new FormArray([])
    });
    this.familyDetails = this.formBuilder.group({
      anyFamilyDiagnoseAnswer: ['', Validators.required],
      familyDiagnoses: new FormArray([])
    });
   }

   createCancersItems(): FormGroup {
    return this.formBuilder.group({
      type: ['', Validators.required],
      year: ['', Validators.required],
      metastasis: ['', Validators.required],
      metastasisYear: ['', Validators.required],
      treatmentAnswer: ['', Validators.required],
      treatmentType: ['', Validators.required],
    });
   }

   addCancerItem() {
    this.cancerItems = this.clinicDetails.get('otherCancers') as FormArray;
    const newFormGroup = this.createCancersItems();
    newFormGroup.enable();
    this.cancerItems.push(newFormGroup);
   }

   deleteCancerItem() {
    this.cancerItems = this.clinicDetails.get('otherCancers') as FormArray;
    const leng = this.cancerItems.length;
    this.cancerItems.removeAt(leng-1);
   }

   get getOtherCancers () {
    return this.clinicDetails.get('otherCancers') as FormArray
  }

  async ngOnInit() {
    // const geonames = Geonames({
    //   username: 'clinic_test',
    //   lan: 'es',
    //   encoding: 'JSON'
    // });
    try{
      // let resCountries = await geonames.countryInfo();
      // console.log(resCountries['geonames']);
      // resCountries = resCountries['geonames'];
      // this.countries = [];
      // for (const c of resCountries) {
      //   this.countries.push(c);
      // } 
      // this.countries.sort();
      this.countries = Country.getAllCountries();
      this.bornCountries = Country.getAllCountries();
    }catch(err){
      console.error(err);
    }
    this.clinicDetails.controls['otherCancerType'].disable();
    this.clinicDetails.controls['mutationType'].disable();
    this.clinicDetails.controls['otherMutationType'].disable();
    this.clinicDetails.controls['surgeryYear'].disable();
    this.clinicDetails.controls['surgeryExtraTreatment'].disable();
    this.clinicDetails.controls['metastasisYear'].disable();
    this.clinicDetails.controls['metastatisTreatment'].disable();
    this.clinicDetails.controls['otherMetastasisTreatment'].disable();
    this.clinicDetails.controls['otherNonSurgeryTreatment'].disable();
  }

  getDemographic() { this.demographicDetails.controls;}
  getClinic() { this.clinicDetails.controls;}
  getExposition() { this.expositionDetails.controls;}
  getJob() { this.jobDetails.controls;}
  getFamily() { this.familyDetails.controls;}

  next() {
    switch(this.step) {
      case 1:
        this.demographic_step = false;
        this.clinic_step = true;
        if (this.demographicDetails.invalid) {
          return;
        }
        this.step++;
        return;
      case 2:
        this.clinic_step = false;
        this.exposition_step = true;
        if (this.clinicDetails.invalid) {
          return;
        }
        this.step++;
        return;
      case 3:
        this.exposition_step =false;
        this.job_step = true;
        if (this.expositionDetails.invalid) {
          return;
        }
        this.step++;
        return;

      case 4:
        this.job_step = false;
        this.family_step = true;
        if (this.jobDetails.invalid) {
          return;
        }
        this.step++;
        return;
    }
  }

  previous() {
    this.step--;
    switch(this.step) {
      case 1:
        this.demographic_step = true;
        this.clinic_step = false;
        return;
      case 2:
        this.clinic_step = true;
        this.exposition_step = false;
        return;
      case 3:
        this.exposition_step =true;
        this.job_step = false;
        return;

      case 4:
        this.job_step = true;
        this.family_step = false;
        return;
    }
  }

  submit() {
    if (this.step == 5) {
      this.family_step = true;
      if (this.familyDetails.invalid) return;
      else {}
    }
  }

  async changeRegions() {
      this.cities = [];
      this.regions = [];
      const state = this.demographicDetails.get('residenceCountry')?.value.isoCode;
      this.regions = State.getStatesOfCountry(state);
  }

  async changeBornRegions() {
    this.bornCities = [];
    this.bornRegions = [];
    const state = this.demographicDetails.get('bornCountry')?.value.isoCode;
    this.bornRegions = State.getStatesOfCountry(state);
  }

  async changeCities() {
      const country = this.demographicDetails.get('residenceCountry')?.value;
      const state = this.demographicDetails.get('residenceRegion')?.value;
      this.cities = City.getCitiesOfState(country.isoCode, state.isoCode);
  }

  async changeBornCities() {
    const country = this.demographicDetails.get('bornCountry')?.value;
    const state = this.demographicDetails.get('bornRegion')?.value;
    this.bornCities = City.getCitiesOfState(country.isoCode, state.isoCode);
  }

  getTitle() {
    switch(this.step){
      case 1:
        return "1 - Datos demográficos";
      case 2:
        return "2 - Datos cáncer de pulmón";
      case 3:
        return "3 - Datos de otros tumores";
    }
    return "";
  }

  enableOtherCancerField() {
    const type = this.clinicDetails.get('cancerType')?.value;
    if (type === 'Otros') {
      this.clinicDetails.controls['otherCancerType'].enable();
    } else {
      this.clinicDetails.controls['otherCancerType'].disable();
      this.clinicDetails.controls['otherCancerType'].setValue("");
    }
  }

  enableMutationType() {
    const answer = this.clinicDetails.get('mutationAnswer')?.value;
    if (answer === 'Sí') {
      this.clinicDetails.controls['mutationType'].enable();
    } else {
      this.clinicDetails.controls['mutationType'].setValue("");
      this.clinicDetails.controls['mutationType'].disable();
    }
  }

  enableOtherMutationType() {
    const type = this.clinicDetails.get('mutationType')?.value;
    if (type === 'Otros') {
      this.clinicDetails.controls['otherMutationType'].enable();
    } else {
      this.clinicDetails.controls['otherMutationType'].disable();
      this.clinicDetails.controls['otherMutationType'].setValue("");
    }
  }

  enableSurgeryYear() {
    const answer = this.clinicDetails.get('sugeryAnswer')?.value;
    if (answer === 'Sí') {
      this.clinicDetails.controls['surgeryYear'].enable();
      this.clinicDetails.controls['surgeryExtraTreatment'].enable();
    } else {
      this.clinicDetails.controls['surgeryYear'].setValue("");
      this.clinicDetails.controls['surgeryYear'].disable();
      this.clinicDetails.controls['surgeryExtraTreatment'].setValue("");
      this.clinicDetails.controls['surgeryExtraTreatment'].disable();
    }
  }

  enableMetastasisTypes() {
    const answer = this.clinicDetails.get('metastasisAnswer')?.value;
    if (answer === 'Sí') {
      this.clinicDetails.controls['metastasisYear'].enable();
      this.clinicDetails.controls['metastatisTreatment'].enable();
    } else {
      this.clinicDetails.controls['metastasisYear'].setValue("");
      this.clinicDetails.controls['metastasisYear'].disable();
      this.clinicDetails.controls['metastatisTreatment'].setValue("");
      this.clinicDetails.controls['metastatisTreatment'].disable();
    }
  }

  enableOtherMetastasis() {
    const type = this.clinicDetails.get('metastatisTreatment')?.value;
    if (type === 'Otros') {
      this.clinicDetails.controls['otherMetastasisTreatment'].enable();
    } else {
      this.clinicDetails.controls['otherMetastasisTreatment'].disable();
      this.clinicDetails.controls['otherMetastasisTreatment'].setValue("");
    }
  }

  enableOtherMetastasisTreatments() {
    const type = this.clinicDetails.get('noSurgeryTreatmentAnswer')?.value;
    if (type === 'Otros') {
      this.clinicDetails.controls['otherNonSurgeryTreatment'].enable();
    } else {
      this.clinicDetails.controls['otherNonSurgeryTreatment'].disable();
      this.clinicDetails.controls['otherNonSurgeryTreatment'].setValue("");
    }
  }

  async getJobOptions() {
    const value = this.jobDetails.controls['currentJobDescription'].value;
    const response = await this.questionService.findJobs(value);
    console.log(response);
  }

}
>>>>>>> 87eb321db33b79895bb34884f228a398b873612d
