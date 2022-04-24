import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder, FormArray } from '@angular/forms';
import Geonames from 'geonames.js';
import { Country, State, City }  from 'country-state-city';

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
  countries: any;
  regions: any;
  cities: any;

  bornCountries: any;
  bornRegions: any;
  bornCities: any;

  cancerItems: FormArray | undefined;


  constructor(private formBuilder: FormBuilder) {
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
      residenceNearRoadAnswer: ['', Validators.required],
      dangerousSubstances: ['', Validators.required] // multiplechoice
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

}
