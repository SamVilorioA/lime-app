import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { CountryService } from '../../../../data/services/country.service';
import { Country } from '../../../../data/models/country';
@UntilDestroy({ checkProperties: true})
@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.css']
})
export class CountrySelectComponent implements OnInit {
  country: string = 'Country';
  countries: Country[] = [];
  @Output() setCountryEvent = new EventEmitter<string>();
  constructor(private countriesServ: CountryService) { }

  ngOnInit(): void {
    this.countriesServ.getCountries().subscribe(
      countries => { this.countries = countries}
    )
  }
  setCountry(value: Country){
    this.country = value.name || '';
    this.setCountryEvent.emit(value.code)
  }
}
