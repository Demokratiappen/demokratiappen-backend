/* Copyright (C) 2014 Demokratiappen.
 *
 * This file is part of Demokratiappen.
 *
 * Demokratiappen is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Demokratiappen is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Demokratiappen.  If not, see <http://www.gnu.org/licenses/>.
 */

var assert = require("assert")

var preprocess = require('../parse/cloud/preprocess');

// -----------------------------------------------------------------------
// Tests for expandParties
// -----------------------------------------------------------------------
function check_expandParties(expected, sut){
  // Lite oklart, men unit.js verkar vilja ha actual först, och expected sist.
  assert.equal(preprocess.expandParties(sut), expected);
}

// Grundläggande funktionalitet
describe('Preprocess.expandParties()', function(){ // Man kan ha describe i flera nivåer, men vi nöjer oss med en.
  it('should replace party signature with party name', function(){
    check_expandParties('Lite text med (Folkpartiet) etc.', 
                        'Lite text med (FP) etc.');
  })
});
// Grundläggande funktionalitet, inte skilja på stora och små bokstäver.
describe('Preprocess.expandParties()', function(){
  it('should replace party signature with party name (case insensitive', function(){
    check_expandParties('Lite text med (Folkpartiet) etc.', 
                        'Lite text med (fp) etc.');
  })
});
// Parti med konstig beteckning
describe('Preprocess.expandParties()', function(){
  it('should replace (odd) party signature with party name', function(){
    check_expandParties('Lite text med (Feministiskt initiativ) etc.', 
                        'Lite text med (F!) etc.');
  })
});
// Parti med konstig beteckning (utf-8)
describe('Preprocess.expandParties()', function(){
  it('should replace last party signature in list with party name', function(){
    check_expandParties('Lite text med (Vägvalet) etc.', 
                        'Lite text med (VägV) etc.');
  })
});
// Parti med konstig beteckning (&)
describe('Preprocess.expandParties()', function(){
  it('should replace last party signature in list with party name', function(){
    check_expandParties('Lite text med (Gruppen Progressiva förbundet av Socialdemokrater i Europaparlamentet) etc.', 
                        'Lite text med (S&D) etc.');
  })
});
// Första partiet [Intern kunskap om listan i funktionen]
describe('Preprocess.expandParties()', function(){
  it('should replace first party signature in list with party name', function(){
    check_expandParties('Lite text med (Socialdemokraterna) etc.', 
                        'Lite text med (S) etc.');
  })
});
// Sista partiet [Intern kunskap om listan i funktionen] (dessutom med '/' i beteckningen)
describe('Preprocess.expandParties()', function(){
  it('should replace last party signature in list with party name', function(){
    check_expandParties('Lite text med (Europeiska enade vänstern/Nordisk grön vänster) etc.', 
                        'Lite text med (GUE/NGL) etc.');
  })
});
// Flera partier flera gånger
describe('Preprocess.expandParties()', function(){
  it('should replace several party signatures with party names', function(){
    check_expandParties('Lite text med (Miljöpartiet), (Centerpartiet) och (Piratpartiet), sen tillkommer (Centerpartiet)', 
                        'Lite text med (MP), (C) och (PP), sen tillkommer (C)');
  })
});
// EU-parlamentet med '/' i förkortningen
describe('Preprocess.expandParties()', function(){
  it('should replace several party signatures with party names', function(){
    check_expandParties('Lite text med (Europeiska enade vänstern/Nordisk grön vänster), och (Europeiska enade vänstern/Nordisk grön vänster) igen', 
                        'Lite text med (GUE/NGL), och (GUE/NGL) igen');
  })
});
// -----------------------------------------------------------------------
