import { Diagnose, Job, Familiar } from './../../shared/models/FormRequest';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators,FormBuilder, FormArray } from '@angular/forms';
import { LungFormQuestionsService } from './lung-form-questions-service'
import formRequest from 'src/app/shared/models/FormRequest';
import { Country, State, City }  from 'country-state-city';
import {  tap, switchMap, finalize,  filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatCheckboxChange} from '@angular/material/checkbox';



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

  filteredJobs: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  selectedJob: any = "";

  loadingSubmit = false;


  // geonames = Geonames({
  //   username: 'clinic_test',
  //   lan: 'es',
  //   encoding: 'JSON'
  // });

  generos: any = ['Hombre', 'Mujer', 'No Binario']
  cancerTypes: any = ['Cáncer microcítico (de célula pequeña)', 'No Microcítico (de célula no pequeña)', 'Otros', 'NS / NC']
  nonMicrocyticCancerSubtypes: any = [
    'Adenocarcinoma',
    'Epidermoide/Escamoso',
    'Células grandes',
    'Subtipo no especificado',
    'Otros'
  ];
  mutationAnswer: any = ['No', 'NS/NC', 'Mutación', 'Amplificación', 'Fusión'];
  mutationTypes: any = ['EGFR',
    'KRAS',
    'BRAF',
    'MET',
    'HER2',
    'Otros'
  ];
  amplificationTypes: any = [
    'HER2',
    'MET',
    'Otros'
  ];
  fusionTypes: any = [
    'ALK',
    'ROS1',
    'RET',
    'NTRK',
    'Otros'
  ];
  mutationTypesArray: any = [];

  surgeryAnswers: any = ['Sí', 'No', 'NS/NC'];
  surgeryExtraTreatments: any = ['Quimio', 'Otros', 'No'];
  metastasisOptions: any = ['Quimioterapia',
    'Inmunoterapia',
    'Tratamiento dirigido',
    'Ninguno',
    'Otros',
    ];
  otherMetastasisTreatments: any = ['Quimioterapia',
    'Inmunoterapia',
    'Combinación de quimio+Inmuno',
    'Tratamiento dirigido',
    'Otros',
    'No'
    ];
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
    'Sí',
    'No',
    'NS/NC'
  ]

  numberPreviousJobs: any = [
    'No',
    '1',
    '2 o más'
  ]

  familyAnswers: any = [
    'Sí',
    'No',
    'NS/NC'
  ]

  familyNumberAnswers: any = [
    '1',
    '2',
    '3 o más'
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
  ];
  radiotherapyTargetsList: any = [
    'Cerebro',
    'Pulmón',
    'Hueso',
    'Otros'
  ];

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
              private questionService: LungFormQuestionsService,
              private httpService: HttpClient,
              private _snackBar: MatSnackBar,
              private router: Router) {

    this.demographicDetails = this.formBuilder.group({
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      residenceCountry: ['', Validators.required],
      residenceRegion: ['',Validators.required],
      residenceCity: ['',Validators.required],
      residencePostCode: ['',Validators.required],
      residenceInitialYears: ['',Validators.required],
      residenceEndYears: ['',Validators.required],
      bornCountry: ['', Validators.required],
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
      nonmicrocyticType: ['', Validators.required],
      otherNonMicrocyticCancerType: ['', Validators.required],
      mutationAnswer: ['', Validators.required],
      mutationType: ['', Validators.required],
      otherMutationType: ['', null],
      sugeryAnswer: ['', Validators.required],
      surgeryYear: ['', Validators.required],
      surgeryExtraTreatment: ['', Validators.required],
      otherSurgeryExtraTreatment: ['', null],
      isRadiotherapy: ['', Validators.required],
      radiotherapyTarget: ['', Validators.required],
      otherRadiotherapyTarget: ['', null],
      metastasisAnswer: ['', Validators.required],
      metastasisYear: ['', Validators.required],
      metastatisTreatment: ['', Validators.required],
      otherMetastasisTreatment: ['', null],
      isClinicalTrial: ['', null],
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
      numberPreviousJobs: ['', Validators.required],
      currentJobDescription: new FormControl(),
      currentJobProtections: [false, null],

      otherJobs: new FormArray([])
    });
    this.familyDetails = this.formBuilder.group({
      anyFamilyDiagnoseAnswer: ['', Validators.required],
      anyFamilyNumberAnswer:['', Validators.required],
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
      hasMetastasis: ['', Validators.required]
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

   addCancerData() {
     this.deleteCancerItem();
     const answer = this.clinicDetails.get('additionalDiagnoseAnswer')?.value;
     if (answer === 'Sí') {
       this.addCancerItem();
     }
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
    newFormGroup.get('jobDescription')?.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        // distinctUntilChanged(),
        // debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredJobs = [];
          this.isLoading = true;
        }),
        switchMap(value => this.httpService.get(`https://young-hollows-40979.herokuapp.com/https://www.qualificalia.com/terms/cno/services.php?task=search&arg=${value}&output=json`)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data['result'] == undefined) {
          this.errorMsg = data['Error'];
          this.filteredJobs = [];
        } else {
          this.errorMsg = "";
          this.filteredJobs = [];
          for (const item in data['result']) {
            this.filteredJobs.push(data['result'][item]['string']);
          }

        }
        console.log(this.filteredJobs);
      });
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

  addPreviousJobs() {
    this.deleteJobsForm();
    const answer = this.jobDetails.get('numberPreviousJobs').value
    if (answer !== 'No') {
      let x = answer[0];
      for (let i = 0; i < x; i++) {
        this.addJobItem()
      }
    }
  }

  deleteJobsForm() {
    this.jobItems = this.jobDetails.get('otherJobs') as FormArray;
    while (this.jobItems.length !== 0) {
      this.jobItems.removeAt(0);
    }
  }

  addFamilyItem() {
    this.familyItems = this.familyDetails.get('familyDiagnoses') as FormArray;
    const newFormGroup = this.createFamilyItems();
    newFormGroup.enable();
    newFormGroup.controls['otherCancerType'].disable();
    newFormGroup.controls['deadDate'].disable();
    newFormGroup.controls['deadCause'].disable();
    this.familyItems.push(newFormGroup);
   }

   addFamilyMembers() {
     this.deleteFamilyMembers();
     const answer = this.familyDetails.get('anyFamilyNumberAnswer')?.value;
     let x = answer[0];
     for (let i = 0; i < x; i++) {
       this.addFamilyItem()
     }
   }


   deleteFamilyMembers() {
    this.familyItems = this.familyDetails.get('familyDiagnoses') as FormArray;
    while (this.familyItems.length !== 0) {
      this.familyItems.removeAt(0);
    }
   }


   deleteFamilyItem() {
    this.familyItems = this.familyDetails.get('familyDiagnoses') as FormArray;
    const leng = this.familyItems.length;
    this.familyItems.removeAt(leng-1);
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

  getJobForm (id: number) {
    return this.getOtherJob['controls'][id] as FormGroup;
  }

  async ngOnInit() {
    try{

     this.countries = Country.getAllCountries();
      this.bornCountries = Country.getAllCountries();
      const object = this.countries.find(country => country.name === "Spain");
      this.countries.unshift(object);
    }catch (err){
      console.error(err);
    }
    this.clinicDetails.controls['otherCancerType'].disable();
    this.clinicDetails.controls['nonmicrocyticType'].disable();
    this.clinicDetails.controls['otherNonMicrocyticCancerType'].disable();
    this.clinicDetails.controls['mutationType'].disable();
    this.clinicDetails.controls['otherMutationType'].disable();
    this.clinicDetails.controls['surgeryYear'].disable();
    this.clinicDetails.controls['surgeryExtraTreatment'].disable();
    this.clinicDetails.controls['otherSurgeryExtraTreatment'].disable();
    this.clinicDetails.controls['isRadiotherapy'].disable();
    this.clinicDetails.controls['radiotherapyTarget'].disable();
    this.clinicDetails.controls['otherRadiotherapyTarget'].disable();
    this.clinicDetails.controls['metastasisYear'].disable();
    this.clinicDetails.controls['metastatisTreatment'].disable();
    this.clinicDetails.controls['otherMetastasisTreatment'].disable();
    this.clinicDetails.controls['isClinicalTrial'].disable();
    this.clinicDetails.controls['otherNonSurgeryTreatment'].disable();
    this.clinicDetails.controls['otherPreviousDiseases'].disable();

    this.expositionDetails.controls['initialSmokeYear'].disable();
    this.expositionDetails.controls['endSmokeYear'].disable();
    this.expositionDetails.controls['averageCigarettes'].disable();
    this.expositionDetails.controls['extraOtherSusbtancesAnswer'].disable();
    this.expositionDetails.controls['extraDangerousSubstances'].disable();

    this.jobDetails.controls['initialYearCurrentJob'].disable();
    this.jobDetails.controls['currentJobDescription'].disable();
    this.jobDetails.controls['currentJobProtections'].disable();

    this.familyDetails.controls['anyFamilyNumberAnswer'].disable();

    this.jobDetails.get('currentJobDescription')?.valueChanges
      .pipe(
        filter(res => {
          return res !== null && res.length >= this.minLengthTerm
        }),
        // distinctUntilChanged(),
        // debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredJobs = [];
          this.isLoading = true;
        }),
        switchMap(value => this.httpService.get(`https://young-hollows-40979.herokuapp.com/https://www.qualificalia.com/terms/cno/services.php?task=search&arg=${value}&output=json`)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe((data: any) => {
        if (data['result'] == undefined) {
          this.errorMsg = data['Error'];
          this.filteredJobs = [];
        } else {
          this.errorMsg = "";
          this.filteredJobs = [];
          for (const item in data['result']) {
            this.filteredJobs.push(data['result'][item]['string']);
          }

        }
        console.log(this.filteredJobs);
      });
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

  async getProvinces() {
      this.cities = [];
      this.regions = [];
      //const state = this.demographicDetails.get('residenceCountry')?.value.isoCode;
      console.log(this.demographicDetails.get('residenceCountry')?.value?.name)
      if(this.demographicDetails.get('residenceCountry')?.value?.name=="Spain"){
        this.questionService.findProvinces().subscribe(res=>{
          console.log(res)
          this.regions = res;
        })
      }else{
        const state = this.demographicDetails.get('residenceCountry')?.value.isoCode;
        this.regions = State.getStatesOfCountry(state);
        console.log(this.regions)
      }
  }

  async getBornProvinces() {
    this.bornCities = [];
    this.bornRegions = [];
    //const state = this.demographicDetails.get('bornCountry')?.value.isoCode;
    if(this.demographicDetails.get('residenceCountry')?.value?.name=="Spain"){
      this.questionService.findProvinces().subscribe(res=>{
        this.bornRegions = res;
      })
    }else{
      const state = this.demographicDetails.get('bornCountry')?.value.isoCode;
      this.bornRegions = State.getStatesOfCountry(state);
    }
  }


  async changeCities() {
      //const province = this.demographicDetails.get('residenceCountry')?.value;
      //const state = this.demographicDetails.get('residenceRegion')?.value;
      if(this.demographicDetails.get('residenceCountry')?.value?.name=="Spain"){
        this.questionService.findCitiesByProvince(this.demographicDetails.get('residenceRegion')?.value).subscribe(res=>{
          this.cities = res;
        })
      }else{
        const country = this.demographicDetails.get('residenceCountry')?.value;
        const state = this.demographicDetails.get('residenceRegion')?.value;
        this.cities = City.getCitiesOfState(country.isoCode, state.isoCode);
      }
      //this.cities = City.getCitiesOfState(country.isoCode, state.isoCode);
  }

  async changeBornCities() {
   if(this.demographicDetails.get('residenceCountry')?.value?.name=="Spain"){
      this.questionService.findCitiesByProvince(this.demographicDetails.get('bornRegion')?.value).subscribe(res=>{
        this.bornCities = res;
      })  
    }
    else{
      const country = this.demographicDetails.get('bornCountry')?.value;
      const state = this.demographicDetails.get('bornRegion')?.value;
      this.bornCities = City.getCitiesOfState(country.isoCode, state.isoCode);
    }
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
    if (type === 'No Microcítico (de célula no pequeña)') {
      this.clinicDetails.controls['nonmicrocyticType'].enable();
    }
    else{
      this.clinicDetails.controls['nonmicrocyticType'].setValue('');
      this.clinicDetails.controls['nonmicrocyticType'].disable();
      this.clinicDetails.controls['otherNonMicrocyticCancerType'].disable();
      this.clinicDetails.controls['otherNonMicrocyticCancerType'].setValue('');
    }
  }

  enableOtherNonMicrocyticCancerField() {
    const type = this.clinicDetails.get('nonmicrocyticType')?.value;
    if (type === 'Otros') {
      this.clinicDetails.controls['otherNonMicrocyticCancerType'].enable();
    } else {
      this.clinicDetails.controls['otherNonMicrocyticCancerType'].disable();
      this.clinicDetails.controls['otherNonMicrocyticCancerType'].setValue('');
    }
  }

  enableMutationType() {
    const answer = this.clinicDetails.get('mutationAnswer')?.value;
    if (answer !== '' && answer !== 'No' && answer !== 'NS/NC'){
      this.clinicDetails.controls['mutationType'].enable();
    } else {
      this.clinicDetails.controls['mutationType'].setValue('');
      this.clinicDetails.controls['mutationType'].disable();
    }
    if (answer === 'Mutación'){
      this.mutationTypesArray = this.mutationTypes;
    }
    else if (answer === 'Amplificación'){
      this.mutationTypesArray = this.amplificationTypes;
    }
    else if (answer === 'Fusión'){
      this.mutationTypesArray = this.fusionTypes;
    }
  }

  enableOtherMutationType() {
    const type = this.clinicDetails.get('mutationType')?.value;
    if (type === 'Otros') {
      this.clinicDetails.controls['otherMutationType'].enable();
    } else {
      this.clinicDetails.controls['otherMutationType'].disable();
      this.clinicDetails.controls['otherMutationType'].setValue('');
    }
  }

  enableSurgeryYear() {
    const answer = this.clinicDetails.get('sugeryAnswer')?.value;
    if (answer === 'Sí') {
      this.clinicDetails.controls['surgeryYear'].enable();
      this.clinicDetails.controls['surgeryExtraTreatment'].enable();
      this.clinicDetails.controls['isRadiotherapy'].enable();
    } else {
      this.clinicDetails.controls['surgeryYear'].setValue("");
      this.clinicDetails.controls['surgeryYear'].disable();
      this.clinicDetails.controls['surgeryExtraTreatment'].setValue("");
      this.clinicDetails.controls['surgeryExtraTreatment'].disable();
      this.clinicDetails.controls['isRadiotherapy'].setValue(false);
      this.clinicDetails.controls['isRadiotherapy'].disable();
      this.clinicDetails.controls['radiotherapyTarget'].setValue('');
      this.clinicDetails.controls['radiotherapyTarget'].disable();
      this.clinicDetails.controls['otherRadiotherapyTarget'].setValue('');
      this.clinicDetails.controls['otherRadiotherapyTarget'].disable();
    }
  }

  enableMetastasisTypes() {
    const answer = this.clinicDetails.get('metastasisAnswer')?.value;
    if (answer === 'Sí') {
      this.clinicDetails.controls['metastasisYear'].enable();
      this.clinicDetails.controls['metastatisTreatment'].enable();
      this.clinicDetails.controls['isClinicalTrial'].enable();
    } else {
      this.clinicDetails.controls['metastasisYear'].setValue("");
      this.clinicDetails.controls['metastasisYear'].disable();
      this.clinicDetails.controls['metastatisTreatment'].setValue("");
      this.clinicDetails.controls['metastatisTreatment'].disable();
      this.clinicDetails.controls['isClinicalTrial'].setValue(false);
      this.clinicDetails.controls['isClinicalTrial'].disable();
    }
  }


  enableOtherMetastasis() {
    const type = this.clinicDetails.get('metastatisTreatment')?.value;
    console.log(type);
    if (type.includes('Otros')) {
      this.clinicDetails.controls['otherMetastasisTreatment'].enable();
    } else {
      this.clinicDetails.controls['otherMetastasisTreatment'].disable();
      this.clinicDetails.controls['otherMetastasisTreatment'].setValue('');
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

  enableOtherComplementaryTreatments() {

    const type = this.clinicDetails.get('surgeryExtraTreatment')?.value;
    let other = false;
    for (const value of type) {
      if (value === 'Otros') other = true;
    }
    if (other) {
      this.clinicDetails.controls['otherSurgeryExtraTreatment'].enable();
    } else {
      this.clinicDetails.controls['otherSurgeryExtraTreatment'].disable();
      this.clinicDetails.controls['otherSurgeryExtraTreatment'].setValue("");
    }
  }

  enableRadiotherapyTarget(event: MatCheckboxChange): void {
    if (event.checked) {
      this.clinicDetails.controls['radiotherapyTarget'].enable();
    } else {
      this.clinicDetails.controls['radiotherapyTarget'].disable();
      this.clinicDetails.controls['radiotherapyTarget'].setValue('');
      this.clinicDetails.controls['otherRadiotherapyTarget'].disable();
      this.clinicDetails.controls['otherRadiotherapyTarget'].setValue('');
    }
  }

  enableOtherRadiotherapyTarget(): void {
    const type = this.clinicDetails.get('radiotherapyTarget')?.value;
    console.log(type);
    if (type.includes('Otros')) {
      this.clinicDetails.controls['otherRadiotherapyTarget'].enable();
    } else {
      this.clinicDetails.controls['otherRadiotherapyTarget'].disable();
      this.clinicDetails.controls['otherRadiotherapyTarget'].setValue('');
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

  enableJobInfoFields() {
    const answer = this.jobDetails.get('currentlyWorkingAnswer')?.value;
    if (answer === 'Sí') {
      this.jobDetails.controls['initialYearCurrentJob'].enable();
      this.jobDetails.controls['currentJobDescription'].enable();
      this.jobDetails.controls['currentJobProtections'].enable();
    } else {
      this.jobDetails.controls['initialYearCurrentJob'].disable();
      this.jobDetails.controls['initialYearCurrentJob'].setValue('');
      this.jobDetails.controls['currentJobDescription'].disable();
      this.jobDetails.controls['currentJobDescription'].setValue('');
      this.jobDetails.controls['currentJobProtections'].disable();
    }
  }

  enableFamilyNumber() {
    const answer = this.familyDetails.get('anyFamilyDiagnoseAnswer')?.value;
    if (answer === 'Sí') {
      this.familyDetails.controls['anyFamilyNumberAnswer'].enable();
    } else {
      this.familyDetails.controls['anyFamilyNumberAnswer'].setValue('');
      this.familyDetails.controls['anyFamilyNumberAnswer'].disable();
      this.deleteFamilyMembers();
    }
  }

  fillRequestData() {
    const requestData = new formRequest();
    // DEMOGRAPHIC DETAILS
    requestData.demographicDetails.birthdate = this.demographicDetails.get('birthDate')?.value;
    requestData.demographicDetails.sex = this.demographicDetails.get('gender')?.value;
    requestData.demographicDetails.livingPlace.country = this.demographicDetails.get('residenceCountry')?.value;
    requestData.demographicDetails.livingPlace.state = this.demographicDetails.get('residenceRegion')?.value;
    requestData.demographicDetails.livingPlace.city = this.demographicDetails.get('residenceCity')?.value;
    requestData.demographicDetails.livingPlace.postalCode = this.demographicDetails.get('residencePostCode')?.value;
    requestData.demographicDetails.livingPlace.initialYear = this.demographicDetails.get('residenceInitialYears')?.value;

    requestData.demographicDetails.bornPlace.country = this.demographicDetails.get('bornCountry')?.value;
    requestData.demographicDetails.bornPlace.state = this.demographicDetails.get('bornRegion')?.value;
    requestData.demographicDetails.bornPlace.city = this.demographicDetails.get('bornCity')?.value;
    requestData.demographicDetails.bornPlace.postalCode = this.demographicDetails.get('bornPostCode')?.value;
    requestData.demographicDetails.bornPlace.initialYear = this.demographicDetails.get('bornInitialYears')?.value;
    requestData.demographicDetails.bornPlace.endYear = this.demographicDetails.get('bornEndYears')?.value;

    // CLINIC DETAILS
    requestData.clinicDetails.mainDiagnose.diagnoseYear = this.clinicDetails.get('yearDiagnose')?.value;
    requestData.clinicDetails.mainDiagnose.cancerType = this.clinicDetails.get('cancerType')?.value == 'Otros' ?
    this.clinicDetails.get('otherCancerType')?.value : this.clinicDetails.get('cancerType')?.value;
    requestData.clinicDetails.mainDiagnose.notListedCancerType = this.clinicDetails.get('cancerType')?.value == 'Otros' ?
      true : false;
    if (this.clinicDetails.get('cancerType')?.value === 'No Microcítico (de célula no pequeña)'){
      if (this.clinicDetails.get('nonmicrocyticType')?.value !== 'Otros'){
        requestData.clinicDetails.mainDiagnose.nonmicrocyticSubtype = this.clinicDetails.get('nonmicrocyticType')?.value;
      } else {
        requestData.clinicDetails.mainDiagnose.nonmicrocyticSubtype = this.clinicDetails.get('otherNonMicrocyticCancerType')?.value;
      }
    }
    requestData.clinicDetails.mainDiagnose.mutation = this.clinicDetails.get('mutationAnswer')?.value;
    requestData.clinicDetails.mainDiagnose.mutationType = this.clinicDetails.get('mutationType')?.value == 'Otros' ?
    this.clinicDetails.get('otherMutationType')?.value : this.clinicDetails.get('mutationType')?.value;
    requestData.clinicDetails.mainDiagnose.notListedMutationType = this.clinicDetails.get('mutationType')?.value == 'Otros' ?
      true : false;

    requestData.clinicDetails.mainDiagnose.operatedCancer = this.clinicDetails.get('sugeryAnswer')?.value == 'Sí' ? true : false;
    requestData.clinicDetails.mainDiagnose.operationYear = this.clinicDetails.get('sugeryAnswer')?.value == 'Sí' ?
      this.clinicDetails.get('surgeryYear')?.value : null;
    // Creo que esto va a fallar
    requestData.clinicDetails.mainDiagnose.extraTreatment = this.clinicDetails.get('surgeryExtraTreatment')?.value;
    if (this.clinicDetails.get('otherSurgeryExtraTreatment')?.value !== '') {
      requestData.clinicDetails.mainDiagnose.extraTreatment.push(this.clinicDetails.get('otherSurgeryExtraTreatment')?.value);
    }
    // Acaba aqui el posible fallo
    requestData.clinicDetails.mainDiagnose.hasReceivedComplementaryRadiotherapy = this.clinicDetails.get('isRadiotherapy')?.value;
    if (this.clinicDetails.get('isRadiotherapy')?.value){
      requestData.clinicDetails.mainDiagnose.complementaryRadiotherapyTarget = this.clinicDetails.get('radiotherapyTarget')?.value;
      if (this.clinicDetails.get('radiotherapyTarget')?.value.includes('Otros')){
        requestData.clinicDetails.mainDiagnose.complementaryRadiotherapyTarget.push(this.clinicDetails.get('otherRadiotherapyTarget')?.value);
      }
    }
    requestData.clinicDetails.mainDiagnose.metastasis = this.clinicDetails.get('metastasisAnswer')?.value == 'Sí' ? true : false;
    requestData.clinicDetails.mainDiagnose.metastasisYear = this.clinicDetails.get('metastasisAnswer')?.value == 'Sí' ?  this.clinicDetails.get('metastasisYear')?.value : null;
    if (this.clinicDetails.get('metastasisAnswer').value === 'Sí'){
      requestData.clinicDetails.mainDiagnose.metastasisTreatment = this.clinicDetails.get('metastatisTreatment')?.value;
      if (requestData.clinicDetails.mainDiagnose.metastasisTreatment.includes('Otros')) {
        requestData.clinicDetails.mainDiagnose.metastasisTreatment.push(this.clinicDetails.get('otherMetastasisTreatment')?.value);
        requestData.clinicDetails.mainDiagnose.notListedTreatment = true;
      } else {
        requestData.clinicDetails.mainDiagnose.notListedTreatment = false;
      }
      requestData.clinicDetails.mainDiagnose.isClinicalTrial = this.clinicDetails.get('isClinicalTrial')?.value;
    }
    requestData.clinicDetails.mainDiagnose.noSurgeryTreatment = this.clinicDetails.get('noSurgeryTreatmentAnswer')?.value == 'No' ? null : this.clinicDetails.get('noSurgeryTreatmentAnswer')?.value;
    if (requestData.clinicDetails.mainDiagnose.noSurgeryTreatment == 'Otros') {
      requestData.clinicDetails.mainDiagnose.noSurgeryTreatment = this.clinicDetails.get('otherNonSurgeryTreatment')?.value;
      requestData.clinicDetails.mainDiagnose.notListedNoSurgeryTreatment = true;
    } else {
      requestData.clinicDetails.mainDiagnose.notListedNoSurgeryTreatment = false;
    }
    requestData.clinicDetails.mainDiagnose.previousDiseases = this.clinicDetails.get('previousDiseases')?.value;
    if (this.clinicDetails.get('otherPreviousDiseases')?.value != '') {
      requestData.clinicDetails.mainDiagnose.previousDiseases.push(this.clinicDetails.get('otherPreviousDiseases')?.value);
    }

    this.getOtherCancers['controls'].forEach((value, index) => {
      let diagnose = new Diagnose();
      const fg = this.getCancerForm(index);
      diagnose.cancerType = fg.get('type')?.value;
      diagnose.diagnoseYear = fg.get('year')?.value;
      diagnose.metastasis = fg.get('metastasis')?.value == 'Sí' ? true : false;
      diagnose.metastasisYear = fg.get('metastasis')?.value == 'Sí' ? fg.get('metastasisYear')?.value : null;
      diagnose.extraTreatment = fg.get('treatmentAnswer')?.value == 'Sí' ? fg.get('treatmentType')?.value : null;
      requestData.clinicDetails.otherDiagnose.push(diagnose);
    });

    // EXPOSITION DETAILS

    requestData.expositionDetails.smoker = this.expositionDetails.get('smokeAnswer')?.value == 'Sí' ? true : false;
    requestData.expositionDetails.startAge = this.expositionDetails.get('smokeAnswer')?.value == 'Sí' ? this.expositionDetails.get('initialSmokeYear')?.value : null;
    requestData.expositionDetails.endAge = this.expositionDetails.get('smokeAnswer')?.value == 'Sí' ? this.expositionDetails.get('endSmokeYear')?.value : null;
    requestData.expositionDetails.avgCigarrettes = this.expositionDetails.get('smokeAnswer')?.value == 'Sí' ? this.expositionDetails.get('averageCigarettes')?.value : null;

    requestData.expositionDetails.otherProducts = this.expositionDetails.get('otherSusbtancesAnswer')?.value;
    if (this.expositionDetails.get('extraOtherSusbtancesAnswer')?.value != '') {
      requestData.expositionDetails.otherProducts.push(this.expositionDetails.get('extraOtherSusbtancesAnswer')?.value);
    }

    requestData.expositionDetails.nearbyRoad = this.expositionDetails.get('residenceNearRoadAnswer')?.value == 'Sí' ?  true : false;

    requestData.expositionDetails.expositions = this.expositionDetails.get('dangerousSubstances')?.value;
    if (this.expositionDetails.get('extraDangerousSubstances')?.value != '') {
      requestData.expositionDetails.expositions.push(this.expositionDetails.get('extraDangerousSubstances')?.value);
    }

    // JOB DETAILS

    if (this.jobDetails.get('currentlyWorkingAnswer')?.value == 'Sí') {
      const currentJob = new Job();
      currentJob.currentJob = true;
      currentJob.initialYear = this.jobDetails.get('initialYearCurrentJob')?.value;
      currentJob.job = this.jobDetails.get('currentJobDescription')?.value;
      currentJob.isProtected = this.jobDetails.get('currentJobProtections')?.value;
      requestData.jobDetails.push(currentJob);
    }

    this.getOtherJob['controls'].forEach((value, index) => {
      let job = new Job();
      const fg = this.getJobForm(index);
      job.currentJob = false;
      job.initialYear = fg.get('initialYearJob')?.value;
      job.endYear = fg.get('finalYearJob')?.value;
      job.job = fg.get('jobDescription')?.value;
      job.isProtected = fg.get('jobProtections')?.value;
      requestData.jobDetails.push(job);
    });


    // FAMILY DETAILS

    this.getOtherFamily['controls'].forEach((value, index) => {
      let familiar = new Familiar();
      const fg = this.getFamilyForm(index);
      familiar.relation = fg.get('relation')?.value;
      familiar.survived = fg.get('isDead')?.value ? false : true;
      if (familiar.survived) {
        familiar.age = fg.get('age')?.value;
      } else {
        familiar.ageOfDeath = fg.get('deadDate')?.value;
        familiar.cancerCause = fg.get('deadCause')?.value ? true: false;
      }
       familiar.diagnose.cancerType =  fg.get('cancerType')?.value;
       if (familiar.diagnose.cancerType == 'Otros') {
         familiar.diagnose.cancerType = fg.get('otherCancerType')?.value;
       }
       familiar.diagnose.metastasis = fg.get('hasMetastasis')?.value == 'Sí';

       requestData.familyDetails.push(familiar);
    });
    return requestData;

  }

  async submitForm() {
    this.loadingSubmit = true;
    try {
      const requestData = this.fillRequestData();
      console.log(requestData);
      await this.questionService.communicateForm(requestData);
      await this.router.navigate(['/contaminants'],
        {
                queryParams:
                  {
                    latitude: requestData.demographicDetails.livingPlace.city['latitude'],
                    longitude: requestData.demographicDetails.livingPlace.city['longitude'],
                    country: requestData.demographicDetails.livingPlace.country['name'],
                    latitude2: requestData.demographicDetails.bornPlace.city['latitude'],
                    longitude2: requestData.demographicDetails.bornPlace.city['longitude'],
                    country2: requestData.demographicDetails.bornPlace.country['name']
                  }
                });
    } catch (err) {
      console.log(err);
      this._snackBar.open('Error enviando el formulario', 'Cerrar', {
        duration: 10000,
        panelClass: ['purple-snack'],
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
      });
    }
    this.loadingSubmit = false;
  }
}
